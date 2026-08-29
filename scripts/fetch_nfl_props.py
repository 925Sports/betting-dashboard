#!/usr/bin/env python3
"""Fetch NFL player props from The Odds API and write data/nfl-props.json."""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

BASE = "https://api.the-odds-api.com/v4"
SPORT = os.environ.get("SPORT_KEY", "americanfootball_nfl")
REGIONS = os.environ.get("REGIONS", "us,us_dfs")
MARKETS = os.environ.get(
    "MARKETS",
    "player_pass_yds,player_rush_yds,player_receptions,player_reception_yds,"
    "player_rush_reception_yds,player_pass_tds,player_anytime_td",
)
HOURS_AHEAD = int(os.environ.get("HOURS_AHEAD", "72"))
API_KEY = os.environ.get("ODDS_API_KEY", "").strip()

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"

DFS_BOOKS = {"prizepicks", "underdog", "pick6", "dabble_us_dfs"}

STAT_LABELS = {
    "player_pass_yds": "Pass Yds",
    "player_rush_yds": "Rush Yds",
    "player_receptions": "Receptions",
    "player_reception_yds": "Rec Yds",
    "player_rush_reception_yds": "Rush+Rec Yds",
    "player_pass_tds": "Pass TDs",
    "player_anytime_td": "Anytime TD",
    "player_reception_tds": "Rec TDs",
    "player_rush_tds": "Rush TDs",
    "player_pass_completions": "Completions",
    "player_pass_attempts": "Pass Att",
    "player_rush_attempts": "Rush Att",
    "player_tackles_assists": "Tackles+Ast",
}


def die(msg: str, code: int = 1) -> None:
    print(msg, file=sys.stderr)
    sys.exit(code)


