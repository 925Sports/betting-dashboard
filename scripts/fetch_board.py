#!/usr/bin/env python3
"""Build NFL + CFB dashboard JSON from sheets + Kalshi."""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import fetch_nfl_props as base

NFL_PP_CSV = os.environ.get(
    "NFL_PP_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5CGYxMTghCulNtsHaMDKjkkbbYKaEWt0tJ2ie7iu-Mx2YpBClXzIZaZeYRdkg7LJlt8r_6nrxdqYa/pub?gid=2102978132&single=true&output=csv",
)
NFL_UD_CSV = os.environ.get(
    "NFL_UD_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5CGYxMTghCulNtsHaMDKjkkbbYKaEWt0tJ2ie7iu-Mx2YpBClXzIZaZeYRdkg7LJlt8r_6nrxdqYa/pub?gid=1254100508&single=true&output=csv",
)
CFB_SHEET_CSV = os.environ.get(
    "CFB_SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6uGq2C3QDX0V5QXJqdOwwPZB22sEAiJ_B2tciWZjqRrsaJO3kFu4X4jwcJQcbZKsHvchNmDLMH0_m/pub?gid=0&single=true&output=csv",
)
CFB_PP_CSV = os.environ.get(
    "CFB_PP_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSV0x8a_qRCwt9t2MRmRph7MwHioKNrZTN00niOF2spzpMzxrlaz3cKr5oE_soDhjkeH8NbU4UxsIqe/pub?gid=2102978132&single=true&output=csv",
)
CFB_UD_CSV = os.environ.get(
    "CFB_UD_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSV0x8a_qRCwt9t2MRmRph7MwHioKNrZTN00niOF2spzpMzxrlaz3cKr5oE_soDhjkeH8NbU4UxsIqe/pub?gid=1254100508&single=true&output=csv",
)
KALSHI_BASE = "https://external-api.kalshi.com/trade-api/v2"

STAT_ALIASES = {
    "pass yards": "Pass Yds", "passing yards": "Pass Yds", "pass yds": "Pass Yds",
    "rush yards": "Rush Yds", "rushing yards": "Rush Yds", "rush yds": "Rush Yds",
    "receiving yards": "Rec Yds", "rec yards": "Rec Yds", "rec yds": "Rec Yds",
    "receptions": "Receptions",
    "rush+rec yds": "Rush+Rec Yds", "rush + rec yards": "Rush+Rec Yds", "rush + rec yds": "Rush+Rec Yds",
    "pass+rush yds": "Pass+Rush Yds", "pass + rush yards": "Pass+Rush Yds", "pass + rush yds": "Pass+Rush Yds",
    "pass tds": "Pass TDs", "passing tds": "Pass TDs",
    "anytime td": "Anytime TD", "anytime touchdown": "Anytime TD",
    "fantasy score": "Fantasy Score", "fantasy pts": "Fantasy Score",
    "ints thrown": "INTs", "int": "INTs", "interceptions": "INTs",
    "pass attempts": "Pass Att", "completions": "Completions", "rush attempts": "Rush Att",
    "longest reception": "Longest Rec", "longest completion": "Longest Pass",
    "1q rec yards": "1Q Rec Yds", "1h rec yards": "1H Rec Yds",
    "1q pass yards": "1Q Pass Yds", "1h pass yards": "1H Pass Yds",
    "1q rush yards": "1Q Rush Yds", "1h rush yards": "1H Rush Yds",
    "rec targets": "Targets", "sacks": "Sacks",
}


def norm_name(s: str) -> str:
    return " ".join("".join(ch for ch in (s or "").lower() if ch.isalnum() or ch.isspace()).split())


def norm_stat(s: str) -> str:
    raw = " ".join((s or "").replace("_", " ").strip().lower().split())
    if raw.startswith("player "):
        raw = raw[7:]
    return STAT_ALIASES.get(raw, (s or "").strip())


def safe_download(url: str, label: str) -> str:
    print(f"Downloading {label}…")
    try:
        return base.download_csv(url)
    except Exception as e:
        print(f"{label} failed: {e}")
        return ""


def pct_num(v):
    n = base.to_float(v)
    if n is None:
        return None
    if n <= 1:
        n *= 100
    return round(n, 1)


