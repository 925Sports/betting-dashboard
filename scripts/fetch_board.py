#!/usr/bin/env python3
"""Build NFL + CFB dashboard JSON from sheets + Kalshi."""

from __future__ import annotations

import json
import math
import os
import sys
import time
import urllib.request
from collections import Counter, defaultdict
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
CFB_GAME_CSV = os.environ.get(
    "CFB_GAME_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS8KYFAnWpyXL6XY9_fYAhF1C0YRTewdTvj9Wy0s5vxhTSkFOPCf16BMbJYdyRW9mHTCoEX6RUF60zg/pub?gid=0&single=true&output=csv",
)
MLB_SHEET_CSV = os.environ.get(
    "MLB_SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUJK8Rk88pZm27OK_t8gyU4oQ846-Kp_mXsk0_iNI74lZTObf8JT9avnTA0LtFGA3Vx3xw_JpE5qV7/pub?gid=0&single=true&output=csv",
)
MLB_PP_CSV = os.environ.get(
    "MLB_PP_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLw3UZqoWqheDXCENlKhAGk8adRqvYH8LFik2LFAhKV4785KLw3a4e6jACDYPoKzqfquYDn5Tg1pB0/pub?gid=0&single=true&output=csv",
)
MLB_UD_CSV = os.environ.get(
    "MLB_UD_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLw3UZqoWqheDXCENlKhAGk8adRqvYH8LFik2LFAhKV4785KLw3a4e6jACDYPoKzqfquYDn5Tg1pB0/pub?gid=1678510326&single=true&output=csv",
)
MLB_GAME_CSV = os.environ.get(
    "MLB_GAME_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPDV6j2efSRShoyK64USbXA6s9eVrOMfWRyZ8G5-acETUwCG50BLegb9DNAj8MGFGlgjYRc9KhvEH/pub?gid=0&single=true&output=csv",
)
SOCCER_SHEET_CSV = os.environ.get(
    "SOCCER_SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSv3EqqbXNcpHISbfURZau89PstCP4UqnIly3mx73jjkqE_Y3-qrlBVCdS0j38bTOLG26THZgquT3sc/pub?gid=983904871&single=true&output=csv",
)
SOCCER_PROPS_CSV = os.environ.get(
    "SOCCER_PROPS_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSv3EqqbXNcpHISbfURZau89PstCP4UqnIly3mx73jjkqE_Y3-qrlBVCdS0j38bTOLG26THZgquT3sc/pub?gid=0&single=true&output=csv",
)
SOCCER_GAME_CSV = os.environ.get(
    "SOCCER_GAME_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSv3EqqbXNcpHISbfURZau89PstCP4UqnIly3mx73jjkqE_Y3-qrlBVCdS0j38bTOLG26THZgquT3sc/pub?gid=1659498004&single=true&output=csv",
)
SOCCER_PP_CSV = os.environ.get(
    "SOCCER_PP_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9cof5aKuKsPbVlQ8rvoVrF2-ROXq096CrSIxIOO9swtl3smSUJ2JOtNcbdpX46RVx1HuqdIGeY57S/pub?gid=0&single=true&output=csv",
)
SOCCER_UD_CSV = os.environ.get(
    "SOCCER_UD_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSv3EqqbXNcpHISbfURZau89PstCP4UqnIly3mx73jjkqE_Y3-qrlBVCdS0j38bTOLG26THZgquT3sc/pub?gid=585437603&single=true&output=csv",
)
WNBA_SHEET_CSV = os.environ.get(
    "WNBA_SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIrOa85v_E5zrjF-QB898lgw3TR8jE7tLON-aqiWkb1uZMQ1o1XwkBDwGoX01OUV2QIGU5oDl-QmyE/pub?gid=0&single=true&output=csv",
)
WNBA_UD_CSV = os.environ.get(
    "WNBA_UD_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIrOa85v_E5zrjF-QB898lgw3TR8jE7tLON-aqiWkb1uZMQ1o1XwkBDwGoX01OUV2QIGU5oDl-QmyE/pub?gid=1524552267&single=true&output=csv",
)
WNBA_GAME_CSV = os.environ.get(
    "WNBA_GAME_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIrOa85v_E5zrjF-QB898lgw3TR8jE7tLON-aqiWkb1uZMQ1o1XwkBDwGoX01OUV2QIGU5oDl-QmyE/pub?gid=2048707200&single=true&output=csv",
)
WNBA_PP_CSV = os.environ.get(
    "WNBA_PP_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRsopuNNvgPQEQBFP3JGqYf9LXHTO1sGdip73gkFTEjFw_RVVie4_ycGHC7g6RuunLvCk7yJdFp4ZxQ/pub?gid=0&single=true&output=csv",
)
CBB_SHEET_CSV = os.environ.get(
    "CBB_SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlih5zVh4Cc8lD9adZlavkQ3cGIRubL0likj4LYyhuTtdpnnZ-BodsJVBCiQa2HC8kkSNYfGaywd6P/pub?gid=0&single=true&output=csv",
)
CBB_PP_CSV = os.environ.get(
    "CBB_PP_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQx_BIRvb4w8yfASiJAmasowTnHHrHZQbKyQ6G-Nc7t1Igzx1IH-SLiOizclSV8zgThZ9qMbu7fKclo/pub?gid=0&single=true&output=csv",
)
CBB_UD_CSV = os.environ.get(
    "CBB_UD_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlih5zVh4Cc8lD9adZlavkQ3cGIRubL0likj4LYyhuTtdpnnZ-BodsJVBCiQa2HC8kkSNYfGaywd6P/pub?gid=1254100508&single=true&output=csv",
)
NBA_SHEET_CSV = os.environ.get(
    "NBA_SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYY3lCP1jiJ3x4cHr87LhcNraa7KGZRKFo1jOa9EoS5VuUEehS2faNZTTM0mhKutJ-t1CDeZF0leXh/pub?gid=0&single=true&output=csv",
)
NBA_UD_CSV = os.environ.get(
    "NBA_UD_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYY3lCP1jiJ3x4cHr87LhcNraa7KGZRKFo1jOa9EoS5VuUEehS2faNZTTM0mhKutJ-t1CDeZF0leXh/pub?gid=1254100508&single=true&output=csv",
)
NBA_PP_CSV = os.environ.get(
    "NBA_PP_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSptSZasyTv6ao6maRZ2lUPu3My2_T1gi5gm--1nQ2aGWHO2sVKjxHUPDe461SRXtVCt4iWJ3sl6lqX/pub?gid=0&single=true&output=csv",
)
NBA_GAME_CSV = os.environ.get(
    "NBA_GAME_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4xBjgmY-B5sFIFEp8LeNGl2NthvW_WHa-Dbx5CBN0WJI8xv2Cor54mERu_HujGRitJkYAT0BCmNlk/pub?gid=0&single=true&output=csv",
)
NHL_SHEET_CSV = os.environ.get(
    "NHL_SHEET_CSV",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0SqKfzPgLvDstNV43cP4g6uTjSmNnc7kf9yMW0mgXTYEeNYJXBdZS0eiDqAuXQi5E9TpeV0RqJ-NK/pub?gid=0&single=true&output=csv",
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
    "fantasy points": "Fantasy Score", "fantasy points scored": "Fantasy Score",
    "ud fantasy points": "Fantasy Score", "fantasy pt": "Fantasy Score",
    "fantasy": "Fantasy Score", "dfs fantasy points": "Fantasy Score",
    "hitter fantasy score": "Hitter Fantasy Score", "hitter fantasy points": "Hitter Fantasy Score",
    "batter fantasy score": "Hitter Fantasy Score", "batter fantasy points": "Hitter Fantasy Score",
    "pitcher fantasy score": "Pitcher Fantasy Score", "pitcher fantasy points": "Pitcher Fantasy Score",
    "hits + runs + rbis": "Hits+Runs+RBIs", "hits+runs+rbis": "Hits+Runs+RBIs",
    "hits runs rbis": "Hits+Runs+RBIs", "hrr": "Hits+Runs+RBIs",
    "hitter strikeouts": "Hitter Ks", "batter strikeouts": "Hitter Ks", "hitter ks": "Hitter Ks",
    "pitcher strikeouts": "Pitcher Ks", "pitcher ks": "Pitcher Ks", "strikeouts": "Pitcher Ks",
    "pitches seen": "Pitches Seen",
    "total bases": "Total Bases", "stolen bases": "Stolen Bases", "sb": "Stolen Bases", "stolen base": "Stolen Bases",
    "home runs": "Home Runs", "hr": "Home Runs", "hits": "Hits", "runs": "Runs",
    "rbis": "RBIs", "runs batted in": "RBIs", "rbi": "RBIs",
    "singles": "Singles", "doubles": "Doubles", "triples": "Triples",
    "walks": "Walks", "batter walks": "Walks", "bb": "Walks", "bases on balls": "Walks",
    "walks + hbp": "Walks", "hbp": "HBP", "hit by pitch": "HBP",
    "pitcher outs": "Outs", "outs": "Outs", "earned runs": "ER", "earned runs allowed": "ER",
    "hits allowed": "Hits Allowed", "walks allowed": "Walks Allowed",
    "ints thrown": "INTs", "int": "INTs", "interceptions": "INTs",
    "pass attempts": "Pass Att", "completions": "Completions", "rush attempts": "Rush Att",
    "longest reception": "Longest Rec", "longest completion": "Longest Pass",
    "1q rec yards": "1Q Rec Yds", "1h rec yards": "1H Rec Yds",
    "1q pass yards": "1Q Pass Yds", "1h pass yards": "1H Pass Yds",
    "1q rush yards": "1Q Rush Yds", "1h rush yards": "1H Rush Yds",
    "rec targets": "Targets", "sacks": "Sacks",
    "shots": "Shots", "sot": "Shots On Target", "shots on target": "Shots On Target",
    "goals": "Goals", "assists": "Assists", "g+a": "Goal + Assist",
    "g + a": "Goal + Assist", "goals + assists": "Goal + Assist",
    "goal + assist": "Goal + Assist", "anytime goal": "Anytime Goal",
    "first goal": "First Goal", "goalie saves": "Goalie Saves", "saves": "Goalie Saves",
    "tackles": "Tackles", "fouls drawn": "Fouls Drawn", "fouls committed": "Fouls",
    "1h goals": "1H Goals", "points": "Points", "rebounds": "Rebounds",
    "pts+rebs+asts": "Pts+Rebs+Asts", "pts + rebs + asts": "Pts+Rebs+Asts",
    "points + rebounds + assists": "Pts+Rebs+Asts", "pra": "Pts+Rebs+Asts",
    "pts+rebs": "Pts+Rebs", "pts + rebs": "Pts+Rebs",
    "pts+asts": "Pts+Asts", "pts + asts": "Pts+Asts",
    "rebs+asts": "Rebs+Asts", "rebs + asts": "Rebs+Asts",
    "3-pt made": "3-PT Made", "3pm": "3-PT Made", "threes": "3-PT Made",
    "3-pt attempted": "3-PT Attempted",
    "blocked shots": "Blocks", "blocks": "Blocks", "steals": "Steals",
    "turnovers": "Turnovers", "double-double": "Double-Double",
    "points (combo)": "Points (Combo)",
}