def get(path: str, params: dict):
    q = urllib.parse.urlencode(params)
    url = f"{BASE}{path}?{q}"
    req = urllib.request.Request(url, headers={"User-Agent": "betting-dashboard/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            headers = {k.lower(): v for k, v in resp.headers.items()}
            body = json.loads(resp.read().decode("utf-8"))
            return body, headers
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        die(f"HTTP {e.code} {path}: {detail[:500]}")
    except urllib.error.URLError as e:
        die(f"Network error {path}: {e}")


def american_to_implied(price):
    try:
        p = float(price)
    except (TypeError, ValueError):
        return None
    if p == 0:
        return None
    if p < 0:
        return abs(p) / (abs(p) + 100.0)
    return 100.0 / (p + 100.0)


def no_vig_two_way(over_price, under_price):
    io = american_to_implied(over_price)
    iu = american_to_implied(under_price)
    if io is None or iu is None:
        return io, iu
    total = io + iu
    if total <= 0:
        return io, iu
    return io / total, iu / total


def parse_iso(ts: str) -> datetime:
    return datetime.fromisoformat(ts.replace("Z", "+00:00"))


def print_quota(headers: dict, label: str) -> None:
    used = headers.get("x-requests-used") or headers.get("x-requests-last")
    left = headers.get("x-requests-remaining")
    print(f"Quota after {label}: used={used} remaining={left}")


def fetch_events():
    data, headers = get(f"/sports/{SPORT}/events", {"apiKey": API_KEY})
    print_quota(headers, "events")
    now = datetime.now(timezone.utc)
    cutoff = now + timedelta(hours=HOURS_AHEAD)
    upcoming = []
    for ev in data:
        try:
            start = parse_iso(ev["commence_time"])
        except Exception:
            continue
        if now - timedelta(hours=3) <= start <= cutoff:
            upcoming.append(ev)
    upcoming.sort(key=lambda e: e.get("commence_time", ""))
    print(f"Events in window: {len(upcoming)}")
    return upcoming


def fetch_event_odds(event_id: str):
    data, headers = get(
        f"/sports/{SPORT}/events/{event_id}/odds",
        {
            "apiKey": API_KEY,
            "regions": REGIONS,
            "markets": MARKETS,
            "oddsFormat": "american",
            "includeMultipliers": "true",
        },
    )
    return data, headers


def lines_close(a, b, tol: float = 0.01) -> bool:
    if a is None or b is None:
        return False
    try:
        return abs(float(a) - float(b)) <= tol
    except (TypeError, ValueError):
        return False


def collect_raw(event: dict, payload: dict):
    rows = []
    home = payload.get("home_team") or event.get("home_team")
    away = payload.get("away_team") or event.get("away_team")
    game = f"{away} @ {home}"
    commence = payload.get("commence_time") or event.get("commence_time")

    for book in payload.get("bookmakers") or []:
        book_key = book.get("key") or ""
        book_title = book.get("title") or book_key
        for market in book.get("markets") or []:
            mkey = market.get("key") or ""
            by_player_point = defaultdict(dict)
            for outcome in market.get("outcomes") or []:
                side = (outcome.get("name") or "").strip()
                player = (outcome.get("description") or "").strip()
                if not player and side not in ("Over", "Under", "Yes", "No"):
                    player = side
                point = outcome.get("point")
                rec = {
                    "player": player,
                    "side": side,
                    "point": point,
                    "price": outcome.get("price"),
                    "multiplier": outcome.get("multiplier"),
                }
                if side in ("Over", "Under", "Yes", "No") and player:
                    by_player_point[(player, point)][side] = rec

            for (player, point), sides in by_player_point.items():
                over = sides.get("Over") or sides.get("Yes")
                under = sides.get("Under") or sides.get("No")
                nv_over, nv_under = (None, None)
                if over and under:
                    nv_over, nv_under = no_vig_two_way(over.get("price"), under.get("price"))
                for side_name, rec in sides.items():
                    implied = american_to_implied(rec.get("price"))
                    nv = nv_over if side_name in ("Over", "Yes") else nv_under
                    rows.append(
                        {
                            "event_id": payload.get("id") or event.get("id"),
                            "commence_time": commence,
                            "home_team": home,
                            "away_team": away,
                            "game": game,
                            "book": book_key,
                            "book_title": book_title,
                            "is_dfs": book_key in DFS_BOOKS,
                            "market": mkey,
                            "stat": STAT_LABELS.get(
                                mkey, mkey.replace("player_", "").replace("_", " ").title()
                            ),
                            "player": player,
                            "side": side_name,
                            "line": point,
                            "price": rec.get("price"),
                            "multiplier": rec.get("multiplier"),
                            "implied": implied,
                            "no_vig": nv,
                        }
                    )
    return rows


def build_dashboard_rows(raw):
    grouped = defaultdict(list)
    for r in raw:
        grouped[(r["event_id"], r["player"], r["market"], r["side"])].append(r)

    out = []
    for key, items in grouped.items():
        _, player, market, side = key
        dfs = [i for i in items if i["is_dfs"]]
        books = [i for i in items if not i["is_dfs"]]
        if not dfs:
            continue

        pref = {i["book"]: i for i in dfs}
        primary = pref.get("prizepicks") or pref.get("underdog") or pref.get("pick6") or dfs[0]
        line = primary.get("line")

        book_map = {}
        matching_nv = []
        matching_implied = []
        for b in books:
            book_map[b["book"]] = {
                "price": b.get("price"),
                "line": b.get("line"),
                "implied": b.get("implied"),
                "no_vig": b.get("no_vig"),
                "same_line": lines_close(b.get("line"), line),
            }
            if lines_close(b.get("line"), line):
                if b.get("no_vig") is not None:
                    matching_nv.append(b["no_vig"])
                elif b.get("implied") is not None:
                    matching_implied.append(b["implied"])

        if matching_nv:
            pct = sum(matching_nv) / len(matching_nv)
        elif matching_implied:
            pct = sum(matching_implied) / len(matching_implied)
        else:
            pct = None

        ev = None
        if pct is not None:
            ev = round((pct - 0.524) * 100, 2)

        dfs_lines = {}
        for d in dfs:
            dfs_lines[d["book"]] = {
                "line": d.get("line"),
                "price": d.get("price"),
                "multiplier": d.get("multiplier"),
            }

        out.append(
            {
                "player": player,
                "stat": primary["stat"],
                "market": market,
                "side": side,
                "line": line,
                "game": primary["game"],
                "home_team": primary["home_team"],
                "away_team": primary["away_team"],
                "commence_time": primary["commence_time"],
                "event_id": primary["event_id"],
                "pct_to_hit": None if pct is None else round(pct * 100, 1),
                "ev": ev,
                "dfs": dfs_lines,
                "books": book_map,
            }
        )

    out.sort(key=lambda r: (-(r["pct_to_hit"] or 0), r["player"], r["stat"]))
    return out


def main() -> None:
    if not API_KEY:
        die("ODDS_API_KEY is missing. Add it as a GitHub Actions secret.")

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    events = fetch_events()
    raw = []
    last_headers = {}
    for i, ev in enumerate(events, 1):
        print(f"[{i}/{len(events)}] {ev.get('away_team')} @ {ev.get('home_team')} ({ev.get('id')})")
        payload, headers = fetch_event_odds(ev["id"])
        last_headers = headers
        print_quota(headers, ev.get("id", "")[:8])
        if not payload:
            continue
        raw.extend(collect_raw(ev, payload))
        time.sleep(0.35)

    rows = build_dashboard_rows(raw)
    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sport": "NFL",
        "sport_key": SPORT,
        "regions": REGIONS,
        "markets": [m.strip() for m in MARKETS.split(",") if m.strip()],
        "hours_ahead": HOURS_AHEAD,
        "event_count": len(events),
        "row_count": len(rows),
        "props": rows,
    }
    (DATA_DIR / "nfl-props.json").write_text(json.dumps(payload, indent=2))
    meta = {
        "updated": payload["updated"],
        "row_count": payload["row_count"],
        "event_count": payload["event_count"],
        "requests_remaining": last_headers.get("x-requests-remaining"),
        "requests_used": last_headers.get("x-requests-used"),
    }
    (DATA_DIR / "meta.json").write_text(json.dumps(meta, indent=2))
    print(f"Wrote data/nfl-props.json ({len(rows)} rows from {len(events)} events)")


if __name__ == "__main__":
    main()
