#!/usr/bin/env python3
"""Build dashboard JSON from the published Google Sheet CSV (Odds API already loaded there)."""

from __future__ import annotations

import csv
import io
import json
import os
import sys
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

SHEET_CSV = os.environ.get(
    "SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2Fdvk-56Bf-fiq8ETUftpL1W8cTqtfiOJJSehCXU60lMyo7W4_ldiGJuMrnydlZwM9fBvdrgx6VqQ/pub?gid=0&single=true&output=csv",
)
HOURS_AHEAD = int(os.environ.get("HOURS_AHEAD", "360"))
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
    "player_1st_td": "1st TD",
    "player_reception_tds": "Rec TDs",
    "player_rush_tds": "Rush TDs",
    "player_pass_completions": "Completions",
    "player_pass_attempts": "Pass Att",
    "player_rush_attempts": "Rush Att",
    "player_tackles_assists": "Tackles+Ast",
    "player_reception_longest": "Longest Rec",
    "player_pass_longest_completion": "Longest Pass",
    "player_sacks": "Sacks",
    "player_kicking_points": "Kicking Pts",
    "player_field_goals": "Field Goals",
    "player_pass_interceptions": "INTs",
    "player_pats": "PATs",
    "player_rush_reception_tds": "Rush+Rec TDs",
    "player_pass_rush_reception_tds": "Pass+Rush+Rec TDs",
}


def die(msg: str, code: int = 1) -> None:
    print(msg, file=sys.stderr)
    sys.exit(code)


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


def parse_iso(ts: str):
    if not ts:
        return None
    try:
        return datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except Exception:
        return None


def lines_close(a, b, tol: float = 0.01) -> bool:
    if a is None or b is None:
        return a is None and b is None
    try:
        return abs(float(a) - float(b)) <= tol
    except (TypeError, ValueError):
        return False


def download_csv(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "betting-dashboard/sheet-1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_sheet(text: str):
    lines = text.splitlines()
    header_idx = 0
    for i, line in enumerate(lines):
        if line.lower().startswith("id,commence_time,bookmaker"):
            header_idx = i
            break
    reader = csv.DictReader(io.StringIO("\n".join(lines[header_idx:])))
    rows = []
    for r in reader:
        if not r.get("id") or not r.get("bookmaker"):
            continue
        rows.append({k: (v.strip() if isinstance(v, str) else v) for k, v in r.items()})
    return rows


def to_float(v):
    if v is None or v == "":
        return None
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def collect_raw(sheet_rows, hours_ahead: int):
    now = datetime.now(timezone.utc)
    cutoff = now + timedelta(hours=hours_ahead)
    raw = []
    skipped_old = 0
    for r in sheet_rows:
        start = parse_iso(r.get("commence_time") or "")
        if start and not (now - timedelta(hours=6) <= start <= cutoff):
            skipped_old += 1
            continue
        player = r.get("description") or ""
        side = r.get("label") or ""
        if not player or not side:
            continue
        book = (r.get("bookmaker") or "").lower()
        market = r.get("market") or ""
        price = to_float(r.get("price"))
        point = to_float(r.get("point"))
        home = r.get("home_team") or ""
        away = r.get("away_team") or ""
        raw.append(
            {
                "event_id": r.get("id"),
                "commence_time": r.get("commence_time"),
                "home_team": home,
                "away_team": away,
                "game": f"{away} @ {home}",
                "book": book,
                "is_dfs": book in DFS_BOOKS,
                "market": market,
                "stat": STAT_LABELS.get(market, market.replace("player_", "").replace("_", " ").title()),
                "player": player,
                "side": side,
                "line": point,
                "price": price,
                "implied": american_to_implied(price),
                "no_vig": None,
            }
        )
    print(f"Sheet rows={len(sheet_rows)} in_window={len(raw)} skipped_outside_window={skipped_old}")
    return raw


def attach_no_vig(raw):
    grouped = defaultdict(dict)
    for r in raw:
        key = (r["event_id"], r["player"], r["market"], r["book"], r["line"])
        grouped[key][r["side"]] = r
    for sides in grouped.values():
        over = sides.get("Over") or sides.get("Yes")
        under = sides.get("Under") or sides.get("No")
        if over and under:
            nv_o, nv_u = no_vig_two_way(over.get("price"), under.get("price"))
            if over:
                over["no_vig"] = nv_o
            if under:
                under["no_vig"] = nv_u


def most_common_line(items):
    lines = [i.get("line") for i in items if i.get("line") is not None]
    if not lines:
        return None
    return Counter(lines).most_common(1)[0][0]


def build_dashboard_rows(raw):
    grouped = defaultdict(list)
    for r in raw:
        grouped[(r["event_id"], r["player"], r["market"], r["side"])].append(r)

    out = []
    for key, items in grouped.items():
        _, player, market, side = key
        dfs = [i for i in items if i["is_dfs"]]
        books = [i for i in items if not i["is_dfs"]]
        if not items:
            continue
        pref = {i["book"]: i for i in dfs}
        primary = (
            pref.get("prizepicks")
            or pref.get("underdog")
            or pref.get("pick6")
            or (dfs[0] if dfs else None)
            or books[0]
        )
        line = primary.get("line")
        if line is None:
            line = most_common_line(items)

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
            if lines_close(b.get("line"), line) or (b.get("line") is None and line is None):
                if b.get("no_vig") is not None:
                    matching_nv.append(b["no_vig"])
                elif b.get("implied") is not None:
                    matching_implied.append(b["implied"])

        if matching_nv:
            pct = sum(matching_nv) / len(matching_nv)
        elif matching_implied:
            pct = sum(matching_implied) / len(matching_implied)
        else:
            pct = primary.get("no_vig") or primary.get("implied")

        ev = None
        if pct is not None:
            ev = round((pct - 0.524) * 100, 2)

        dfs_lines = {}
        for d in dfs:
            dfs_lines[d["book"]] = {
                "line": d.get("line"),
                "price": d.get("price"),
                "multiplier": None,
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
    print("Downloading sheet CSV…")
    text = download_csv(SHEET_CSV)
    sheet_rows = parse_sheet(text)
    if not sheet_rows:
        die("Published sheet parsed 0 data rows. Check the CSV link is still public.")
    raw = collect_raw(sheet_rows, HOURS_AHEAD)
    attach_no_vig(raw)
    rows = build_dashboard_rows(raw)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "google_sheet_csv",
        "sport": "NFL",
        "hours_ahead": HOURS_AHEAD,
        "sheet_rows": len(sheet_rows),
        "raw_count": len(raw),
        "row_count": len(rows),
        "books_seen": sorted({r["book"] for r in raw}),
        "markets_seen": sorted({r["market"] for r in raw}),
        "props": rows,
    }
    (DATA_DIR / "nfl-props.json").write_text(json.dumps(payload, indent=2))
    (DATA_DIR / "meta.json").write_text(
        json.dumps(
            {
                "updated": payload["updated"],
                "source": "google_sheet_csv",
                "row_count": payload["row_count"],
                "sheet_rows": payload["sheet_rows"],
                "raw_count": payload["raw_count"],
                "books_seen": payload["books_seen"],
                "markets_seen": payload["markets_seen"],
            },
            indent=2,
        )
    )
    print(f"Wrote {len(rows)} dashboard rows from {len(sheet_rows)} sheet rows")
    print(f"books_seen={payload['books_seen']}")


if __name__ == "__main__":
    main()