def norm_name(s: str) -> str:
    return " ".join("".join(ch for ch in (s or "").lower() if ch.isalnum() or ch.isspace()).split())


def norm_stat(s: str) -> str:
    raw = " ".join((s or "").replace("_", " ").replace("+", " + ").strip().lower().split())
    if raw.startswith("player "):
        raw = raw[7:]
    if raw.startswith("batter "):
        raw = raw[7:]
    if raw.startswith("pitcher ") and raw not in {"pitcher strikeouts", "pitcher outs", "pitcher ks", "pitcher fantasy score", "pitcher fantasy points"}:
        raw = raw[8:]
    return STAT_ALIASES.get(raw, (s or "").strip())


def same_stat(a, b) -> bool:
    a, b = norm_stat(a), norm_stat(b)
    if a == b:
        return True
    al, bl = a.lower(), b.lower()
    if "fantasy" in al and "fantasy" in bl:
        if ("pitcher" in al) != ("pitcher" in bl):
            return False
        if ("hitter" in al or "batter" in al) != ("hitter" in bl or "batter" in bl):
            return False
        return True
    return False


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
    leagues = {"nfl", "cfb", "ncaaf", "ncaa", "college football", "mlb", "soccer", "epl", "fifa", "wnba", "nba", "nhl", "cbb", "ncaab"}
    tiers = {"standard", "demon", "goblin", "power", "mm", "alternate", "alt"}
    if odds.lower() in leagues or shot.lower() in tiers:
        league, tier = odds, shot
        headshot = data if data.startswith("http") else ""
        pp_id = data if data and not data.startswith("http") else ""
    else:
        league, tier = "", odds
        headshot = shot if shot.startswith("http") else (data if data.startswith("http") else "")
        pp_id = data if data and not data.startswith("http") else ""
    tier_l = (tier or "standard").lower()
    if "demon" in tier_l:
        tier = "Demon"
    elif "goblin" in tier_l:
        tier = "Goblin"
    elif "alt" in tier_l or tier_l in {"power", "mm", "promo"}:
        tier = "Alternate"
    else:
        tier = "Standard"
    return league, tier, headshot, pp_id