def parse_pp_fields(r):
    """Handle both the official column layout and the shifted export."""
    odds = (r.get("Odds Type") or "").strip()
    shot = (r.get("Headshot URL") or "").strip()
    data = (r.get("Data ID") or "").strip()
    leagues = {"nfl", "cfb", "ncaaf", "ncaa", "college football"}
    tiers = {"standard", "demon", "goblin", "power", "mm"}
    if odds.lower() in leagues or shot.lower() in tiers:
        league, tier = odds, shot
        headshot = data if data.startswith("http") else ""
        pp_id = data if data and not data.startswith("http") else ""
    else:
        league, tier = "", odds
        headshot = shot if shot.startswith("http") else (data if data.startswith("http") else "")
        pp_id = data if data and not data.startswith("http") else ""
    tier_l = (tier or "standard").lower()
    if tier_l == "demon":
        tier = "Demon"
    elif tier_l == "goblin":
        tier = "Goblin"
    else:
        tier = "Standard"
    return league, tier, headshot, pp_id


def load_pp(url: str):
    text = safe_download(url, "PrizePicks optimizer")
    if not text:
        return []
    rows = base.parse_csv_text(text, "Date,Start Time,Player Name") or base.parse_csv_text(text)
    out = []
    for r in rows:
        player = r.get("Player Name") or ""
        if not player:
            continue
        league, tier, headshot, pp_id = parse_pp_fields(r)
        side = (r.get("Bet Tag") or "Over").strip().title()
        if side.lower() in {"more", "higher"}:
            side = "Over"
        if side.lower() in {"less", "lower"}:
            side = "Under"
        nv = pct_num(r.get("Average No-Vig Over %") if side == "Over" else r.get("Average No-Vig Under %"))
        if nv is None:
            nv = pct_num(r.get("No-Vig Over %") if side == "Over" else r.get("No-Vig Under %"))
        out.append({
            "player": player,
            "player_key": norm_name(player),
            "stat": norm_stat(r.get("Stat Type") or ""),
            "line": base.to_float(r.get("Line Score")),
            "side": side,
            "pp_tier": tier,
            "league": league,
            "headshot": headshot,
            "pp_id": pp_id,
            "projection": base.to_float(r.get("Projection")),
            "pp_edge": pct_num(r.get("% Edge")),
            "true_point": base.to_float(r.get("True Point")),
            "avg_line": base.to_float(r.get("Average Line")),
            "nv_pct": nv,
            "proj_vs_line": base.to_float(r.get("Projection vs Line")),
            "correlates": r.get("Correlates") or "",
        })
    print(f"PP rows={len(out)}")
    return out


def load_ud(url: str):
    text = safe_download(url, "Underdog filter")
    if not text:
        return []
    rows = base.parse_csv_text(text, "ID,Player Name") or base.parse_csv_text(text)
    out = []
    for r in rows:
        player = r.get("Player Name") or ""
        if not player:
            continue
        out.append({
            "player": player,
            "player_key": norm_name(player),
            "stat": norm_stat(r.get("Stat Description") or ""),
            "line": base.to_float(r.get("Stat Value")),
            "over_price": base.to_float(r.get("Higher Price")),
            "under_price": base.to_float(r.get("Lower Price")),
            "headshot": r.get("Player Image URL") or "",
            "game": r.get("Match Title") or r.get("Game Short Title") or "",
            "commence_time": r.get("Scheduled At") or "",
        })
    print(f"UD rows={len(out)}")
    return out


def sane_pct(v):
    """Hit rates only. Drop sheet formula blowups like 254%."""
    n = base.to_float(v)
    if n is None:
        return None
    if n <= 1:
        n *= 100
    if n < 1 or n > 99:
        return None
    return round(n, 1)


def attach_pp(row, p):
    row["headshot"] = p.get("headshot") or row.get("headshot")
    row["projection"] = p.get("projection")
    row["pp_sheet_edge"] = p.get("pp_edge")
    row["true_point"] = p.get("true_point")
    row["proj_vs_line"] = p.get("proj_vs_line")
    row["correlates"] = p.get("correlates")
    row["pp_id"] = p.get("pp_id") or row.get("pp_id")
    if p.get("pp_tier"):
        row["pp_tier"] = p["pp_tier"]
    row.setdefault("dfs", {})["prizepicks"] = {
        "line": p.get("line") if p.get("line") is not None else row.get("line"),
        "price": (row.get("dfs") or {}).get("prizepicks", {}).get("price") or -137,
        "multiplier": None,
        "id": p.get("pp_id") or "",
    }
    stat = str(p.get("stat") or row.get("stat") or "")
    is_fantasy = "fantasy" in stat.lower()
    edge = sane_pct(p.get("pp_edge"))
    nv = sane_pct(p.get("nv_pct"))
    line = p.get("line") if p.get("line") is not None else row.get("line")
    avg = p.get("avg_line")
    diff = None
    if line is not None and avg is not None:
        try:
            diff = abs(float(line) - float(avg))
        except (TypeError, ValueError):
            diff = None

    if is_fantasy and edge is not None:
        row["pct_to_hit"] = edge
    elif nv is not None and (diff is None or diff <= 0.25):
        row["pct_to_hit"] = nv
    elif edge is not None:
        row["pct_to_hit"] = edge
    elif nv is not None:
        row["pct_to_hit"] = nv
    cur = row.get("pct_to_hit")
    if cur is not None and (cur > 99 or cur < 1):
        row["pct_to_hit"] = edge


