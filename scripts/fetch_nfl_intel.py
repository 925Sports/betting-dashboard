#!/usr/bin/env python3
"""Ingest public NFL-Player-Log CSVs (roster, logs, injuries, news).

No ESPN scrape. Raw GitHub files only.
https://github.com/925Sports/NFL-Player-Log
Logs/injuries are 2025 data until 2026 Week 1 rows appear.
"""

from __future__ import annotations

import csv
import io
import json
import math
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"

PLAYERS_URL = "https://raw.githubusercontent.com/925Sports/NFL-Player-Log/main/data/players.csv"
LOGS_URL = "https://raw.githubusercontent.com/925Sports/NFL-Player-Log/main/data/gamelogs.csv"
INJ_URL = "https://raw.githubusercontent.com/925Sports/NFL-Player-Log/main/data/injuries.csv"
NEWS_URL = "https://raw.githubusercontent.com/925Sports/NFL-Player-Log/main/data/news_all.csv"

SKILL = {"QB", "RB", "WR", "TE", "K", "FB", "HB"}
LOG_KEEP = 8
NAME_SKIP = {"jr", "sr", "ii", "iii", "iv", "v"}

def download(url: str, label: str) -> str:
    print(f"Downloading {label}…")
    req = urllib.request.Request(url, headers={"User-Agent": "betting-dashboard/nfl-intel"})
    with urllib.request.urlopen(req, timeout=90) as resp:
        return resp.read().decode("utf-8", errors="replace")

def parse_csv(text: str) -> list[dict]:
    if not text.strip():
        return []
    sample = text[:4096]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",\t")
    except csv.Error:
        dialect = csv.excel
    rows = list(csv.DictReader(io.StringIO(text), dialect=dialect))
    return [{(k or "").strip(): (v.strip() if isinstance(v, str) else v) for k, v in r.items()} for r in rows]

def norm_name(s: str) -> str:
    return " ".join("".join(ch for ch in (s or "").lower() if ch.isalnum() or ch.isspace()).split())

def name_tokens(s: str) -> list[str]:
    return [t for t in norm_name(s).split() if t and t not in NAME_SKIP]

def last_first_key(s: str) -> str:
    toks = name_tokens(s)
    if not toks:
        return ""
    first = toks[0][0] if toks[0] else ""
    return f"{toks[-1]}|{first}"

def clean_id(v) -> str:
    s = str(v or "").strip()
    if not s or s.lower() in {"nan", "none", "null"}:
        return ""
    try:
        f = float(s)
        if math.isfinite(f) and abs(f - int(f)) < 1e-9:
            return str(int(f))
    except ValueError:
        pass
    return s

def to_int(v):
    s = str(v or "").strip()
    if not s:
        return None
    try:
        return int(float(s))
    except ValueError:
        return None

def to_float(v):
    s = str(v or "").strip()
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None

def nz(v):
    n = to_float(v)
    if n is None:
        return 0
    return n

def load_players(text: str):
    rows = parse_csv(text)
    by_gsis = {}
    by_name = {}
    by_lf = {}
    active = 0
    for r in rows:
        gsis = (r.get("gsis_id") or "").strip()
        name = r.get("full_name") or ""
        if not name:
            continue
        rec = {
            "gsis_id": gsis,
            "espn_id": clean_id(r.get("espn_id")),
            "sleeper_id": clean_id(r.get("sleeper_id")),
            "full_name": name,
            "first_name": r.get("first_name") or "",
            "last_name": r.get("last_name") or "",
            "pos": r.get("position") or r.get("depth_chart_position") or "",
            "team": r.get("team_abbr") or "",
            "jersey": clean_id(r.get("jersey")),
            "status": r.get("status") or "",
            "years_exp": to_int(r.get("years_exp")),
            "college": r.get("college") or "",
            "headshot": r.get("headshot") or "",
            "season": to_int(r.get("season")),
        }
        if gsis:
            by_gsis[gsis] = rec
        key = norm_name(name)
        if key:
            by_name.setdefault(key, rec)
        lf = last_first_key(name)
        if lf:
            by_lf.setdefault(lf, rec)
        if (rec["status"] or "").lower() == "active":
            active += 1
    print(f"players={len(rows)} gsis={len(by_gsis)} active={active}")
    return by_gsis, by_name, by_lf

def load_injuries(text: str):
    rows = parse_csv(text)
    latest = {}
    max_season, max_week = 0, 0
    for r in rows:
        season = to_int(r.get("season")) or 0
        week = to_int(r.get("week")) or 0
        if season > max_season or (season == max_season and week > max_week):
            max_season, max_week = season, week
        gsis = (r.get("gsis_id") or "").strip()
        if not gsis:
            continue
        prev = latest.get(gsis)
        if prev and (prev["season"], prev["week"]) > (season, week):
            continue
        latest[gsis] = {
            "gsis_id": gsis,
            "name": r.get("full_name") or "",
            "team": r.get("team") or "",
            "pos": r.get("position") or "",
            "season": season,
            "week": week,
            "season_type": r.get("season_type") or "",
            "report_status": r.get("report_status") or "",
            "report_injury": r.get("report_primary_injury") or "",
            "report_secondary": r.get("report_secondary_injury") or "",
            "practice_status": r.get("practice_status") or "",
            "practice_injury": r.get("practice_primary_injury") or "",
        }
    print(f"injuries rows={len(rows)} players={len(latest)} latest={max_season}w{max_week}")
    return latest, max_season, max_week