def load_pp(url: str):
    text = safe_download(url, "PrizePicks optimizer")
    if not text:
        return []
    rows = (
        base.parse_csv_text(text, "Source,Sport,Player ID")
        or base.parse_csv_text(text, "Player + Prop,Player + Prop + Line")
        or base.parse_csv_text(text, "Date,Start Time,Player Name")
        or base.parse_csv_text(text, "Sport,Player ID,Player Name")
        or base.parse_csv_text(text)
    )
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
        if side.lower() not in {"over", "under", "yes", "no"}:
            eo = pct_num(r.get("Edge % Over"))
            eu = pct_num(r.get("Edge % Under"))
            side = "Under" if (eu or 0) > (eo or 0) else "Over"
        stat = norm_stat(r.get("Stat Type") or "")
        is_fantasy = "fantasy" in stat.lower()
        edge = pct_num(r.get("% Edge") or r.get("Edge %"))
        if edge is None:
            edge = pct_num(r.get("Edge % Over") if side == "Over" else r.get("Edge % Under"))
        nv = None
        if not is_fantasy:
            nv = pct_num(r.get("Average No-Vig Over %") if side == "Over" else r.get("Average No-Vig Under %"))
            if nv is None or nv > 99 or nv < 1:
                nv = pct_num(r.get("No-Vig Over %") if side == "Over" else r.get("No-Vig Under %"))
            if nv is not None and (nv > 99 or nv < 1):
                nv = None
        out.append({
            "player": player,
            "player_key": norm_name(player),
            "stat": stat,
            "line": base.to_float(r.get("Line Score")),
            "side": side,
            "pp_tier": tier,
            "league": league,
            "headshot": headshot,
            "pp_id": pp_id,
            "projection": base.to_float(r.get("Projection")),
            "pp_edge": edge,
            "true_point": base.to_float(r.get("True Point")),
            "avg_line": base.to_float(r.get("Average Line")),
            "nv_pct": nv,
            "proj_vs_line": base.to_float(r.get("Projection vs Line")),
            "correlates": r.get("Correlates") or "",
            "game": r.get("Game Short Title") or r.get("Match Title") or "",
            "commence_time": r.get("Game Start Time") or r.get("Scheduled At") or r.get("Start Time") or "",
            "spread": base.to_float(r.get("Spread")),
            "total": base.to_float(r.get("O/U")),
            "player_id": (r.get("Player ID") or "").strip(),
            "broadcasts": (r.get("Broadcasts") or "").strip(),
        })
    print(f"PP rows={len(out)}")
    return out


