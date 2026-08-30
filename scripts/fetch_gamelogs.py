from pathlib import Path
from datetime import datetime
import io
import pandas as pd
from espn import get_text

YEAR = datetime.utcnow().year
if datetime.utcnow().month < 3:
    YEAR = YEAR - 1

BASE = "https://github.com/nflverse/nflverse-data/releases/download/stats_player"
DATA = Path("data")
DATA.mkdir(exist_ok=True)

def pull(year):
    url = f"{BASE}/stats_player_week_{year}.csv"
    raw = get_text(url, sleep=0.2)
    if not raw:
        print("missing", url)
        return None
    df = pd.read_csv(io.BytesIO(raw))
    df.to_csv(DATA / f"gamelogs_{year}.csv", index=False)
    print(year, "rows", len(df))
    return df

def main():
    frames = []
    for y in (YEAR - 1, YEAR):
        df = pull(y)
        if df is not None:
            frames.append(df)
    if frames:
        out = pd.concat(frames, ignore_index=True)
        out.to_csv(DATA / "gamelogs.csv", index=False)
        print("combined", len(out))

    inj_url = f"https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_{YEAR}.csv"
    raw = get_text(inj_url, sleep=0.2)
    if raw:
        Path(DATA / "injuries.csv").write_bytes(raw)
        print("injuries saved")

if __name__ == "__main__":
    main()