def compact_log(r: dict) -> dict:
    fg_made, fg_att = to_int(r.get("fg_made")) or 0, to_int(r.get("fg_att")) or 0
    return {
        "season": to_int(r.get("season")),
        "week": to_int(r.get("week")),
        "st": r.get("season_type") or "REG",
        "team": r.get("team") or "",
        "opp": r.get("opponent_team") or "",
        "cmp": to_int(r.get("completions")) or 0,
        "att": to_int(r.get("attempts")) or 0,
        "pass_yds": to_int(r.get("passing_yards")) or 0,
        "pass_td": to_int(r.get("passing_tds")) or 0,
        "int": to_int(r.get("passing_interceptions")) or 0,
        "car": to_int(r.get("carries")) or 0,
        "rush_yds": to_int(r.get("rushing_yards")) or 0,
        "rush_td": to_int(r.get("rushing_tds")) or 0,
        "rec": to_int(r.get("receptions")) or 0,
        "tgt": to_int(r.get("targets")) or 0,
        "rec_yds": to_int(r.get("receiving_yards")) or 0,
        "rec_td": to_int(r.get("receiving_tds")) or 0,
        "fg_made": fg_made,
        "fg_att": fg_att,
        "pat_made": to_int(r.get("pat_made")) or 0,
        "pat_att": to_int(r.get("pat_att")) or 0,
        "fant": round(nz(r.get("fantasy_points")), 1),
        "ppr": round(nz(r.get("fantasy_points_ppr")), 1),
    }

def load_logs(text: str, by_gsis: dict):
    rows = parse_csv(text)
    buckets = defaultdict(list)
    seasons = set()
    max_week_by_season = defaultdict(int)
    skill_ids = {gid for gid, p in by_gsis.items() if (p.get("pos") or "").upper() in SKILL}
    for r in rows:
        gid = (r.get("player_id") or "").strip()
        if not gid:
            continue
        if skill_ids and gid not in skill_ids and (r.get("position") or "").upper() not in SKILL:
            continue
        season = to_int(r.get("season"))
        week = to_int(r.get("week"))
        if season:
            seasons.add(season)
            if week:
                max_week_by_season[season] = max(max_week_by_season[season], week)
        buckets[gid].append(r)
    logs = {}
    for gid, recs in buckets.items():
        recs.sort(key=lambda r: (
            to_int(r.get("season")) or 0,
            0 if (r.get("season_type") or "") == "REG" else 1,
            to_int(r.get("week")) or 0,
        ))
        logs[gid] = [compact_log(r) for r in recs[-LOG_KEEP:]]
    has_2026 = any((to_int(r.get("season")) or 0) >= 2026 for recs in buckets.values() for r in recs)
    print(f"logs rows={len(rows)} players={len(logs)} seasons={sorted(seasons)} has_2026={has_2026}")
    return logs, sorted(seasons), dict(max_week_by_season), has_2026

def load_news(text: str):
    rows = parse_csv(text)
    out = []
    pulled = ""
    for r in rows:
        pulled = r.get("pulled_at") or pulled
        out.append({
            "id": r.get("article_id") or "",
            "source": (r.get("source") or "").replace("_rss", ""),
            "headline": r.get("headline") or "",
            "description": (r.get("description") or "").split("Visit RotoWire")[0].strip(),
            "published": r.get("published") or "",
            "url": r.get("web_url") or "",
            "pulled_at": r.get("pulled_at") or "",
            "players": [],
        })
    print(f"news={len(out)} pulled={pulled}")
    return out, pulled

def tag_news(news, by_name, by_gsis):
    skill = [p for p in by_gsis.values() if (p.get("pos") or "").upper() in SKILL and (p.get("status") or "").lower() == "active"]
    last_counts = defaultdict(int)
    for p in skill:
        last_counts[norm_name(p.get("last_name") or "")] += 1
    for item in news:
        blob = f"{item['headline']} {item['description']}".lower()
        hits = []
        head = item["headline"]
        if ":" in head:
            left = head.split(":", 1)[0].strip()
            rec = by_name.get(norm_name(left))
            if rec and rec.get("gsis_id"):
                hits.append(rec["gsis_id"])
        for p in skill:
            full = norm_name(p["full_name"])
            if full and full in blob:
                hits.append(p["gsis_id"])
                continue
            last = norm_name(p.get("last_name") or "")
            if last and last_counts.get(last, 0) == 1 and f" {last}" in f" {blob}":
                hits.append(p["gsis_id"])
        item["players"] = sorted(set(hits))
    tagged = sum(1 for n in news if n["players"])
    print(f"news tagged with players={tagged}/{len(news)}")