def load_ud(url: str):
    text = safe_download(url, "Underdog filter")
    if not text:
        return []
    rows = (
        base.parse_csv_text(text, "Source,Sport,Player ID")
        or base.parse_csv_text(text, "ID,Player Name")
        or base.parse_csv_text(text)
    )
    out = []
    for r in rows:
        player = r.get("Player Name") or ""
        if not player:
            continue
        stat = norm_stat(r.get("Stat Type") or r.get("Stat Description") or "")
        out.append({
            "player": player,
            "player_key": norm_name(player),
            "stat": stat,
            "line": base.to_float(r.get("Line Score") or r.get("Stat Value")),
            "over_price": base.to_float(r.get("Higher Price")),
            "under_price": base.to_float(r.get("Lower Price")),
            "headshot": r.get("Headshot URL") or r.get("Player Image URL") or "",
            "game": r.get("Game Short Title") or r.get("Match Title") or "",
            "commence_time": r.get("Game Start Time") or r.get("Scheduled At") or "",
            "spread": base.to_float(r.get("Spread")),
            "total": base.to_float(r.get("O/U")),
            "pp_edge": pct_num(r.get("Edge %") or r.get("% Edge")),
            "broadcasts": (r.get("Broadcasts") or "").strip(),
            "nv_over": pct_num(r.get("Average No-Vig Over %") or r.get("True Over Odds (No Vig)")),
            "nv_under": pct_num(r.get("Average No-Vig Under %") or r.get("True Under Odds (No Vig)")),
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


NAME_SKIP = {"jr", "sr", "ii", "iii", "iv", "v"}


def name_tokens(s: str):
    return [t for t in norm_name(s).split() if t and t not in NAME_SKIP]


def last_first_key(s: str) -> str:
    toks = name_tokens(s)
    if not toks:
        return ""
    first = toks[0][0] if toks[0] else ""
    return f"{toks[-1]}|{first}"


def is_whole_line(n) -> bool:
    n = base.to_float(n)
    if n is None:
        return False
    return abs(n - round(n)) < 1e-9


def poisson_pmf(k: int, lam: float) -> float:
    if k < 0 or lam <= 0:
        return 0.0
    return math.exp(-lam) * (lam ** k) / math.factorial(k)


def poisson_cdf(k: int, lam: float) -> float:
    return sum(poisson_pmf(i, lam) for i in range(max(0, int(k) + 1)))


def lambda_from_cdf(k: int, p: float) -> float:
    """Find λ such that P(X <= k) ≈ p. Higher λ lowers the CDF."""
    p = min(0.97, max(0.03, float(p)))
    lo, hi = 0.01, 80.0
    for _ in range(50):
        mid = (lo + hi) / 2.0
        if poisson_cdf(k, mid) > p:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2.0


def consensus_half_line(row) -> float | None:
    """Prefer a .5 sportsbook line next to the PrizePicks number."""
    pp = base.to_float(row.get("line"))
    book_nums = []
    for b in (row.get("books") or {}).values():
        n = base.to_float(b.get("line"))
        if n is not None:
            book_nums.append(n)
    halves = [n for n in book_nums if abs((n * 2) % 2 - 1) < 0.05]
    if pp is not None:
        near = [n for n in halves if abs(n - pp) <= 0.6]
        if near:
            return Counter(near).most_common(1)[0][0]
    if halves:
        return Counter(halves).most_common(1)[0][0]
    extra = []
    if row.get("book_line") is not None:
        extra.append(row["book_line"])
    if row.get("avg_line") is not None:
        extra.append(row["avg_line"])
    nums = [base.to_float(x) for x in book_nums + extra]
    nums = [n for n in nums if n is not None]
    if not nums:
        return None
    return Counter(nums).most_common(1)[0][0]


def strict_hit_pct(side, pp_line, book_line, raw_pct):
    """
    PrizePicks whole number: exact = void.
    Over 2 cashes only on 3+. Under 2 cashes only on 0–1.
    raw from a 1.5 / 2.5 book is P(X >= 2) or P(X <= 2), not the cash rate.
    """
    raw = sane_pct(raw_pct)
    if raw is None or not is_whole_line(pp_line):
        return raw
    bl = base.to_float(book_line)
    if bl is None:
        return raw
    L = int(round(float(pp_line)))
    p = raw / 100.0
    side = (side or "").title()
    if side == "Under" and abs(bl - (L + 0.5)) <= 0.2:
        lam = lambda_from_cdf(L, p)
        return sane_pct(poisson_cdf(L - 1, lam) * 100)
    if side == "Over" and abs(bl - (L - 0.5)) <= 0.2:
        p_le = max(0.03, min(0.97, 1.0 - p))
        lam = lambda_from_cdf(L - 1, p_le)
        return sane_pct((1.0 - poisson_cdf(L, lam)) * 100)
    return raw


def apply_strict_hit(row):
    if "fantasy" in str(row.get("stat") or "").lower():
        return
    if not is_whole_line(row.get("line")):
        return
    book_line = consensus_half_line(row)
    raw = row.get("pct_to_hit")
    adj = strict_hit_pct(row.get("side"), row.get("line"), book_line, raw)
    if adj is not None:
        row["pct_raw"] = raw
        row["pct_to_hit"] = adj
        row["hit_model"] = "cash_no_push"
        row["book_line"] = book_line


def fill_headshots(rows, *sources):
    shots = {}

    def add(name, url):
        url = (url or "").strip()
        if not name or not url or not url.startswith("http"):
            return
        shots[norm_name(name)] = url
        key = last_first_key(name)
        if key:
            shots.setdefault(key, url)

    for group in sources:
        for r in group or []:
            add(r.get("player"), r.get("headshot"))
    for r in rows:
        add(r.get("player"), r.get("headshot"))
    filled = 0
    for r in rows:
        if r.get("headshot"):
            continue
        hit = shots.get(norm_name(r.get("player") or "")) or shots.get(last_first_key(r.get("player") or ""))
        if hit:
            r["headshot"] = hit
            filled += 1
    print(f"Loose headshot fills={filled}")


def attach_pp(row, p):
    row["headshot"] = p.get("headshot") or row.get("headshot")
    row["projection"] = p.get("projection")
    row["pp_sheet_edge"] = p.get("pp_edge")
    row["true_point"] = p.get("true_point")
    row["proj_vs_line"] = p.get("proj_vs_line")
    row["correlates"] = p.get("correlates")
    row["pp_id"] = p.get("pp_id") or row.get("pp_id")
    if p.get("broadcasts") and not row.get("broadcasts"):
        row["broadcasts"] = p["broadcasts"]
    if p.get("pp_tier"):
        row["pp_tier"] = p["pp_tier"]
    row.setdefault("dfs", {})["prizepicks"] = {
        "line": p.get("line") if p.get("line") is not None else row.get("line"),
        "price": -117,
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

    if is_fantasy:
        row["pct_to_hit"] = edge
    elif nv is not None and (diff is None or diff <= 0.25):
        row["pct_to_hit"] = nv
    elif edge is not None:
        row["pct_to_hit"] = edge
    elif nv is not None:
        row["pct_to_hit"] = nv
    cur = row.get("pct_to_hit")
    if cur is not None and (cur > 99 or cur < 1):
        row["pct_to_hit"] = edge if is_fantasy else None
    if not is_fantasy:
        if row.get("book_line") is None:
            row["book_line"] = avg if avg is not None else p.get("avg_line")
        apply_strict_hit(row)


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
            if not same_stat(p["stat"], row["stat"]):
                continue
            if p.get("side") and row.get("side") and p["side"] != row["side"]:
                continue
            diff = abs((p["line"] or 0) - (row.get("line") or 0))
            if diff < best_diff:
                best_diff, best_pp = diff, p
        if best_pp:
            attach_pp(row, best_pp)
        for u in ud_by.get(key, []):
            if not same_stat(u["stat"], row["stat"]):
                continue
            row["headshot"] = row.get("headshot") or u.get("headshot")
            row.setdefault("dfs", {}).setdefault("underdog", {
                "line": u.get("line"),
                "price": u.get("over_price") if row.get("side") == "Over" else u.get("under_price"),
                "multiplier": None,
            })
            if u.get("broadcasts") and not row.get("broadcasts"):
                row["broadcasts"] = u["broadcasts"]
            break

    extra = 0
    for p in pp_rows:
        sig = (p["player_key"], p["stat"], p.get("side"))
        if sig in have_stat:
            continue
        have_stat.add(sig)
        extra += 1
        game_title = p.get("game") or ""
        away, home = "", ""
        if " @ " in game_title:
            away, home = [x.strip() for x in game_title.split(" @ ", 1)]
        rows.append({
            "player": p["player"], "stat": p["stat"], "market": p["stat"],
            "side": p.get("side") or "Over", "line": p.get("line"),
            "game": game_title, "home_team": home, "away_team": away,
            "commence_time": p.get("commence_time") or "",
            "event_id": p.get("pp_id") or f"pp-{p['player_key']}-{p['stat']}-{p.get('line')}-{p.get('side')}",
            "pct_to_hit": (
                sane_pct(p.get("pp_edge"))
                if "fantasy" in str(p.get("stat") or "").lower()
                else (sane_pct(p.get("nv_pct")) or sane_pct(p.get("pp_edge")))
            ),
            "ev": None, "pp_tier": p.get("pp_tier"),
            "book_line": p.get("avg_line"), "best": None,
            "spread": p.get("spread"), "total": p.get("total"),
            "dfs": {"prizepicks": {"line": p.get("line"), "price": -117, "multiplier": None, "id": p.get("pp_id") or ""}},
            "books": {}, "headshot": p.get("headshot"), "projection": p.get("projection"),
            "pp_sheet_edge": p.get("pp_edge"), "true_point": p.get("true_point"),
            "proj_vs_line": p.get("proj_vs_line"),
            "correlates": p.get("correlates"), "pp_id": p.get("pp_id"),
            "sheet_only": True,
            "broadcasts": p.get("broadcasts") or "",
        })
    print(f"Added {extra} extra PP stat rows (combo/fantasy/etc)")
    mark_alternate_lines(rows)
    fill_player_context(rows)
    fill_headshots(rows, pp_rows, ud_rows)
    for row in rows:
        stat = str(row.get("stat") or "")
        if "fantasy" in stat.lower():
            edge = sane_pct(row.get("pp_sheet_edge"))
            if edge is not None:
                row["pct_to_hit"] = edge
        hit = row.get("pct_to_hit")
        if hit is not None and (hit > 99 or hit < 1):
            row["pct_to_hit"] = sane_pct(row.get("pp_sheet_edge"))
        apply_strict_hit(row)
    attach_fantasy_compare(rows)
    return rows


def _is_fantasy_stat(stat: str) -> bool:
    return "fantasy" in str(stat or "").lower()


def _looks_like_qb(group) -> bool:
    return any(str(r.get("stat") or "") in {"Pass Yds", "Pass TDs", "Pass Att", "Completions", "INTs"} for r in group)


def book_line_avg(row):
    """Mean of sportsbook lines, drop high/low when 4+ books so one outlier cannot pull it."""
    nums = []
    for rec in (row.get("books") or {}).values():
        n = base.to_float((rec or {}).get("line"))
        if n is not None:
            nums.append(n)
    if not nums:
        return None
    nums.sort()
    if len(nums) >= 4:
        nums = nums[1:-1]
    return sum(nums) / len(nums)


def true_avg(row):
    """Consensus average only. Do not use a single True Point."""
    v = base.to_float(row.get("avg_line"))
    if v is not None:
        return v
    trimmed = book_line_avg(row)
    if trimmed is not None:
        return trimmed
    v = base.to_float(row.get("book_line"))
    if v is not None:
        return v
    return base.to_float(row.get("line"))


def stat_true(group, names):
    names = {n.lower() for n in names}
    picked = None
    for r in group:
        if str(r.get("stat") or "").lower() not in names:
            continue
        if r.get("avg_line") is not None:
            return round(float(r["avg_line"]), 2)
        v = true_avg(r)
        if v is not None and picked is None:
            picked = v
    return None if picked is None else round(float(picked), 2)


def attach_fantasy_compare(rows):
    """
    Compare PP vs UD Fantasy Score on the same scoring system.
    Inputs use True Point / Average Line when present.
    Football pass-catchers: PP full PPR, UD half-PPR.
      PP_equiv = UD_line + 0.5 * rec_true
      UD_equiv = PP_line - 0.5 * rec_true
    MLB hitters (UD vs PP): +1 walk, +1 double, -1 stolen base.
      PP_equiv = UD_line - BB - 2B + SB
      UD_equiv = PP_line + BB + 2B - SB
    QBs and basketball: 1-for-1.
    """
    groups = defaultdict(list)
    for r in rows:
        groups[(norm_name(r.get("player")), r.get("game") or "")].append(r)
    n = 0
    for group in groups.values():
        recs = stat_true(group, ["Receptions"])
        walks = stat_true(group, ["Walks", "Batter Walks", "BB", "HBP", "Walks + HBP"])
        doubles = stat_true(group, ["Doubles"])
        steals = stat_true(group, ["Stolen Bases", "SB"])
        qb = _looks_like_qb(group)
        sport = str((group[0].get("sport") if group else "") or "").upper()
        shared_ud = None
        shared_pp = None
        for r in group:
            if not _is_fantasy_stat(r.get("stat")):
                continue
            if (r.get("dfs") or {}).get("underdog", {}).get("line") is not None:
                shared_ud = r["dfs"]["underdog"]
            if (r.get("dfs") or {}).get("prizepicks", {}).get("line") is not None:
                shared_pp = r["dfs"]["prizepicks"]
        for r in group:
            if not _is_fantasy_stat(r.get("stat")):
                continue
            r.setdefault("dfs", {})
            if shared_ud and "underdog" not in r["dfs"]:
                r["dfs"]["underdog"] = dict(shared_ud)
            if shared_pp and "prizepicks" not in r["dfs"]:
                r["dfs"]["prizepicks"] = dict(shared_pp)
            pp_line = (r.get("dfs") or {}).get("prizepicks", {}).get("line")
            if pp_line is None and "prizepicks" in str(r.get("stat") or "").lower():
                pp_line = r.get("line")
            if pp_line is None and r.get("dfs", {}).get("prizepicks"):
                pp_line = r.get("line")
            ud = (r.get("dfs") or {}).get("underdog") or {}
            ud_line = ud.get("line")
            if pp_line is None:
                pp_line = r.get("line") if (r.get("dfs") or {}).get("prizepicks") else None
            mode = "same"
            recs_used = None
            ud_as_pp = ud_line
            pp_as_ud = pp_line
            if sport in {"NFL", "CFB"} and not qb:
                mode = "ppr_vs_half"
                recs_used = recs
                if recs is not None:
                    if ud_line is not None:
                        ud_as_pp = round(float(ud_line) + 0.5 * recs, 2)
                    if pp_line is not None:
                        pp_as_ud = round(float(pp_line) - 0.5 * recs, 2)
                else:
                    mode = "ppr_vs_half_no_recs"
            elif sport == "MLB" and "pitcher" not in str(r.get("stat") or "").lower():
                mode = "mlb_hitter"
                bb, two_b, sb = walks or 0.0, doubles or 0.0, steals or 0.0
                if walks is None and doubles is None and steals is None:
                    mode = "mlb_hitter_no_avgs"
                else:
                    if ud_line is not None:
                        ud_as_pp = round(float(ud_line) - bb - two_b + sb, 2)
                    if pp_line is not None:
                        pp_as_ud = round(float(pp_line) + bb + two_b - sb, 2)
            if ud_line is not None or pp_line is not None:
                r["fantasy_cmp"] = {
                    "pp": pp_line,
                    "ud": ud_line,
                    "ud_as_pp": ud_as_pp,
                    "pp_as_ud": pp_as_ud,
                    "recs": recs_used,
                    "walks": walks,
                    "doubles": doubles,
                    "steals": steals,
                    "mode": mode,
                    "diff_pp": None if pp_line is None or ud_as_pp is None else round(float(ud_as_pp) - float(pp_line), 2),
                    "diff_ud": None if ud_line is None or pp_as_ud is None else round(float(pp_as_ud) - float(ud_line), 2),
                }
                if ud and ud_as_pp is not None:
                    ud["line_raw"] = ud_line
                    ud["line_pp"] = ud_as_pp
                n += 1
    print(f"fantasy compares={n}")


def mark_alternate_lines(rows):
    """Keep one Standard line per player/stat/game; extra numbers are Alternate."""
    groups = defaultdict(list)
    marked = 0
    for row in rows:
        market = str(row.get("market") or "") + " " + str(row.get("stat") or "")
        if "alternate" in market.lower() or " alt" in f" {market.lower()}":
            if (row.get("pp_tier") or "Standard") == "Standard":
                row["pp_tier"] = "Alternate"
                marked += 1
            row["is_alternate"] = True
        if not (row.get("dfs") or {}).get("prizepicks"):
            continue
        if (row.get("pp_tier") or "Standard") != "Standard":
            continue
        key = (norm_name(row.get("player") or ""), row.get("stat"), row.get("game") or row.get("event_id"))
        groups[key].append(row)
    for recs in groups.values():
        if len(recs) < 2:
            continue
        def dist(r):
            line = None
            try:
                line = (r.get("dfs") or {}).get("prizepicks", {}).get("line")
            except Exception:
                line = None
            if line is None:
                line = r.get("line")
            ref = r.get("avg_line") if r.get("avg_line") is not None else r.get("book_line")
            try:
                return abs(float(line) - float(ref)) if line is not None and ref is not None else 0.0
            except (TypeError, ValueError):
                return 0.0
        recs.sort(key=dist)
        for r in recs[1:]:
            r["pp_tier"] = "Alternate"
            r["is_alternate"] = True
            marked += 1
    print(f"Marked {marked} Alternate lines")


def fill_player_context(rows):
    """Copy game / spread / total / time / headshot onto sheet-only rows like Fantasy Score."""
    by_player = defaultdict(list)
    for row in rows:
        by_player[norm_name(row.get("player") or "")].append(row)
    for recs in by_player.values():
        donor = None
        for r in recs:
            if r.get("home_team") or r.get("away_team") or r.get("game") or r.get("spread") is not None:
                donor = r
                break
        if not donor:
            continue
        for r in recs:
            if not r.get("home_team"):
                r["home_team"] = donor.get("home_team") or ""
            if not r.get("away_team"):
                r["away_team"] = donor.get("away_team") or ""
            if not r.get("game"):
                r["game"] = donor.get("game") or ""
            if not r.get("commence_time"):
                r["commence_time"] = donor.get("commence_time") or ""
            if r.get("spread") is None:
                r["spread"] = donor.get("spread")
            if r.get("total") is None:
                r["total"] = donor.get("total")
            if r.get("spread_proj") is None:
                r["spread_proj"] = donor.get("spread_proj")
            if r.get("total_proj") is None:
                r["total_proj"] = donor.get("total_proj")
            if not r.get("headshot"):
                r["headshot"] = donor.get("headshot") or ""
            if not r.get("broadcasts"):
                r["broadcasts"] = donor.get("broadcasts") or ""
            if not r.get("event_id") or str(r.get("event_id") or "").startswith("pp-"):
                if donor.get("event_id") and not str(donor.get("event_id")).startswith("pp-"):
                    r["event_id"] = donor.get("event_id")


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
    series = {
        "CFB": {"ml": "KXNCAAFGAME", "spread": "KXNCAAFSPREAD", "total": "KXNCAAFTOTAL"},
        "MLB": {"ml": "KXMLBGAME", "spread": "KXMLBSPREAD", "total": "KXMLBTOTAL"},
        "NFL": {"ml": "KXNFLGAME", "spread": "KXNFLSPREAD", "total": "KXNFLTOTAL"},
        "NBA": {"ml": "KXNBAGAME", "spread": "KXNBASPREAD", "total": "KXNBATOTAL"},
        "WNBA": {"ml": "KXWNBAGAME", "spread": "KXWNBASPREAD", "total": "KXWNBATOTAL"},
        "NHL": {"ml": "KXNHLGAME", "spread": "KXNHLSPREAD", "total": "KXNHLTOTAL"},
    }.get(sport)
    if not series:
        return {"ml": [], "spread": [], "total": []}
    out = {}
    pages = 2 if sport in {"NBA", "WNBA", "NHL"} else 6
    for kind, ticker in series.items():
        out[kind] = [kalshi_price(m) for m in fetch_kalshi_series(ticker, pages=pages)]
    return out


def load_game_map(url: str):
    if not url:
        return {}
    try:
        text = base.download_csv(url)
    except Exception as e:
        print(f"game sheet failed: {e}")
        return {}
    rows = base.parse_csv_text(text, "commence_time,bookmaker|sport_key,id,commence_time|id,commence_time,bookmaker")
    by_game = {}
    for r in rows:
        home, away = r.get("home_team") or "", r.get("away_team") or ""
        if not home or not away:
            continue
        rec = by_game.setdefault(base.game_key(away, home), {
            "home_team": home, "away_team": away, "commence_time": r.get("commence_time"),
            "spread": None, "total": None, "spread_proj": None, "total_proj": None,
            "ml_home": None, "ml_away": None, "books": {},
        })
        market = (r.get("market") or "").lower()
        avg = base.to_float(r.get("Average Line"))
        proj = base.to_float(r.get("Projection"))
        point = base.to_float(r.get("point"))
        price = base.to_float(r.get("price"))
        over_p = base.to_float(r.get("Over Price"))
        under_p = base.to_float(r.get("Under Price"))
        label = (r.get("label") or "")
        book = base.canon_book(r.get("bookmaker") or "")
        line = point if point is not None else avg
        if market == "spreads" and rec["spread"] is None and (avg if avg is not None else point) is not None:
            rec["spread"], rec["spread_proj"] = (avg if avg is not None else point), proj
        if market == "totals" and rec["total"] is None and (avg if avg is not None else point) is not None:
            rec["total"], rec["total_proj"] = (avg if avg is not None else point), proj
        # h2h point is 0.5 (to win). Over Price = away ML, Under Price = home ML.
        is_ml = market in {"h2h", "moneyline", "ml"}
        home_ml = under_p if is_ml else None
        away_ml = over_p if is_ml else None
        if is_ml:
            if price is not None and home.lower() in (label or "").lower():
                home_ml = home_ml if home_ml is not None else price
            elif price is not None and away.lower() in (label or "").lower():
                away_ml = away_ml if away_ml is not None else price
            if home_ml is not None:
                rec["ml_home"] = rec["ml_home"] or home_ml
            if away_ml is not None:
                rec["ml_away"] = rec["ml_away"] or away_ml
        if book:
            slot = rec["books"].setdefault(book, {})
            if market == "spreads" and line is not None:
                slot["spread"] = {"line": line, "home": over_p, "away": under_p}
            elif market == "totals" and line is not None:
                slot["total"] = {"line": line, "over": over_p, "under": under_p}
            elif is_ml:
                ml = slot.setdefault("ml", {})
                if home_ml is not None:
                    ml["home"] = home_ml
                if away_ml is not None:
                    ml["away"] = away_ml
    print(f"game matchups={len(by_game)}")
    return by_game


def build_sport(label, sheet_url, game_url, pp_url, ud_url, out_name):
    print(f"\n===== {label} =====")
    text = safe_download(sheet_url, f"{label} props")
    sheet_rows = []
    if text:
        sheet_rows = (
            base.parse_csv_text(text, "id,commence_time,bookmaker")
            or base.parse_csv_text(text, "commence_time,bookmaker,last_update")
            or base.parse_csv_text(text, "sport_key,id,commence_time")
            or base.parse_csv_text(text)
        )
    games = load_game_map(game_url) if game_url else {}
    raw = base.collect_raw(sheet_rows, base.HOURS_AHEAD) if sheet_rows else []
    if not raw and label == "SOCCER":
        text2 = safe_download(SOCCER_PROPS_CSV, "SOCCER player props fallback")
        extra = base.parse_csv_text(text2, "id,commence_time,bookmaker") if text2 else []
        raw = base.collect_raw(extra, base.HOURS_AHEAD) if extra else []
        sheet_rows = extra or sheet_rows
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
            "books": g.get("books") or {},
        } for g in games.values()],
        "kalshi": kalshi,
    }
    base.DATA_DIR.mkdir(parents=True, exist_ok=True)
    (base.DATA_DIR / out_name).write_text(json.dumps(payload))
    print(f"Wrote {out_name} props={len(rows)} games={len(payload['games'])}")
    return payload


