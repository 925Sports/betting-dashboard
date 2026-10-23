#!/usr/bin/env python3
"""NBA intel for the Game Preview tab.

Pulls public ESPN feeds only:
- projected starters from team depth charts
- injuries and headlines
- recent box scores for starter game logs and a position DVP
"""

from __future__ import annotations

import json
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
OUT = DATA_DIR / "nba-intel.json"
UA = "betting-dashboard/nba-intel"
DAYS_BACK = 8
LOG_KEEP = 6
POS_ORDER = ["PG", "SG", "SF", "PF", "C"]
DVP_POS = ["G", "F", "C"]
POS_FAMILY = {"PG": "G", "SG": "G", "G": "G", "SF": "F", "PF": "F", "F": "F", "C": "C"}


def get_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8", errors="replace"))


def norm(name: str) -> str:
    return " ".join("".join(ch for ch in (name or "").lower() if ch.isalnum() or ch.isspace()).split())


def num(v):
    try:
        return float(str(v).split("-")[0])
    except (TypeError, ValueError):
        return None


def teams():
    data = get_json("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams")
    out = []
    for wrap in data["sports"][0]["leagues"][0]["teams"]:
        t = wrap.get("team") or {}
        if not t.get("id") or not t.get("abbreviation"):
            continue
        out.append({
            "id": str(t["id"]),
            "abbr": t["abbreviation"],
            "name": t.get("displayName") or t.get("name") or t["abbreviation"],
            "short": t.get("shortDisplayName") or t.get("name") or t["abbreviation"],
        })
    print(f"teams={len(out)}")
    return out


def projected_lineups(roster):
    lineups = {}
    for team in roster:
        try:
            data = get_json(
                f"https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/{team['id']}/depthcharts"
            )
        except Exception as e:
            print(f"depth {team['abbr']} failed: {e}")
            continue
        positions = ((data.get("depthchart") or [{}])[0].get("positions") or {})
        starters = []
        for pos in POS_ORDER:
            slot = positions.get(pos.lower()) or {}
            athletes = slot.get("athletes") or []
            if not athletes:
                continue
            first = athletes[0]
            starters.append({
                "name": first.get("displayName") or first.get("shortName") or "",
                "pos": pos,
                "id": str(first.get("id") or ""),
                "headshot": f"https://a.espncdn.com/i/headshots/nba/players/full/{first.get('id')}.png" if first.get("id") else "",
            })
        lineups[team["abbr"]] = starters
        print(f"lineup {team['abbr']} {len(starters)}")
    return lineups


def injuries():
    data = get_json("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/injuries")
    out = []
    for team in data.get("injuries") or []:
        team_name = team.get("displayName") or ""
        for inj in team.get("injuries") or []:
            ath = inj.get("athlete") or {}
            details = inj.get("details") or {}
            status = (details.get("fantasyStatus") or {}).get("description") or inj.get("status") or ""
            detail = " ".join(x for x in [details.get("detail"), details.get("location"), details.get("side")] if x)
            out.append({
                "name": ath.get("displayName") or "",
                "team": team_name,
                "pos": (ath.get("position") or {}).get("abbreviation") or "",
                "status": status,
                "injury": details.get("type") or detail,
                "detail": inj.get("shortComment") or inj.get("longComment") or detail,
                "date": inj.get("date") or "",
                "headshot": ((ath.get("headshot") or {}).get("href")) or (
                    f"https://a.espncdn.com/i/headshots/nba/players/full/{ath.get('id')}.png" if ath.get("id") else ""
                ),
            })
    print(f"injuries={len(out)}")
    return out


def news():
    data = get_json("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=40")
    out = []
    for a in data.get("articles") or []:
        cats = [c.get("description") or "" for c in (a.get("categories") or [])]
        out.append({
            "headline": a.get("headline") or "",
            "description": a.get("description") or "",
            "published": a.get("published") or "",
            "url": ((a.get("links") or {}).get("web") or {}).get("href") or "",
            "source": "ESPN",
            "categories": cats,
        })
    print(f"news={len(out)}")
    return out


def recent_events():
    events = []
    today = datetime.now(timezone.utc).date()
    for i in range(1, DAYS_BACK + 1):
        day = (today - timedelta(days=i)).strftime("%Y%m%d")
        try:
            data = get_json(f"https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates={day}")
        except Exception as e:
            print(f"scoreboard {day} failed: {e}")
            continue
        for e in data.get("events") or []:
            state = (((e.get("status") or {}).get("type") or {}).get("state") or "")
            if state != "post":
                continue
            events.append({"id": e.get("id"), "name": e.get("name"), "date": e.get("date")})
    print(f"completed games={len(events)}")
    return events