def lookup_player(name: str, by_name: dict, by_lf: dict):
    rec = by_name.get(norm_name(name))
    if rec:
        return rec
    return by_lf.get(last_first_key(name))

def last_game_for(gsis: str, logs: dict):
    recs = logs.get(gsis) or []
    return recs[-1] if recs else None

def enrich_props(by_name, by_lf, injuries, logs):
    path = DATA_DIR / "nfl-props.json"
    if not path.exists():
        print("nfl-props.json missing — skip prop attach")
        return 0
    payload = json.loads(path.read_text())
    attached = 0
    shots = 0
    for row in payload.get("props") or []:
        rec = lookup_player(row.get("player") or "", by_name, by_lf)
        if not rec:
            continue
        attached += 1
        row["gsis_id"] = rec.get("gsis_id")
        row["nfl_team"] = rec.get("team")
        row["nfl_pos"] = rec.get("pos")
        row["nfl_status"] = rec.get("status")
        if rec.get("headshot") and not row.get("headshot"):
            row["headshot"] = rec["headshot"]
            shots += 1
        inj = injuries.get(rec.get("gsis_id") or "")
        if inj and (inj.get("report_status") or inj.get("practice_status")):
            row["injury"] = {
                "week": inj.get("week"),
                "season": inj.get("season"),
                "status": inj.get("report_status") or inj.get("practice_status"),
                "injury": inj.get("report_injury") or inj.get("practice_injury"),
            }
        lg = last_game_for(rec.get("gsis_id") or "", logs)
        if lg:
            row["last_game"] = lg
    path.write_text(json.dumps(payload))
    print(f"attached intel to {attached} NFL props (headshots filled={shots})")
    return attached

def public_players(by_gsis, logs, inj_ids):
    out = {}
    for gid, p in by_gsis.items():
        pos = (p.get("pos") or "").upper()
        keep = pos in SKILL or gid in logs or gid in inj_ids
        if not keep:
            continue
        key = norm_name(p["full_name"])
        out[key] = {
            "gsis_id": gid,
            "name": p["full_name"],
            "pos": p.get("pos"),
            "team": p.get("team"),
            "status": p.get("status"),
            "headshot": p.get("headshot"),
            "espn_id": p.get("espn_id"),
        }
    return out

def main():
    players_txt = download(PLAYERS_URL, "players")
    logs_txt = download(LOGS_URL, "gamelogs")
    inj_txt = download(INJ_URL, "injuries")
    news_txt = download(NEWS_URL, "news_all")

    by_gsis, by_name, by_lf = load_players(players_txt)
    injuries, inj_season, inj_week = load_injuries(inj_txt)
    logs, seasons, weeks, has_2026 = load_logs(logs_txt, by_gsis)
    news, pulled = load_news(news_txt)
    tag_news(news, by_name, by_gsis)

    inj_list = []
    for rec in injuries.values():
        hot = rec.get("report_status") in {"Out", "Doubtful", "Questionable", "IR"}
        current_week = rec.get("season") == inj_season and rec.get("week") == inj_week
        if hot or current_week:
            name_key = norm_name(rec.get("name") or "")
            p = by_gsis.get(rec["gsis_id"]) or by_name.get(name_key)
            if p:
                rec = {
                    **rec,
                    "name": p.get("full_name") or rec.get("name"),
                    "pos": rec.get("pos") or p.get("pos"),
                    "team": rec.get("team") or p.get("team"),
                    "headshot": p.get("headshot") or "",
                    "status_roster": p.get("status") or "",
                }
            inj_list.append(rec)
    inj_list.sort(key=lambda r: (
        {"Out": 0, "IR": 1, "Doubtful": 2, "Questionable": 3}.get(r.get("report_status") or "", 9),
        r.get("team") or "",
        r.get("name") or "",
    ))

    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "925Sports/NFL-Player-Log",
        "attribution": "Player logs / roster / injuries: nflverse / nflfastR, CC BY 4.0. News: Yahoo / CBS / RotoWire RSS.",
        "news_pulled_at": pulled,
        "log_seasons": seasons,
        "log_weeks": weeks,
        "has_2026_logs": has_2026,
        "injury_season": inj_season,
        "injury_week": inj_week,
        "news": news,
        "injuries": inj_list,
        "players": public_players(by_gsis, logs, {r["gsis_id"] for r in inj_list if r.get("gsis_id")}),
        "logs": logs,
    }
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    out = DATA_DIR / "nfl-intel.json"
    out.write_text(json.dumps(payload))
    print(f"Wrote {out.name} news={len(news)} injuries={len(inj_list)} players={len(payload['players'])} log_ids={len(logs)}")
    enrich_props(by_name, by_lf, injuries, logs)
    print("Done.")

if __name__ == "__main__":
    main()