def main():
    nfl = build_sport("NFL", base.SHEET_CSV, base.GAME_CSV, NFL_PP_CSV, NFL_UD_CSV, "nfl-props.json")
    cfb = build_sport("CFB", CFB_SHEET_CSV, CFB_GAME_CSV, CFB_PP_CSV, CFB_UD_CSV, "cfb-props.json")
    mlb = build_sport("MLB", MLB_SHEET_CSV, MLB_GAME_CSV, MLB_PP_CSV, MLB_UD_CSV, "mlb-props.json")
    soccer = build_sport("SOCCER", SOCCER_SHEET_CSV or SOCCER_PROPS_CSV, SOCCER_GAME_CSV, SOCCER_PP_CSV, SOCCER_UD_CSV, "soccer-props.json")
    wnba = build_sport("WNBA", WNBA_SHEET_CSV, WNBA_GAME_CSV, WNBA_PP_CSV, WNBA_UD_CSV, "wnba-props.json")
    cbb = build_sport("CBB", CBB_SHEET_CSV, "", CBB_PP_CSV, CBB_UD_CSV, "cbb-props.json")
    nba = build_sport("NBA", NBA_SHEET_CSV, NBA_GAME_CSV, NBA_PP_CSV, NBA_UD_CSV, "nba-props.json")
    nhl = build_sport("NHL", NHL_SHEET_CSV, "", "", "", "nhl-props.json")
    (base.DATA_DIR / "meta.json").write_text(json.dumps({
        "updated": nfl["updated"],
        "source": "google_sheet_csv+kalshi",
        "row_count": nfl["row_count"],
        "cfb_rows": cfb["row_count"],
        "mlb_rows": mlb["row_count"],
        "soccer_rows": soccer["row_count"],
        "wnba_rows": wnba["row_count"],
        "cbb_rows": cbb["row_count"],
        "nba_rows": nba["row_count"],
        "nhl_rows": nhl["row_count"],
        "sheet_rows": nfl["sheet_rows"],
        "raw_count": nfl["raw_count"],
        "game_count": nfl["game_count"],
        "books_seen": nfl["books_seen"],
        "markets_seen": nfl["markets_seen"],
    }, indent=2))
    print("Done.")


if __name__ == "__main__":
    main()