def enrich_props(rows, pp_rows, ud_rows):
    pp_by = defaultdict(list)
    ud_by = defaultdict(list)
    for r in pp_rows:
        pp_by[r["player_key"]].append(r)
    for r in ud_rows:
        ud_by[r["player_key"]].append(r)

    have_stat = set()
    for row in rows:
        key = norm_name(row["player"])
        have_stat.add((key, row["stat"], row.get("side")))
        best_pp, best_diff = None, 1e9
        for p in pp_by.get(key, []):
            if p["stat"] != row["stat"]:
                continue
            if p.get("side") and row.get("side") and p["side"] != row["side"]:
                continue
            diff = abs((p["line"] or 0) - (row.get("line") or 0))
            if diff < best_diff:
                best_diff, best_pp = diff, p
        if best_pp:
            attach_pp(row, best_pp)
        for u in ud_by.get(key, []):
            if u["stat"] != row["stat"]:
                continue
            row["headshot"] = row.get("headshot") or u.get("headshot")
            row.setdefault("dfs", {}).setdefault("underdog", {
                "line": u.get("line"),
                "price": u.get("over_price") if row.get("side") == "Over" else u.get("under_price"),
                "multiplier": None,
            })
            break

    extra = 0
    for p in pp_rows:
        sig = (p["player_key"], p["stat"], p.get("side"))
        if sig in have_stat:
            continue
        have_stat.add(sig)
        extra += 1
        rows.append({
            "player": p["player"], "stat": p["stat"], "market": p["stat"],
            "side": p.get("side") or "Over", "line": p.get("line"),
            "game": "", "home_team": "", "away_team": "", "commence_time": "",
            "event_id": f"pp-{p['player_key']}-{p['stat']}-{p.get('line')}-{p.get('side')}",
            "pct_to_hit": (
                sane_pct(p.get("pp_edge"))
                if "fantasy" in str(p.get("stat") or "").lower()
                else (sane_pct(p.get("nv_pct")) or sane_pct(p.get("pp_edge")))
            ),
            "ev": None, "pp_tier": p.get("pp_tier"),
            "book_line": p.get("avg_line"), "best": None, "spread": None, "total": None,
            "dfs": {"prizepicks": {"line": p.get("line"), "price": -137, "multiplier": None, "id": p.get("pp_id") or ""}},
            "books": {}, "headshot": p.get("headshot"), "projection": p.get("projection"),
            "pp_sheet_edge": p.get("pp_edge"), "true_point": p.get("true_point"),
            "proj_vs_line": p.get("proj_vs_line"),
            "correlates": p.get("correlates"), "pp_id": p.get("pp_id"),
            "sheet_only": True,
        })
    print(f"Added {extra} extra PP stat rows (combo/fantasy/etc)")
    for row in rows:
        hit = row.get("pct_to_hit")
        if hit is not None and (hit > 99 or hit < 1):
            row["pct_to_hit"] = None
    return rows


def fetch_kalshi_series(series_ticker: str, pages: int = 6):
    markets, cursor = [], None
    for _ in range(pages):
        url = f"{KALSHI_BASE}/markets?series_ticker={series_ticker}&status=open&limit=200"
        if cursor:
            url += f"&cursor={cursor}"
        req = urllib.request.Request(url, headers={"User-Agent": "betting-dashboard/kalshi"})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
        except Exception as e:
            print(f"Kalshi {series_ticker}: {e}")
            break
        batch = data.get("markets") or []
        markets.extend(batch)
        cursor = data.get("cursor")
        if not cursor or not batch:
            break
        time.sleep(0.3)
    print(f"Kalshi {series_ticker}={len(markets)}")
    return markets


def kalshi_price(m):
    last = base.to_float(m.get("last_price_dollars"))
    bid = base.to_float(m.get("yes_bid_dollars"))
    ask = base.to_float(m.get("yes_ask_dollars"))
    mid = round((bid + ask) / 2, 4) if bid is not None and ask is not None else last
    return {
        "ticker": m.get("ticker"),
        "title": m.get("title"),
        "event": m.get("event_ticker"),
        "yes_bid": bid, "yes_ask": ask, "last": last, "mid": mid,
        "volume": base.to_float(m.get("volume_fp")) or base.to_float(m.get("volume")),
        "implied": None if mid is None else round(mid * 100, 1),
        "expires": m.get("expiration_time"),
    }