def box_scores(events):
    logs = defaultdict(list)
    allowed = defaultdict(lambda: defaultdict(lambda: {"pts": 0.0, "reb": 0.0, "ast": 0.0, "g": 0}))
    team_games = defaultdict(set)
    for ev in events:
        try:
            data = get_json(f"https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event={ev['id']}")
        except Exception as e:
            print(f"box {ev['id']} failed: {e}")
            continue
        players = (data.get("boxscore") or {}).get("players") or []
        sides = {}
        for side in players:
            team = side.get("team") or {}
            abbr = team.get("abbreviation") or ""
            sides[abbr] = side
            team_games[abbr].add(ev["id"])
        abbrs = list(sides)
        if len(abbrs) != 2:
            continue
        for abbr, side in sides.items():
            opp = next((a for a in abbrs if a != abbr), "")
            groups = side.get("statistics") or []
            if not groups:
                continue
            labels = groups[0].get("labels") or []
            idx = {lab: i for i, lab in enumerate(labels)}
            for ath in groups[0].get("athletes") or []:
                if ath.get("didNotPlay"):
                    continue
                person = ath.get("athlete") or {}
                name = person.get("displayName") or ""
                stats = ath.get("stats") or []
                def grab(key):
                    i = idx.get(key)
                    return num(stats[i]) if i is not None and i < len(stats) else None
                pos = ((person.get("position") or {}).get("abbreviation") or "").upper()
                row = {
                    "date": ev.get("date") or "",
                    "opp": opp,
                    "team": abbr,
                    "pos": pos,
                    "starter": bool(ath.get("starter")),
                    "min": grab("MIN"),
                    "pts": grab("PTS"),
                    "reb": grab("REB"),
                    "ast": grab("AST"),
                    "stl": grab("STL"),
                    "blk": grab("BLK"),
                    "to": grab("TO"),
                    "fg3": grab("3PT"),
                }
                if name:
                    logs[norm(name)].append(row)
                if opp and POS_FAMILY.get(pos):
                    bucket = allowed[opp][POS_FAMILY[pos]]
                    bucket["pts"] += row["pts"] or 0
                    bucket["reb"] += row["reb"] or 0
                    bucket["ast"] += row["ast"] or 0
                    bucket["g"] += 1
    for name in logs:
        logs[name].sort(key=lambda r: r.get("date") or "", reverse=True)
        logs[name] = logs[name][:LOG_KEEP]
    print(f"log players={len(logs)}")
    return logs, allowed, team_games


def dvp(allowed, team_games):
    ranks = {}
    for stat in ("pts", "reb", "ast"):
        board = []
        for abbr, games in team_games.items():
            n = max(1, len(games))
            by_pos = {}
            for pos in DVP_POS:
                bucket = allowed[abbr][pos]
                by_pos[pos] = round(bucket[stat] / n, 1) if bucket["g"] else None
            board.append((abbr, by_pos, n))
        for pos in DVP_POS:
            ordered = sorted(
                [row for row in board if row[1].get(pos) is not None],
                key=lambda row: row[1][pos],
                reverse=True,
            )
            for i, (abbr, by_pos, n) in enumerate(ordered, 1):
                ranks.setdefault(abbr, {"games": n, "pos": {}})
                ranks[abbr]["pos"].setdefault(pos, {})[stat] = {
                    "avg": by_pos[pos],
                    "rank": i,
                    "of": len(ordered),
                }
    print(f"dvp teams={len(ranks)}")
    return ranks


def game_odds():
    """DraftKings prices from the ESPN scoreboard, including the moneyline the sheet does not post."""
    out = []
    today = datetime.now(timezone.utc).date()
    for i in range(0, 4):
        day = (today + timedelta(days=i)).strftime("%Y%m%d")
        try:
            data = get_json(f"https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates={day}")
        except Exception as e:
            print(f"odds {day} failed: {e}")
            continue
        for ev in data.get("events") or []:
            comp = ((ev.get("competitions") or [{}])[0])
            odds = (comp.get("odds") or [None])[0] or {}
            if not odds:
                continue
            home = away = None
            for c in comp.get("competitors") or []:
                team = c.get("team") or {}
                side = {"name": team.get("displayName") or "", "abbr": team.get("abbreviation") or ""}
                if c.get("homeAway") == "home":
                    home = side
                else:
                    away = side
            ml = odds.get("moneyline") or {}
            sp = odds.get("pointSpread") or {}
            ou = odds.get("total") or {}
            def px(node, side):
                try:
                    return float(((node.get(side) or {}).get("close") or {}).get("odds"))
                except (TypeError, ValueError):
                    return None
            out.append({
                "game": f"{away['name'] if away else ''} @ {home['name'] if home else ''}",
                "home_team": home["name"] if home else "",
                "away_team": away["name"] if away else "",
                "home_abbr": home["abbr"] if home else "",
                "away_abbr": away["abbr"] if away else "",
                "spread": odds.get("spread"),
                "total": odds.get("overUnder"),
                "ml_home": px(ml, "home"),
                "ml_away": px(ml, "away"),
                "spread_home": px(sp, "home"),
                "spread_away": px(sp, "away"),
                "total_over": px(ou, "over"),
                "total_under": px(ou, "under"),
                "book": "draftkings",
            })
    print(f"espn odds={len(out)}")
    return out


def main():
    roster = teams()
    lineups = projected_lineups(roster)
    inj = injuries()
    headlines = news()
    events = recent_events()
    logs, allowed, team_games = box_scores(events)
    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "espn",
        "teams": roster,
        "lineups": lineups,
        "injuries": inj,
        "news": headlines,
        "logs": logs,
        "dvp": dvp(allowed, team_games),
        "game_odds": game_odds(),
    }
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, separators=(",", ":"), ensure_ascii=False))
    print(f"Wrote {OUT.name} {OUT.stat().st_size / 1_000_000:.1f}MB")


if __name__ == "__main__":
    main()
