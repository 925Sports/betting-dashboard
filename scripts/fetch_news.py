import csv
import io
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from espn import get_json, get_text

DATA = Path("data")
DATA.mkdir(exist_ok=True)

LEAGUE_NEWS = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=50"
TEAM_NEWS = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team={tid}&limit=10"
ESPN_RSS = "https://www.espn.com/espn/rss/nfl/news"
ROTO_RSS = "https://www.rotowire.com/rss/news.php?sport=NFL"

def article_rows(articles, source, source_id=""):
    rows = []
    for a in articles or []:
        cats = a.get("categories") or []
        athlete_ids = [str(c.get("athleteId")) for c in cats if c.get("type") == "athlete" and c.get("athleteId")]
        team_ids = [str(c.get("teamId")) for c in cats if c.get("type") == "team" and c.get("teamId")]
        web = (((a.get("links") or {}).get("web") or {}).get("href")) or ""
        rows.append({
            "article_id": a.get("id"),
            "source": source,
            "source_id": source_id,
            "type": a.get("type"),
            "headline": a.get("headline"),
            "description": (a.get("description") or "")[:2000],
            "published": a.get("published") or a.get("lastModified"),
            "byline": a.get("byline"),
            "web_url": web,
            "athlete_ids": "|".join(athlete_ids),
            "team_ids": "|".join(team_ids),
            "pulled_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        })
    return rows

def parse_rss(xml_bytes, source):
    rows = []
    if not xml_bytes:
        return rows
    try:
        root = ET.parse(io.BytesIO(xml_bytes)).getroot()
    except Exception as e:
        print("rss parse fail", source, e)
        return rows
    items = root.findall(".//item")
    for it in items:
        def txt(tag):
            el = it.find(tag)
            return (el.text or "").strip() if el is not None else ""
        rows.append({
            "article_id": txt("guid") or txt("link"),
            "source": source,
            "source_id": "",
            "type": "rss",
            "headline": txt("title"),
            "description": txt("description")[:2000],
            "published": txt("pubDate"),
            "byline": "",
            "web_url": txt("link"),
            "athlete_ids": "",
            "team_ids": "",
            "pulled_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        })
    return rows

def write_csv(path, rows):
    if not rows:
        print("no rows", path)
        return
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print(path, len(rows))

def main():
    league = get_json(LEAGUE_NEWS) or {}
    rows = article_rows(league.get("articles"), "espn_league")

    team_ids = []
    if Path("data/players.csv").exists():
        import pandas as pd
        p = pd.read_csv("data/players.csv", dtype=str)
        if "team_id" in p.columns:
            team_ids = sorted(p["team_id"].dropna().unique())

    team_rows = []
    for tid in team_ids:
        data = get_json(TEAM_NEWS.format(tid=tid), sleep=0.65) or {}
        team_rows.extend(article_rows(data.get("articles"), "espn_team", tid))

    rss_rows = []
    rss_rows.extend(parse_rss(get_text(ESPN_RSS, sleep=0.3), "espn_rss"))
    rss_rows.extend(parse_rss(get_text(ROTO_RSS, sleep=0.3), "rotowire_rss"))

    write_csv(DATA / "news.csv", rows)
    write_csv(DATA / "team_news.csv", team_rows)
    write_csv(DATA / "rss_news.csv", rss_rows)

    all_rows = rows + team_rows + rss_rows
    # de-dupe by headline+source
    seen = set()
    uniq = []
    for r in all_rows:
        key = (r.get("source"), r.get("headline"))
        if key in seen:
            continue
        seen.add(key)
        uniq.append(r)
    write_csv(DATA / "news_all.csv", uniq)

if __name__ == "__main__":
    main()