def load_kalshi(sport: str):
    series = (
        {"ml": "KXNCAAFGAME", "spread": "KXNCAAFSPREAD", "total": "KXNCAAFTOTAL"}
        if sport == "CFB"
        else {"ml": "KXNFLGAME", "spread": "KXNFLSPREAD", "total": "KXNFLTOTAL"}
    )
    out = {}
    for kind, ticker in series.items():
        out[kind] = [kalshi_price(m) for m in fetch_kalshi_series(ticker)]
    return out


def load_game_map(url: str):
    if not url:
        return {}
    try:
        text = base.download_csv(url)
    except Exception as e:
        print(f"game sheet failed: {e}")
        return {}
    rows = base.parse_csv_text(text, "commence_time,bookmaker")
    by_game = {}
    for r in rows:
        home, away = r.get("home_team") or "", r.get("away_team") or ""
        if not home or not away:
            continue
        rec = by_game.setdefault(base.game_key(away, home), {
            "home_team": home, "away_team": away, "commence_time": r.get("commence_time"),
            "spread": None, "total": None, "spread_proj": None, "total_proj": None,
            "ml_home": None, "ml_away": None,
        })
        market = (r.get("market") or "").lower()
        avg, proj = base.to_float(r.get("Average Line")), base.to_float(r.get("Projection"))
        price = base.to_float(r.get("price"))
        label = (r.get("label") or "")
        if market == "spreads" and rec["spread"] is None and avg is not None:
            rec["spread"], rec["spread_proj"] = avg, proj
        if market == "totals" and rec["total"] is None and avg is not None:
            rec["total"], rec["total_proj"] = avg, proj
        if market in {"h2h", "moneyline"} and price is not None:
            if home.lower() in label.lower():
                rec["ml_home"] = rec["ml_home"] or price
            else:
                rec["ml_away"] = rec["ml_away"] or price
    print(f"game matchups={len(by_game)}")
    return by_game


def build_sport(label, sheet_url, game_url, pp_url, ud_url, out_name):
    print(f"\n===== {label} =====")
    text = safe_download(sheet_url, f"{label} props")
    sheet_rows = base.parse_csv_text(text, "id,commence_time,bookmaker") if text else []
    games = load_game_map(game_url) if game_url else {}
    raw = base.collect_raw(sheet_rows, base.HOURS_AHEAD) if sheet_rows else []
    base.attach_no_vig(raw)
    rows = base.build_dashboard_rows(raw, games) if raw else []
    rows = enrich_props(rows, load_pp(pp_url), load_ud(ud_url))
    for row in rows:
        row["sport"] = label
    kalshi = load_kalshi(label)
    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "google_sheet_csv+kalshi",
        "sport": label,
        "hours_ahead": base.HOURS_AHEAD,
        "sheet_rows": len(sheet_rows),
        "raw_count": len(raw),
        "row_count": len(rows),
        "game_count": len(games),
        "books_seen": sorted({r.get("book") for r in raw if r.get("book")}),
        "markets_seen": sorted({r.get("market") for r in raw if r.get("market")}),
        "props": rows,
        "games": [{
            "away_team": g.get("away_team"), "home_team": g.get("home_team"),
            "game": f"{g.get('away_team')} @ {g.get('home_team')}",
            "commence_time": g.get("commence_time"),
            "spread": g.get("spread"), "total": g.get("total"),
            "spread_proj": g.get("spread_proj"), "total_proj": g.get("total_proj"),
            "ml_home": g.get("ml_home"), "ml_away": g.get("ml_away"),
        } for g in games.values()],
        "kalshi": kalshi,
    }
    base.DATA_DIR.mkdir(parents=True, exist_ok=True)
    (base.DATA_DIR / out_name).write_text(json.dumps(payload))
    print(f"Wrote {out_name} props={len(rows)} games={len(payload['games'])}")
    return payload


def main():
    nfl = build_sport("NFL", base.SHEET_CSV, base.GAME_CSV, NFL_PP_CSV, NFL_UD_CSV, "nfl-props.json")
    cfb = build_sport("CFB", CFB_SHEET_CSV, "", CFB_PP_CSV, CFB_UD_CSV, "cfb-props.json")
    (base.DATA_DIR / "meta.json").write_text(json.dumps({
        "updated": nfl["updated"],
        "source": "google_sheet_csv+kalshi",
        "row_count": nfl["row_count"],
        "cfb_rows": cfb["row_count"],
        "sheet_rows": nfl["sheet_rows"],
        "raw_count": nfl["raw_count"],
        "game_count": nfl["game_count"],
        "books_seen": nfl["books_seen"],
        "markets_seen": nfl["markets_seen"],
    }, indent=2))
    print("Done.")


if __name__ == "__main__":
    main()
