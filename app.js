const DATA_URLS = {
  nfl: "./data/nfl-props.json",
  cfb: "./data/cfb-props.json",
  mlb: "./data/mlb-props.json",
  soccer: "./data/soccer-props.json",
  wnba: "./data/wnba-props.json",
  nba: "./data/nba-props.json",
  cbb: "./data/cbb-props.json",
  nhl: "./data/nhl-props.json",
};
const INTEL_URL = "./data/nfl-intel.json";
const NBA_INTEL_URL = "./data/nba-intel.json";
const SPORT_LABEL = { nfl: "NFL", cfb: "CFB", mlb: "MLB", soccer: "SOCCER", wnba: "WNBA", nba: "NBA", cbb: "CBB", nhl: "NHL" };

const BOOKS = [
  { key: "prizepicks", label: "PP", name: "PrizePicks", color: "#6D28FF", dfs: true, on: true, tile: "#6D28FF", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBa_IfAC9uxHYxj3nRDqyo09hGsSkT4crW1duodUEJTw&s=10" },
  { key: "underdog", label: "UD", name: "Underdog", color: "#FFE500", dfs: true, on: true, tile: "#FFE500", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT72uOdgpjWIynJRaFuKdRKhojBxPd54jbqPeLErnwYRg&s" },
  { key: "pick6", label: "P6", name: "Pick6", color: "#FF6A00", dfs: true, on: true, tile: "#FF6A00", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqxkzAMYVivcvVOqljmDRMjW0xq78Wu_YksmtYFcaPg&s=10" },
  { key: "draftkings", label: "DK", name: "DraftKings", color: "#53D337", dfs: false, on: true, logo: "https://play-lh.googleusercontent.com/Aqu9BtAN0cgtogg7AJErJ0RT82ivWsA2EiBI4iloW6kPfnBMZ-gmoj8Iy8_Z1nmxYkgOSQatDI57zdhq4an0Rg=s0-br30" },
  { key: "fanduel", label: "FD", name: "FanDuel", color: "#1493FF", dfs: false, on: true, logo: "https://play-lh.googleusercontent.com/dg5hlupv1IDaHY2ibnZH1OJNCsw4dEac6jfeFxcVPpxs8rViIRgycCzduFTfiRS9HSNCJRVEBJMZ8YJAJw_T6vk" },
  { key: "williamhill_us", label: "CZR", name: "Caesars", color: "#C4A35A", dfs: false, on: true, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsnSJDGtHOCIv5imAbtjXUGGjsdjVRhCfgpGD651QsDg&s" },
  { key: "novig", label: "NOV", name: "Novig", color: "#9B7DFF", dfs: false, on: true, exchange: true, logo: "https://play-lh.googleusercontent.com/q65mzlKmwoQiqMqwpamDZ12bgt1YpOc_nTH_N0waJ-6oOd1tUdMT8YGSdYsmEaTeIkdhTNC7hFDqq8T5OvAwi1I=w240-h480-rw" },
  { key: "betrivers", label: "RIV", name: "BetRivers", color: "#E23B3B", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUZHtfy1YTi8HJghX7jST2Z8b-cJTZokW7i2vONeU1A&s=10" },
  { key: "espnbet", label: "ESPN", name: "theScore Bet", color: "#1B4FA3", dfs: false, on: false, logo: "https://elitesportsny.com/app/uploads/2023/11/cgen-partner-icon-thescorebet-300x300-1.png" },
  { key: "betparx", label: "PARX", name: "BetParx", color: "#2BB0A6", dfs: false, on: false, logo: "https://mma.prnewswire.com/media/1952755/betPARX_logo.jpg?p=facebook" },
  { key: "ballybet", label: "BAL", name: "Bally Bet", color: "#E6C200", dfs: false, on: false, logo: "https://assets.actionnetwork.com/261589_BallyBet.png" },
  { key: "betonlineag", label: "BOL", name: "BetOnline", color: "#3D7BFF", dfs: false, on: false, logo: "https://mma.prnewswire.com/media/2323695/betonline_logo.jpg?p=facebook" },
  { key: "prophetx", label: "PX", name: "ProphetX", color: "#4CC9F0", dfs: false, on: true, exchange: true, logo: "https://play-lh.googleusercontent.com/zeTZent4Try2Ck1Rl93lOPtLpO6y5jAZ6IZTid-x4eDA-k_sGX6PQAO8XoHL5cETPVnUxddoR_kHASzg6riBxQ" },
  { key: "betmgm", label: "MGM", name: "BetMGM", color: "#C4A35A", dfs: false, on: false, logo: "https://play-lh.googleusercontent.com/8GjU4o5tBpLJ5AT_4eqEiwTz9dy_nVFsLsmlPpsMjMIOCrskJSNLzZkpsgHQp1c1cNhRqfsZns1BPK9Qywh8eXY" },
  { key: "bovada", label: "BOV", name: "Bovada", color: "#E10600", dfs: false, on: true, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaEtH4vUZ5xn5VsCjTI83Mtg-2HRmiyRiDPrp6qCfzQ&s" },
  { key: "fliff", label: "FLF", name: "Fliff", color: "#2BB8C8", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm10PVwjP3RMEzbVw2-Jjulm10qZEKA8R5MpZZWYnwrg&s=10" },
  { key: "hardrockbet", label: "HRB", name: "Hard Rock Bet", color: "#7B4BFF", dfs: false, on: true, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_S4jfOi856zdvQpLs4_tikOvNEH8skoe7DHw5djbqg&s=10" },
  { key: "ladbrokes", label: "LAD", name: "Ladbrokes", color: "#E10600", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkaiy5fl7ApBmt52nq9bGUqJj3kAvH7HwBWaSndj1KA&s=10" },
  { key: "pinnacle", label: "PIN", name: "Pinnacle", color: "#F26A21", dfs: false, on: true, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9kxbJqjWvs-TSUYr-fKUvsn4x5q-uuuQzADsBRIijQ&s=10" },
  { key: "kalshi", label: "KAL", name: "Kalshi", color: "#00D4AA", dfs: false, on: true, exchange: true, logo: "https://kalshi.com/favicon.ico" },
  { key: "pointsbet", label: "PB", name: "PointsBet", color: "#E1062A", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhU5K6C-Bvro0jHJm4wDxyHL7-0kkKfpnKxraxVCoXjg&s=10" },
  { key: "rebet", label: "REB", name: "ReBet", color: "#FF6A00", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyaJLsiu_ZP8O7szIrosaofgPNwxAWnUX--JNk9EkKIw&s" },
  { key: "sportsbet", label: "SB", name: "Sportsbet", color: "#1A73E8", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC5PiimMuDZXrn-cs1LiQZetRIa5apk47uXL8nzXyABw&s=10" },
  { key: "lowvig", label: "LV", name: "LowVig", color: "#6AA8FF", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn_v2-jq2tK8KhaK22Y1nzy-eKS64xKPQxAdRLd02hgg&s=10" },
  { key: "betus", label: "BUS", name: "BetUS", color: "#2E7D32", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDsdHZiNvjwjr9siD-voOquXBP8n4Gn1PnKGA7Nij9w&s" },
  { key: "fanatics", label: "FAN", name: "Fanatics", color: "#E1062A", dfs: false, on: false, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSux_F3VXmZFaIhASk929Dlir6zaoojrqsQnny1bU_w7kr428BXiCWnv0&s=10" },
  { key: "mybookieag", label: "MB", name: "MyBookie", color: "#F5A623", dfs: false, on: false, logo: "https://play-lh.googleusercontent.com/4xoo_moz_ctNrvD9dwcZhUKBOxD6fJJlL1z6LBlRe1NvAS_Ga2ahPlJpY10nNVEtVZbvp7jpC6brEF6PCA6V" },
];

const PP_BE = { 2: 57.74, 3: 58.48, 4: 56.23, 5: 54.93, 6: 54.09 };

const TEAM_ABBR = {
  "Arizona Cardinals": "ARI", "Atlanta Falcons": "ATL", "Baltimore Ravens": "BAL",
  "Buffalo Bills": "BUF", "Carolina Panthers": "CAR", "Chicago Bears": "CHI",
  "Cincinnati Bengals": "CIN", "Cleveland Browns": "CLE", "Dallas Cowboys": "DAL",
  "Denver Broncos": "DEN", "Detroit Lions": "DET", "Green Bay Packers": "GB",
  "Houston Texans": "HOU", "Indianapolis Colts": "IND", "Jacksonville Jaguars": "JAX",
  "Kansas City Chiefs": "KC", "Las Vegas Raiders": "LV", "Los Angeles Chargers": "LAC",
  "Los Angeles Rams": "LAR", "Miami Dolphins": "MIA", "Minnesota Vikings": "MIN",
  "New England Patriots": "NE", "New Orleans Saints": "NO", "New York Giants": "NYG",
  "New York Jets": "NYJ", "Philadelphia Eagles": "PHI", "Pittsburgh Steelers": "PIT",
  "San Francisco 49ers": "SF", "Seattle Seahawks": "SEA", "Tampa Bay Buccaneers": "TB",
  "Tennessee Titans": "TEN", "Washington Commanders": "WAS",
};

const TEAM_NICK = {};
Object.entries(TEAM_ABBR).forEach(([full, ab]) => {
  TEAM_NICK[full.toLowerCase()] = ab;
  TEAM_NICK[ab.toLowerCase()] = ab;
  const nick = full.split(" ").pop();
  if (nick && !["York", "Angeles", "Bay", "England", "Orleans", "City"].includes(nick)) {
    TEAM_NICK[nick.toLowerCase()] = ab;
  }
});

const STADIUMS = {
  ARI: "State Farm Stadium · Glendale, AZ", ATL: "Mercedes-Benz Stadium · Atlanta, GA",
  BAL: "M&T Bank Stadium · Baltimore, MD", BUF: "Highmark Stadium · Orchard Park, NY",
  CAR: "Bank of America Stadium · Charlotte, NC", CHI: "Soldier Field · Chicago, IL",
  CIN: "Paycor Stadium · Cincinnati, OH", CLE: "Huntington Bank Field · Cleveland, OH",
  DAL: "AT&T Stadium · Arlington, TX", DEN: "Empower Field at Mile High · Denver, CO",
  DET: "Ford Field · Detroit, MI", GB: "Lambeau Field · Green Bay, WI",
  HOU: "NRG Stadium · Houston, TX", IND: "Lucas Oil Stadium · Indianapolis, IN",
  JAX: "EverBank Stadium · Jacksonville, FL", KC: "GEHA Field at Arrowhead · Kansas City, MO",
  LV: "Allegiant Stadium · Las Vegas, NV", LAC: "SoFi Stadium · Inglewood, CA",
  LAR: "SoFi Stadium · Inglewood, CA", MIA: "Hard Rock Stadium · Miami Gardens, FL",
  MIN: "U.S. Bank Stadium · Minneapolis, MN", NE: "Gillette Stadium · Foxborough, MA",
  NO: "Caesars Superdome · New Orleans, LA", NYG: "MetLife Stadium · East Rutherford, NJ",
  NYJ: "MetLife Stadium · East Rutherford, NJ", PHI: "Lincoln Financial Field · Philadelphia, PA",
  PIT: "Acrisure Stadium · Pittsburgh, PA", SF: "Levi's Stadium · Santa Clara, CA",
  SEA: "Lumen Field · Seattle, WA", TB: "Raymond James Stadium · Tampa, FL",
  TEN: "Nissan Stadium · Nashville, TN", WAS: "Northwest Stadium · Landover, MD",
};

const PASS_STATS = new Set(["Pass Yds", "Pass TDs", "Pass+Rush Yds", "Pass Att", "Completions", "Fantasy Score"]);
const CATCH_STATS = new Set(["Rec Yds", "Receptions", "Rush+Rec Yds", "Targets"]);
const RUSH_STATS = new Set(["Rush Yds", "Rush Att", "Anytime TD", "Rush+Rec Yds"]);

const CORE_STATS = new Set([
  "Pass Yds", "Rush Yds", "Receptions", "Rec Yds", "Rush+Rec Yds",
  "Pass TDs", "Anytime TD", "Fantasy Score", "Pass+Rush Yds",
  "Shots", "Shots On Target", "Goals", "Assists", "Goal + Assist", "Anytime Goal", "Goalie Saves",
  "Points", "Rebounds", "Pts+Rebs+Asts", "Pts+Rebs", "Pts+Asts", "3-PT Made",
]);
const FALLBACK_HEAD = "https://www.freeiconspng.com/uploads/--tie-user-users-work-worker-working-icon--icon-search-engine-6.png";

const DEFAULT_ON = new Set(BOOKS.filter((b) => b.on).map((b) => b.key));
const BOOK_BY_KEY = Object.fromEntries(BOOKS.map((b) => [b.key, b]));

const state = {
  data: null,
  intel: null,
  sortKey: "ev",
  sortDir: "desc",
  view: "pp", sport: "all", section: "props",
  groupView: { dfs: "pp", exchanges: "prophetx", books: "books" },
  savedMin: { dfs: "50", exchanges: "0", books: "0" },
  minGroup: "dfs",
  market: "dfs",
  booksOn: new Set(DEFAULT_ON),
  slip: [],
  slipSize: 5,
  picks: [],
  previewGame: "",
  minBooks: true,
  volFilter: "game",
  popupChartAll: false,
  layout: localStorage.getItem("ev_layout") || "table",
  popupKey: "",
};

const $ = (id) => document.getElementById(id);

function american(price) {
  if (price == null || price === "") return "—";
  const n = Number(price);
  if (Number.isNaN(n)) return "—";
  return n > 0 ? `+${Math.round(n)}` : String(Math.round(n));
}

function pickSize() { return Number($("picks").value || 5); }
function breakEven() {
  if (state.view === "ud") return 52.5;
  if (["prophetx", "novig", "kalshi", "polymarket"].includes(state.view)) return 50;
  return PP_BE[pickSize()] || 54.93;
}

function bookNoVig(row) {
  const line = Number(row.line);
  const vals = Object.values(mergeBooks(row.books) || {})
    .filter((b) => {
      if (!b) return false;
      const bl = Number(b.line);
      // Whole number lines must match exactly. Do not borrow a .5 line.
      const tol = isWholeLine(line) ? 0.05 : 0.6;
      if (Number.isFinite(line) && Number.isFinite(bl) && Math.abs(bl - line) > tol) return false;
      return true;
    })
    .map((b) => {
      let n = Number(b?.no_vig);
      const placeholder = !Number.isFinite(n) || n === 0.5 || n === 50;
      if (Number.isFinite(n) && n > 0 && n <= 1) n = n * 100;
      if (placeholder || !Number.isFinite(n) || n <= 5 || n >= 95) {
        const ip = bookImplied(b?.price);
        if (ip != null) n = ip;
      }
      return n;
    })
    .filter((n) => Number.isFinite(n) && n > 5 && n < 95);
  if (!vals.length) return null;
  vals.sort((a, b) => a - b);
  const mid = vals[Math.floor(vals.length / 2)];
  const tight = vals.filter((n) => Math.abs(n - mid) <= 8);
  const pool = tight.length >= 2 ? tight : vals;
  pool.sort((a, b) => a - b);
  return +pool[Math.floor(pool.length / 2)].toFixed(1);
}

function offerImplied(row) {
  if (state.view === "ud") {
    const u = row.dfs?.underdog || {};
    if (u.multiplier != null && Number(u.multiplier) > 0) {
      const m = Number(u.multiplier);
      return +((100 / (m >= 1 ? m : 1 + m))).toFixed(1);
    }
    if (u.price != null && Number(u.price) !== -112) return bookImplied(u.price);
  }
  if (state.view === "prophetx") return bookImplied(row.books?.prophetx?.price);
  if (state.view === "novig") return bookImplied(row.books?.novig?.price);
  const prices = Object.values(mergeBooks(row.books) || {}).map((b) => b?.price).filter((p) => p != null);
  const impl = prices.map(bookImplied).filter((n) => n != null);
  if (!impl.length) return null;
  return +Math.min(...impl).toFixed(1);
}

function exchangeFair(row, skip) {
  const pack = fairQuotes(row, skip);
  if (!pack.vals.length) return null;
  const vals = pack.vals.slice().sort((a, b) => a - b);
  const lo = Math.floor(vals.length * 0.1);
  const hi = Math.ceil(vals.length * 0.9);
  const pool = vals.slice(lo, hi);
  const use = pool.length ? pool : vals;
  return +(use.reduce((a, b) => a + b, 0) / use.length).toFixed(1);
}

const DFS_KEYS = new Set(["prizepicks", "underdog", "pick6", "betr", "dabble"]);
const EXCHANGE_KEYS = new Set(["prophetx", "novig", "kalshi", "polymarket"]);

function isExchangeView(view) {
  const v = arguments.length ? view : state.view;
  return EXCHANGE_KEYS.has(v);
}

function isPricedView(view) {
  const v = arguments.length ? view : state.view;
  return EXCHANGE_KEYS.has(v) || v === "dabble" || v === "betr";
}

function quoteLine(row, key) {
  if (key === "kalshi") {
    const k = kalshiOffer(row);
    if (!k) return null;
    const title = String(k.title || "");
    const n = kalshiThreshold(title);
    if (!Number.isFinite(n)) return null;
    return /\d\s*\+/.test(title) ? n - 0.5 : n;
  }
  const b = bookOffer(row, key);
  const line = Number(b?.line);
  return Number.isFinite(line) ? line : null;
}

function fairLine(row, skip) {
  if (isPricedView(skip)) {
    const line = quoteLine(row, skip);
    if (line != null) return line;
  }
  return Number(row?.line);
}

function fairQuotes(row, skip) {
  const line = fairLine(row, skip);
  const books = [];
  Object.entries(mergeBooks(row.books) || {}).forEach(([k, b]) => {
    if (!b || k === skip || DFS_KEYS.has(k) || EXCHANGE_KEYS.has(k)) return;
    if (b.price == null) return;
    const bl = Number(b.line);
    if (Number.isFinite(line) && Number.isFinite(bl) && Math.abs(bl - line) > 0.2) return;
    const ip = bookImplied(b.price);
    if (ip == null || ip <= 5 || ip >= 95) return;
    let nv = Number(b.no_vig);
    if (Number.isFinite(nv) && nv > 0 && nv <= 1) nv *= 100;
    const use = Number.isFinite(nv) && nv > 5 && nv < 95 && Math.abs(nv - ip) <= 5 ? nv : ip;
    books.push({ k, use });
  });
  let pool = books;
  let dropped = 0;
  let split = false;
  if (books.length >= 3) {
    const sorted = books.map((b) => b.use).sort((a, c) => a - c);
    const mid = sorted[Math.floor(sorted.length / 2)];
    const kept = books.filter((b) => Math.abs(b.use - mid) <= 8);
    if (kept.length >= 2 && kept.length < books.length) {
      dropped = books.length - kept.length;
      pool = kept;
    } else if (kept.length < 2) {
      split = true;
      pool = [];
    }
  } else if (books.length === 2 && Math.abs(books[0].use - books[1].use) > 8) {
    split = true;
    pool = [];
  } else if (books.length < 2) {
    pool = [];
  }
  const vals = [];
  pool.forEach((b) => {
    vals.push(b.use);
    if (b.k === "pinnacle") vals.push(b.use);
  });
  return { vals, nBooks: pool.length, seen: books.length, dropped, split, stale: dropped > 0 };
}

function exchangeOffer(row) {
  const key = state.view;
  if (key === "kalshi") {
    const k = kalshiOffer(row);
    if (!k || k.cents == null) return null;
    const c = Number(k.cents);
    const line = quoteLine(row, "kalshi");
    const rowLine = Number(row.line);
    if (!Number.isFinite(c) || c < 3 || c > 97 || line == null) return null;
    if (Number.isFinite(rowLine) && Math.abs(line - rowLine) > 0.6) return null;
    return c;
  }
  const b = bookOffer(row, key);
  if (!b || b.price == null) return null;
  const line = Number(row.line);
  const bl = Number(b.line);
  if (Number.isFinite(line) && Number.isFinite(bl) && Math.abs(bl - line) > 0.2) return null;
  const px = Number(b.price);
  const ip = bookImplied(px);
  if (!Number.isFinite(px) || Math.abs(px) < 100 || Math.abs(px) >= 2500) return null;
  if (ip == null || ip <= 2 || ip >= 98) return null;
  return ip;
}

function gradedLine(row) {
  if (state.view === "pp" || state.view === "ev") {
    const pp = Number(row?.dfs?.prizepicks?.line);
    if (Number.isFinite(pp)) return pp;
  }
  return Number(row?.line);
}

function consistentProb(b) {
  if (!b || b.price == null) return null;
  const ip = bookImplied(b.price);
  let nv = Number(b.no_vig);
  if (Number.isFinite(nv) && nv > 0 && nv <= 1) nv *= 100;
  if (ip != null && Number.isFinite(nv) && nv > 5 && nv < 95 && Math.abs(nv - ip) <= 5) return nv;
  if (ip != null && ip > 5 && ip < 95) return ip;
  return null;
}
function isWholeLine(n) {
  const x = Number(n);
  return Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-6;
}

function poissonPmf(k, lam) {
  if (k < 0 || lam <= 0) return 0;
  let x = Math.exp(-lam);
  for (let i = 1; i <= k; i += 1) x *= lam / i;
  return x;
}

function poissonCdf(k, lam) {
  let s = 0;
  for (let i = 0; i <= k; i += 1) s += poissonPmf(i, lam);
  return s;
}

function lambdaFromCdf(k, p) {
  p = Math.min(0.97, Math.max(0.03, p));
  let lo = 0.01, hi = 80;
  for (let i = 0; i < 40; i += 1) {
    const mid = (lo + hi) / 2;
    if (poissonCdf(k, mid) > p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function nearestHalfLine(row) {
  const L = Number(row.line);
  const nums = Object.values(mergeBooks(row.books) || {})
    .map((b) => Number(b?.line))
    .filter((n) => Number.isFinite(n) && Math.abs((n * 2) % 2 - 1) < 0.05);
  if (row.book_line != null) nums.push(Number(row.book_line));
  if (row.avg_line != null) nums.push(Number(row.avg_line));
  const near = nums.filter((n) => Math.abs(n - L) <= 0.6);
  const pool = near.length ? near : nums.filter((n) => Math.abs(n - L) <= 1.1);
  if (!pool.length) return null;
  pool.sort((a, b) => Math.abs(a - L) - Math.abs(b - L));
  return pool[0];
}

function nvAtHalf(row, half) {
  const vals = [];
  Object.values(mergeBooks(row.books) || {}).forEach((b) => {
    if (!b || Math.abs(Number(b.line) - half) > 0.2) return;
    let n = Number(b.no_vig);
    const placeholder = !Number.isFinite(n) || n === 0.5 || n === 50;
    if (Number.isFinite(n) && n > 0 && n <= 1) n = n * 100;
    if (placeholder || !Number.isFinite(n) || n <= 5 || n >= 95) {
      const ip = bookImplied(b.price);
      if (ip != null) n = ip;
    }
    if (Number.isFinite(n) && n > 5 && n < 95) vals.push(n);
  });
  if (!vals.length) return null;
  vals.sort((a, b) => a - b);
  return vals[Math.floor(vals.length / 2)];
}

function lineNv(row) {
  const line = Number(row.line);
  const vals = [];
  Object.values(mergeBooks(row.books) || {}).forEach((b) => {
    if (!b || Math.abs(Number(b.line) - line) > 0.2) return;
    const n = consistentProb(b);
    if (n != null) vals.push(n);
  });
  if (!vals.length) return null;
  vals.sort((a, b) => a - b);
  return vals[Math.floor(vals.length / 2)];
}

function halfBuckets() {
  const props = state.data?.props || [];
  if (state._halfSrc === props && state._halfBuckets) return state._halfBuckets;
  const map = new Map();
  for (const r of props) {
    const line = Number(r.line);
    if (!Number.isFinite(line) || isWholeLine(line)) continue;
    const key = `${normName(r.player)}|${normName(r.stat)}`;
    let list = map.get(key);
    if (!list) { list = []; map.set(key, list); }
    list.push(r);
  }
  state._halfSrc = props;
  state._halfBuckets = map;
  return map;
}

function siblingOverPct(row, target) {
  const L = Number(target ?? row.line);
  const list = halfBuckets().get(`${normName(row.player)}|${normName(row.stat)}`);
  if (!list) return null;
  let best = null;
  for (const r of list) {
    const line = Number(r.line);
    const dist = Math.abs(line - L);
    if (!Number.isFinite(line) || dist > 0.6 || dist < 0.2) continue;
    const nv = lineNv(r);
    if (nv == null) continue;
    const books = sportsbookCount(r);
    const pOver = String(r.side || "").toLowerCase() === "under" ? 100 - nv : nv;
    if (!best || books > best.books || (books === best.books && dist < best.dist)) {
      best = { half: line, pOver, dist, books };
    }
  }
  return best;
}

function ownHalfMarket(row, L) {
  const buckets = new Map();
  Object.values(mergeBooks(row.books) || {}).forEach((b) => {
    const line = Number(b?.line);
    if (!Number.isFinite(line) || isWholeLine(line) || Math.abs(line - L) > 0.6) return;
    const p = consistentProb(b);
    if (p == null) return;
    if (!buckets.has(line)) buckets.set(line, []);
    buckets.get(line).push(p);
  });
  let best = null;
  buckets.forEach((vals, line) => {
    if (!best || vals.length > best.n) {
      vals.sort((a, b) => a - b);
      best = { half: line, p: vals[Math.floor(vals.length / 2)], n: vals.length };
    }
  });
  if (!best) return null;
  const under = String(row.side || "").toLowerCase() === "under";
  return { half: best.half, pOver: under ? 100 - best.p : best.p };
}

function ppCashPct(row) {
  const Lnum = gradedLine(row);
  if (isFantasyStat(row.stat) || !isWholeLine(Lnum)) return null;
  const L = Math.round(Lnum);
  const own = ownHalfMarket(row, L);
  const sib = own || siblingOverPct(row, L);
  const half = sib?.half;
  const pOver = sib?.pOver;
  if (half != null && pOver != null && pOver > 3 && pOver < 97) {
    const under = String(row.side || "").toLowerCase() === "under";
    const p = Math.min(0.97, Math.max(0.03, pOver / 100));
    if (Math.abs(half - (L - 0.5)) <= 0.2) {
      if (under) return +((1 - p) * 100).toFixed(1);
      const lam = lambdaFromCdf(L - 1, 1 - p);
      return +((1 - poissonCdf(L, lam)) * 100).toFixed(1);
    }
    if (Math.abs(half - (L + 0.5)) <= 0.2) {
      if (!under) return +(p * 100).toFixed(1);
      const lam = lambdaFromCdf(L, 1 - p);
      return +(poissonCdf(L - 1, lam) * 100).toFixed(1);
    }
  }
  return null;
}

function fantasyAdjustedPct(row) {
  if (!isFantasyStat(row.stat)) return null;
  const cmp = fantasyCmp(row);
  const trueVal = Number(row.true_point ?? row.avg_line ?? row.projection);
  if (!Number.isFinite(trueVal)) return null;
  let line = null;
  if (state.view === "ud") line = Number(cmp?.ud_as_pp ?? cmp?.ud ?? row.dfs?.underdog?.line ?? row.line);
  else line = Number(cmp?.pp ?? row.dfs?.prizepicks?.line ?? row.line);
  if (!Number.isFinite(line)) return null;
  const under = String(row.side || "").toLowerCase() === "under";
  const diff = trueVal - line;
  const raw = 50 + (under ? -diff : diff) * 1.8;
  return +Math.max(8, Math.min(92, raw)).toFixed(1);
}

function saneSheet(n) {
  return Number.isFinite(n) && n > 0.5 && n < 99;
}

function nbaEdgePack(row) {
  if (!state.nbaEdgeIdx || state.nbaEdgeSrc !== state.data) {
    const idx = new Map();
    (state.data?.props || []).forEach((r) => {
      if (sportOf(r) !== "NBA") return;
      const e = Number(r.pp_sheet_edge);
      if (!saneSheet(e)) return;
      const key = `${nameKey(r.player)}|${r.stat}|${r.line}`;
      if (!idx.has(key)) idx.set(key, {});
      idx.get(key)[r.side] = e;
    });
    state.nbaEdgeIdx = idx;
    state.nbaEdgeSrc = state.data;
  }
  return state.nbaEdgeIdx.get(`${nameKey(row.player)}|${row.stat}|${row.line}`) || null;
}

function nbaSheetHit(row) {
  const side = String(row.side || "");
  const over = Number(row.sheet_over);
  const under = Number(row.sheet_under);
  if (side === "Under" && saneSheet(under)) return +under.toFixed(1);
  if ((side === "Over" || side === "Yes") && saneSheet(over)) return +over.toFixed(1);
  const direct = Number(row.pp_sheet_edge);
  if (saneSheet(direct)) return +direct.toFixed(1);
  const pack = nbaEdgePack(row);
  if (pack) {
    if (saneSheet(pack[side])) return +Number(pack[side]).toFixed(1);
    const other = side === "Under" ? "Over" : side === "Over" ? "Under" : "";
    if (other && saneSheet(pack[other])) return +(100 - Number(pack[other])).toFixed(1);
  }
  if (row.hit_model === "cash_no_push") {
    const raw = Number(row.pct_raw);
    if (saneSheet(raw)) return +raw.toFixed(1);
  }
  const stored = Number(row.pct_to_hit);
  if (row.hit_model !== "cash_no_push" && saneSheet(stored)) return +stored.toFixed(1);
  return null;
}

function hitPct(row) {
  if ((state.view === "pp" || state.view === "ev") && sportOf(row) === "NBA") {
    const sheet = nbaSheetHit(row);
    if (sheet != null) return sheet;
  }
  const sheet = Number(row.pct_to_hit);
  const sheetOk = Number.isFinite(sheet) && sheet > 5 && sheet < 95;
  if (state.view === "pp" || state.view === "ev") {
    if (sheetOk) return +sheet.toFixed(1);
    const cash = ppCashPct(row);
    if (cash != null) return cash;
    const nv = bookNoVig(row);
    if (nv != null) return nv;
  }
  if (state.view === "ud") {
    if (isFantasyStat(row.stat)) {
      const adj = fantasyAdjustedPct(row);
      if (adj != null) return adj;
      if (row.pct_ud != null) return row.pct_ud;
      return bookNoVig(row);
    }
    const nv = bookNoVig(row);
    if (nv != null) return nv;
    if (row.pct_ud != null && Number(row.pct_ud) !== 50) return row.pct_ud;
    if (row.pct_to_hit != null && Number(row.pct_to_hit) !== 50) return row.pct_to_hit;
  }
  if (state.view === "pp" && isFantasyStat(row.stat)) {
    const adj = fantasyAdjustedPct(row);
    if (adj != null && row.pct_to_hit == null) return adj;
  }
  if (isPricedView()) {
    const fair = exchangeFair(row, state.view);
    if (fair != null) return fair;
    return null;
  }
  return row.pct_to_hit;
}

function rowEdge(row) {
  if (state.view === "ud") {
    const fair = isFantasyStat(row.stat) ? (hitPct(row) ?? bookNoVig(row)) : (bookNoVig(row) ?? hitPct(row));
    if (fair == null) return null;
    return +(fair - breakEven()).toFixed(1);
  }
  if (isPricedView()) {
    const pack = fairQuotes(row, state.view);
    const fair = exchangeFair(row, state.view);
    const offer = exchangeOffer(row);
    if (fair == null || offer == null || pack.nBooks < 2 || pack.split) return null;
    return +(fair - offer).toFixed(1);
  }
  const pct = hitPct(row);
  if (pct == null) return null;
  return +(pct - breakEven()).toFixed(1);
}

function edgeNote(row) {
  if (!isPricedView()) return "";
  const pack = fairQuotes(row, state.view);
  if (pack.split) return ` <span class="line-note">split</span>`;
  if (pack.nBooks < 2) {
    const thin = pack.seen === 1 ? "1 book" : "thin";
    return ` <span class="line-note">${thin}</span>`;
  }
  const n = pack.nBooks;
  const stale = pack.stale ? " · stale" : "";
  return ` <span class="line-note">${n} book${n === 1 ? "" : "s"}${stale}</span>`;
}

function pctClass(pct) {
  if (pct == null) return "pct";
  if (pct >= breakEven()) return "pct good";
  if (pct >= breakEven() - 2) return "pct ok";
  return "pct bad";
}

function edgeClass(edge) {
  if (edge == null) return "pct";
  if (edge >= 0) return "pct good";
  if (edge >= -2) return "pct ok";
  return "pct bad";
}

function sideTag(side) {
  const s = String(side || "");
  const cls = s === "Over" || s === "Yes" ? "over" : (s === "Under" || s === "No" ? "under" : "");
  return `<span class="tag ${cls}">${escapeHtml(s || "—")}</span>`;
}

const TZ = "America/Chicago";

function parseWhen(iso) {
  if (!iso) return null;
  let s = String(iso).trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(s)) s = s.replace(" ", "T");
  if (/^\d{4}-\d{2}-\d{2}T/.test(s) && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(s)) s += "Z";
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtWhen(iso) {
  const d = parseWhen(iso);
  if (!d) return "";
  return d.toLocaleString("en-US", {
    timeZone: TZ,
    weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  }) + " CT";
}

function hasStarted(iso) {
  const d = parseWhen(iso);
  return !!(d && d.getTime() <= Date.now());
}

function posTag(row) {
  const p = String(row.position || "").trim();
  if (!p) return "";
  return ` (${escapeHtml(p)})`;
}

function venueIcon(row) {
  const raw = `${row.venue_type || ""} ${row.venue_name || ""}`.toLowerCase();
  if (!raw.trim()) return "";
  let mark = "🏟️", label = row.venue_type || row.venue_name || "Venue";
  if (/retract/.test(raw)) { mark = "🔃"; label = row.venue_type || "Retractable"; }
  else if (/indoor|dome|domed|closed/.test(raw)) { mark = "🏟️"; label = row.venue_type || "Dome"; }
  else if (/outdoor|open/.test(raw)) { mark = "🌤️"; label = row.venue_type || "Outdoor"; }
  const extra = row.venue_name ? ` · ${row.venue_name}` : "";
  return `<span class="venue-ico" title="${escapeHtml(label + extra)}">${mark}</span>`;
}

function weatherIcon(row) {
  const cond = String(row.weather || "").trim();
  const temp = String(row.temp || "").trim();
  if (!cond && !temp) return "";
  const low = cond.toLowerCase();
  let mark = "🌡️";
  if (/thunder|storm/.test(low)) mark = "⛈️";
  else if (/snow|sleet|ice/.test(low)) mark = "❄️";
  else if (/drizzle/.test(low)) mark = "🌦️";
  else if (/rain|shower/.test(low)) mark = "🌧️";
  else if (/fog|mist|haze/.test(low)) mark = "🌫️";
  else if (/partly/.test(low)) mark = "⛅";
  else if (/overcast|cloud/.test(low)) mark = "☁️";
  else if (/clear|sunny|mainly clear/.test(low)) mark = "☀️";
  else if (/dome|indoor/.test(low)) mark = "🏟️";
  else if (/wind/.test(low)) mark = "💨";
  const tip = [cond || "Weather", temp ? `${temp}°` : ""].filter(Boolean).join(" · ");
  return `<span class="venue-ico" title="${escapeHtml(tip)}">${mark}</span>`;
}

function ymdInCT(iso) {
  const d = iso ? parseWhen(iso) || new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(d);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function shiftYmd(offset) {
  const [y, m, day] = ymdInCT().split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1, day + offset, 12));
  return ymdInCT(d.toISOString());
}

function dateLabel(ymd) {
  if (!ymd) return "";
  const d = new Date(`${ymd}T12:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function matchesWhen(iso) {
  const sel = $("when")?.value || "";
  if (!sel) return true;
  const day = ymdInCT(iso);
  if (!day) return false;
  if (sel === "today") return day === ymdInCT();
  if (sel === "tomorrow") return day === shiftYmd(1);
  return day === sel;
}

function isFantasyStat(stat) {
  return /fantasy/i.test(String(stat || ""));
}

const BOOK_ALIAS = {
  hardrockbet_fl: "hardrockbet",
  hardrock_fl: "hardrockbet",
  williamhill: "williamhill_us",
  caesars: "williamhill_us",
  ladbrokes_uk: "ladbrokes",
  ladbrokes_au: "ladbrokes",
  pointsbetus: "pointsbet",
  pointsbetau: "pointsbet",
  sportsbetio: "sportsbet",
  lowvig_ag: "lowvig",
  mybookie: "mybookieag",
  dabble_au: "dabble",
  dabble_us: "dabble",
  dabble_us_dfs: "dabble",
  dabble_dfs: "dabble",
  betr_au: "betr",
  betr_us: "betr",
  betr_us_dfs: "betr",
  betr_dfs: "betr",
};
function canonBook(k) { return BOOK_ALIAS[String(k || "")] || k; }

function mergeBooks(map) {
  const out = {};
  Object.entries(map || {}).forEach(([k, v]) => {
    const c = canonBook(k);
    if (!out[c] || (v?.price != null && out[c].price == null)) out[c] = v;
  });
  return out;
}

function sportsbookCount(row) {
  return Object.values(mergeBooks(row.books)).filter((b) => b && b.price != null).length;
}

const TEAM_CODE_NICK = {};
Object.entries(TEAM_ABBR).forEach(([full, ab]) => {
  TEAM_CODE_NICK[ab] = full.split(" ").pop();
});

function sportOf(row) {
  return String(row?.sport || row?.league || "").toUpperCase();
}

function isNflContext(row) {
  const s = sportOf(row);
  return !s || s === "NFL";
}

function abbr(team, row) {
  const raw = String(team || "").trim();
  if (!raw) return "";
  if (row && !isNflContext(row)) return raw.replace(/\s+/g, " ");
  const low = raw.toLowerCase();
  if (TEAM_NICK[low]) return TEAM_NICK[low];
  if (TEAM_ABBR[raw]) return TEAM_ABBR[raw];
  const parts = raw.split(/[\s/@-]+/).filter(Boolean);
  if (parts.length >= 2 && TEAM_NICK[parts[0].toLowerCase()]) return TEAM_NICK[parts[0].toLowerCase()];
  return raw;
}

function teamLabel(team, row) {
  if (row && !isNflContext(row)) return String(team || "").replace(/\s+/g, " ").trim();
  const code = abbr(team, row);
  if (!code) return "";
  const nick = TEAM_CODE_NICK[code];
  return nick && nick.toLowerCase() !== code.toLowerCase() ? `${code} ${nick}` : code;
}

function matchup(row) {
  const away = teamLabel(row.away_team, row) || teamLabel(String(row.game || "").split("@")[0], row);
  const home = teamLabel(row.home_team, row) || teamLabel(String(row.game || "").split("@")[1], row);
  if (!away && !home) return row.game || "";
  return `${away} @ ${home}`;
}

function unique(arr) { return [...new Set(arr.filter(Boolean))]; }

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normName(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
}

function intelPlayer(name) {
  const intel = state.intel;
  if (!intel?.players || !name) return null;
  return intel.players[normName(name)] || null;
}

function intelStamp() {
  const updated = state.intel?.updated || state.intel?.pulled_at;
  const season = currentSeason();
  const weeks = state.intel?.log_seasons?.length ? ` · logs through ${season}` : "";
  if (!updated) return `Injuries / usage · ${season}${weeks}`;
  return `Injuries / usage as of ${fmtWhen(updated)}${weeks}`;
}

function currentSeason() {
  if (state.intel?.injury_season) return Number(state.intel.injury_season);
  if (state.intel?.has_2026_logs) return 2026;
  const seasons = state.intel?.log_seasons || [];
  return seasons.length ? Math.max(...seasons.map(Number)) : 2026;
}

function intelLogs(gsis) {
  if (!gsis) return [];
  const season = currentSeason();
  return (state.intel?.logs?.[gsis] || []).filter((g) => !g.season || Number(g.season) === season);
}

function injClass(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("out") || s === "ir") return "out";
  if (s.includes("doubt")) return "doubtful";
  if (s.includes("question")) return "questionable";
  return "";
}

function injPill(inj) {
  if (!inj?.status) return "";
  const label = inj.status;
  return `<span class="inj-pill ${injClass(label)}" title="${escapeHtml(inj.injury || "")}">${escapeHtml(label)}</span>`;
}

function playerNewsItems(row) {
  const meta = intelPlayer(row.player);
  const gsis = row.gsis_id || meta?.gsis_id;
  const name = String(row.player || "").toLowerCase();
  return (state.intel?.news || []).filter((n) => {
    if (gsis && (n.players || []).includes(gsis)) return true;
    const blob = `${n.headline || ""} ${n.description || ""}`.toLowerCase();
    return name && blob.includes(name);
  }).slice(0, 3);
}

function flagIcons(row) {
  const bits = [];
  if (row.injury?.status) {
    const cls = injClass(row.injury.status);
    const body = `<b>${escapeHtml(row.injury.status)}</b>${row.injury.injury ? ` · ${escapeHtml(row.injury.injury)}` : ""}${row.injury.season ? `<div>${row.injury.season}w${row.injury.week || ""}</div>` : ""}`;
    bits.push(`<span class="flag inj ${cls}" data-tip="1" aria-label="Injury"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M8 1.5A6.5 6.5 0 1 0 8 14.5 6.5 6.5 0 0 0 8 1.5zm.75 3v2.75H11.5v1.5H8.75V12h-1.5V8.75H4.5v-1.5h2.75V4.5h1.5z"/></svg><span class="tip-src" hidden>${body}</span></span>`);
  }
  const news = playerNewsItems(row);
  if (news.length) {
    const body = news.map((n) => `<b>${escapeHtml(n.source || "News")}</b><div>${escapeHtml(n.headline || "")}</div>${n.published ? `<div class="muted">${escapeHtml(n.published)}</div>` : ""}`).join("");
    bits.push(`<span class="flag news" data-tip="1" aria-label="News"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M2 3.5h9.5A1.5 1.5 0 0 1 13 5v7.5h1V5a2.5 2.5 0 0 0-2.5-2.5H2v1zm0 2h8v1H2v-1zm0 2.5h8v1H2V8zm0 2.5h5v1H2v-1zM1 3v11h10.5A1.5 1.5 0 0 0 13 12.5v-7H2.5V3H1z"/></svg><span class="tip-src" hidden>${body}</span></span>`);
  }
  return bits.length ? `<span class="flags">${bits.join("")}</span>` : "";
}

function avgLogs(recs, key) {
  const list = (recs || []).slice(-5);
  if (!list.length) return null;
  const sum = list.reduce((a, r) => a + (Number(r[key]) || 0), 0);
  return +(sum / list.length).toFixed(1);
}

function usagePack(recs) {
  const last = (recs || []).slice(-5);
  if (!last.length) return null;
  const avg = (k) => {
    const nums = last.map((g) => Number(g[k])).filter((n) => Number.isFinite(n));
    if (!nums.length) return null;
    return +(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
  };
  const lastG = last[last.length - 1] || {};
  return {
    n: last.length,
    snap: avg("off_snaps"),
    snapPct: avg("off_pct"),
    routes: avg("routes"),
    routePct: avg("route_pct"),
    tgt: avg("tgt"),
    lastSnap: lastG.off_snaps,
    lastSnapPct: lastG.off_pct,
    lastRoutes: lastG.routes,
    lastTgt: lastG.tgt,
    lastOpp: lastG.opp,
    lastWeek: lastG.week,
  };
}

function usageStrip(recs, pos) {
  const u = usagePack(recs);
  if (!u || (u.snap == null && u.routes == null && u.tgt == null)) return "";
  const qb = /^QB$/i.test(pos || "");
  const cell = (lab, v, extra) => `<div class="popup-stat"><b>${lab}</b>${v == null ? "—" : v}${extra || ""}</div>`;
  return `<div class="popup-grid usage-grid">
    ${cell("L5 snaps", u.snap, u.snapPct != null ? ` <span class="muted">(${Math.round(u.snapPct)}%)</span>` : "")}
    ${qb ? "" : cell("L5 routes", u.routes, u.routePct != null ? ` <span class="muted">(${Math.round(u.routePct)}%)</span>` : "")}
    ${qb ? "" : cell("L5 targets", u.tgt)}
    ${cell(`Last (w${u.lastWeek || "—"}${u.lastOpp ? ` vs ${u.lastOpp}` : ""})`, [u.lastSnap != null ? `${u.lastSnap} sn` : "", !qb && u.lastRoutes != null ? `${u.lastRoutes} rte` : "", !qb && u.lastTgt != null ? `${u.lastTgt} tgt` : ""].filter(Boolean).join(" · ") || "—")}
  </div>`;
}

function playerByGsis(gsis) {
  const players = state.intel?.players || {};
  return Object.values(players).find((p) => p.gsis_id === gsis) || null;
}

const LOG_STAT = {
  "Receptions": (g) => g.rec,
  "Rec Yds": (g) => g.rec_yds,
  "Targets": (g) => g.tgt,
  "Rush Yds": (g) => g.rush_yds,
  "Rush Att": (g) => g.car,
  "Pass Yds": (g) => g.pass_yds,
  "Pass TDs": (g) => g.pass_td,
  "Pass Att": (g) => g.att,
  "Completions": (g) => g.cmp,
  "INTs": (g) => g.int,
  "Rush+Rec Yds": (g) => (g.rush_yds || 0) + (g.rec_yds || 0),
  "Pass+Rush Yds": (g) => (g.pass_yds || 0) + (g.rush_yds || 0),
  "Fantasy Score": (g) => g.fant,
  "Anytime TD": (g) => (g.rush_td || 0) + (g.rec_td || 0),
  "Rec TDs": (g) => g.rec_td,
  "Rush TDs": (g) => g.rush_td,
};

function logValue(g, stat) {
  const fn = LOG_STAT[stat];
  if (fn) return Number(fn(g) || 0);
  return null;
}

function splitStats(games, stat, line, side) {
  const vals = (games || []).map((g) => ({ g, v: logValue(g, stat) })).filter((x) => x.v != null);
  if (!vals.length) return null;
  const ln = line == null ? null : Number(line);
  const over = String(side || "Over").toLowerCase() !== "under";
  function pack(label, list) {
    if (!list.length) return { label, n: 0, avg: null, hit: null, hits: 0, pushes: 0 };
    const nums = list.map((x) => x.v);
    const avg = +(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
    let hits = 0, pushes = 0, graded = 0;
    if (ln != null) {
      list.forEach((x) => {
        if (x.v === ln) { pushes += 1; return; }
        graded += 1;
        if (over ? x.v > ln : x.v < ln) hits += 1;
      });
    }
    const hit = graded ? +((hits / graded) * 100).toFixed(0) : null;
    return { label, n: list.length, avg, hit, hits, pushes };
  }
  const last = (n) => pack(`L${n}`, vals.slice(-n));
  const home = pack("Home", vals.filter((x) => x.g.home === true));
  const away = pack("Away", vals.filter((x) => x.g.home === false));
  return {
    L4: last(4), L8: last(8), L12: last(12), L16: last(16), L20: last(20),
    home, away, all: pack("Avg", vals),
  };
}

function vsOppSplit(games, stat, line, side, opp) {
  if (!opp) return null;
  const needle = String(opp).toUpperCase();
  const list = (games || []).filter((g) => String(g.opp || "").toUpperCase() === needle);
  const pack = splitStats(list, stat, line, side);
  return pack ? { ...pack.all, label: `vs ${needle}` } : null;
}

function upcomingOpp(focus) {
  const team = focus.nfl_team || intelPlayer(focus.player)?.team || "";
  const home = abbr(focus.home_team, focus);
  const away = abbr(focus.away_team, focus);
  if (team && home && team === home) return away;
  if (team && away && team === away) return home;
  return "";
}

function teamTargetShare(g) {
  if (!g?.team || g.week == null) return null;
  const tgt = Number(g.tgt || 0);
  let teamTgt = 0;
  Object.values(state.intel?.logs || {}).forEach((list) => {
    (list || []).forEach((x) => {
      if (x.team === g.team && x.week === g.week && x.season === g.season) teamTgt += Number(x.tgt || 0);
    });
  });
  if (!teamTgt) return null;
  return Math.round((tgt / teamTgt) * 100);
}

function logBarLabel(g) {
  if (g?.date) {
    const d = new Date(g.date);
    if (!Number.isNaN(+d)) {
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
    return String(g.date).slice(5, 10) || String(g.date);
  }
  return g?.week != null ? `W${g.week}` : "";
}

function renderSplitChart(focus, recs) {
  if (!recs.length || !focus?.stat) return "";
  const splits = splitStats(recs, focus.stat, focus.line, focus.side);
  if (!splits) return "";
  const oppSplit = vsOppSplit(recs, focus.stat, focus.line, focus.side, upcomingOpp(focus));
  const ln = focus.line == null ? null : Number(focus.line);
  const all = recs.slice(-20);
  const showAll = !!state.popupChartAll && all.length > 5;
  const barsSrc = showAll ? all : all.slice(-5);
  const bars = barsSrc.reverse().map((g) => {
    const v = logValue(g, focus.stat);
    let cls = "void";
    if (v == null || ln == null) cls = "void";
    else if (v === ln) cls = "push";
    else if (v > ln) cls = "hit";
    else cls = "miss";
    return { g, v, cls, lab: logBarLabel(g) };
  });
  const maxV = Math.max(...bars.map((b) => Number(b.v) || 0), ln || 0, 1);
  const linePct = ln == null ? 0 : Math.max(8, Math.min(92, Math.round((ln / maxV) * 100)));
  const seenN = new Set();
  const windows = [splits.L4, splits.L8, splits.L12, splits.L16, splits.L20]
    .filter((s) => s && s.n)
    .filter((s) => {
      if (seenN.has(s.n)) return false;
      seenN.add(s.n);
      return true;
    });
  const card = (title, s, extra) => {
    if (!s || !s.n) return `<div class="hit-card empty"><span>${escapeHtml(title)}</span><b>—</b><em>${escapeHtml(extra || "No games")}</em></div>`;
    return `<div class="hit-card">
      <span>${escapeHtml(title)}</span>
      <b class="${s.hit == null ? "" : pctClass(s.hit)}">${s.hit == null ? "—" : `${s.hit}%`}</b>
      <em>${s.n} game${s.n === 1 ? "" : "s"}${s.avg != null ? ` · avg ${s.avg}` : ""}</em>
    </div>`;
  };
  const slots = Math.max(bars.length, 1);
  const more = all.length > 5
    ? `<button type="button" class="chart-more" data-chart-more="${showAll ? "less" : "more"}" title="${showAll ? "Show last 5" : `Show last ${all.length}`}">${showAll ? "‹" : "›"}</button>`
    : "";
  return `<h4 class="popup-h">Recent vs ${escapeHtml(focus.side || "")} ${focus.line ?? ""} ${escapeHtml(focus.stat || "")}</h4>
    <div class="split-note">Green cleared the line · red missed · gray push. Showing ${showAll ? `all ${bars.length}` : `last ${bars.length}`} game${bars.length === 1 ? "" : "s"}.</div>
    <div class="chart-row">
    <div class="log-bars" style="--slots:${slots}">
      ${bars.map((b) => {
        const h = b.v == null ? 8 : Math.max(14, Math.round((Number(b.v) / maxV) * 100));
        return `<div class="log-col" title="${escapeHtml(b.lab)} vs ${escapeHtml(b.g.opp || "")}: ${b.v ?? "—"}">
          <div class="log-track">
            ${ln != null ? `<i class="log-line" style="bottom:${linePct}%"></i>` : ""}
            <b class="log-bar ${b.cls}" style="height:${h}%"><span>${b.v == null ? "—" : b.v}</span></b>
          </div>
          <div class="log-lab">${escapeHtml(b.lab)}</div>
          <div class="log-opp">${escapeHtml(b.g.opp || "")}</div>
        </div>`;
      }).join("")}
    </div>
    ${more}
    </div>
    <div class="hit-grid">
      ${windows.map((s) => card(s.n >= recs.length ? `${currentSeason()} (${s.n})` : `Last ${s.n}`, s)).join("")}
      ${card("Home", splits.home)}
      ${card("Away", splits.away)}
      ${oppSplit ? card(oppSplit.label, oppSplit) : card("vs opponent", null, "No prior meeting in these logs")}
    </div>`;
}

function bookMark(book, size) {
  const cls = size === "sm" ? "book-logo sm" : "book-logo";
  const tile = book.tile ? ` style="background:${book.tile}"` : "";
  if (book.logo) {
    return `<img class="${cls}"${tile} src="${book.logo}" alt="${escapeHtml(book.label)}" title="${escapeHtml(book.name)}" referrerpolicy="no-referrer" loading="lazy" onerror="this.classList.add('hide');this.nextElementSibling?.classList.remove('hide');" /><span class="book-mark ${size === "sm" ? "sm" : ""} hide" style="--c:${book.color}">${escapeHtml(book.label)}</span>`;
  }
  return `<span class="book-mark ${size === "sm" ? "sm" : ""}" style="--c:${book.color}" title="${escapeHtml(book.name)}">${escapeHtml(book.label)}</span>`;
}

function kalshiKind(stat) {
  const s = String(stat || "").toLowerCase();
  if (/fantasy/.test(s)) return null;
  if (/pass/.test(s) && /yard/.test(s)) return "pass_yds";
  if (/pass/.test(s) && /td|touch/.test(s)) return "pass_td";
  if (/pass/.test(s) && /att/.test(s)) return "pass_att";
  if (/pass/.test(s) && /comp/.test(s)) return "pass_comp";
  if (/rush/.test(s) && /yard/.test(s)) return "rush_yds";
  if (/rush/.test(s) && /att|carry/.test(s)) return "rush_att";
  if (/rec/.test(s) && /yard/.test(s)) return "rec_yds";
  if (/reception|^recs?$/.test(s)) return "rec";
  if (/scrimmage|rush rec/.test(s)) return "rush_rec_yds";
  if (/anytime/.test(s)) return "any_td";
  if (/sack/.test(s)) return "sacks";
  if (/tackle/.test(s)) return "tackles";
  if (/touchdown|^tds?$/.test(s)) return "td";
  return null;
}

function centsToAmerican(cents) {
  const p = Number(cents) / 100;
  if (!(p > 0.01 && p < 0.99)) return null;
  if (p >= 0.5) return Math.round(-100 * p / (1 - p));
  return Math.round(100 * (1 - p) / p);
}

function kalshiThreshold(title) {
  const t = String(title || "");
  const plus = t.match(/(\d+(?:\.\d+)?)\s*\+/);
  if (plus) return Number(plus[1]);
  const n = t.match(/(\d+(?:\.\d+)?)/);
  return n ? Number(n[1]) : null;
}

function kalshiOffer(row) {
  if (!state.booksOn.has("kalshi")) return null;
  const player = nameKey(row.player);
  const last = player.split(" ").pop();
  const list = state.kalshiByFull?.get(player)
    || ((last && (state.kalshiByLast?.get(last) || []).length === 1) ? state.kalshiByLast.get(last) : [])
    || [];
  if (!list.length || !row?.player) return null;
  const kind = kalshiKind(row.stat);
  const line = Number(row.line);
  const under = String(row.side || "").toLowerCase() === "under";
  const hits = list.filter((m) => {
    const t = nameKey(`${m.title || ""} ${m.subtitle || ""}`);
    if (!(t.includes(player) || (last && last.length > 3 && t.includes(last)))) return false;
    if (kind && m.kind && m.kind !== kind) return false;
    return true;
  });
  if (!hits.length) return null;
  const target = Number.isFinite(line) ? (under ? line : Math.ceil(line + 1e-9)) : null;
  hits.sort((a, b) => {
    const ta = kalshiThreshold(a.title);
    const tb = kalshiThreshold(b.title);
    const da = target == null || ta == null ? 99 : Math.abs(ta - target);
    const db = target == null || tb == null ? 99 : Math.abs(tb - target);
    return da - db || (b.dollar || 0) - (a.dollar || 0);
  });
  const m = hits[0];
  let cents = m.implied;
  if (under && cents != null) cents = +(100 - cents).toFixed(1);
  const pool = hits.reduce((s, x) => s + (x.dollar || 0), 0);
  return {
    line: kalshiThreshold(m.title),
    price: centsToAmerican(cents),
    cents,
    dollar: m.dollar,
    vol_pct: volShare(m.dollar, pool || m.event_dollar),
    title: m.title,
  };
}

function siblingBooks(row) {
  if (row?.books && Object.keys(row.books).length) return row.books;
  const pool = state.liveProps || state.data?.props || [];
  const key = normName(row?.player);
  const stat = normName(row?.stat);
  const side = row?.side;
  const line = Number(displayLine(row) ?? row?.line);
  if (!key || !Number.isFinite(line)) return row?.books || {};
  const hit = pool.find((m) =>
    m && m !== row && m.books && Object.keys(m.books).length &&
    normName(m.player) === key && normName(m.stat) === stat && m.side === side &&
    Math.abs(Number(m.line) - line) <= 0.51
  );
  return hit?.books || row?.books || {};
}

function bookOffer(row, key) {
  if (key === "kalshi") return kalshiOffer(row);
  const meta = BOOK_BY_KEY[key];
  if (meta?.dfs) {
    const src = row.dfs?.[key] || null;
    if (!src) return null;
    if (key === "prizepicks") return { ...src, price: -117 };
    return src;
  }
  const books = mergeBooks(siblingBooks(row));
  return books[key] || row.books?.[key] || null;
}

function isYesNoLongshot(r) {
  const line = Number(r.dfs?.underdog?.line ?? r.books?.prophetx?.line ?? r.books?.novig?.line ?? r.line);
  if (line !== 0.5 && line !== 0) return false;
  return /home run|stolen|touchdown|^hr$|hits|goals?(?!ie)/i.test(String(r.stat || ""));
}

function isStandardUd(r) {
  const u = r.dfs?.underdog;
  if (!u || u.line == null) return false;
  if (u.source !== "filter") return false;
  if (r.is_alternate) return false;
  if (isYesNoLongshot(r)) return false;
  const nv = bookNoVig(r);
  if (nv != null && (nv < 42 || nv > 58)) return false;
  return true;
}

function isStandardExchange(r, key) {
  const b = r.books?.[key];
  if (!b || b.price == null) return false;
  const px = Number(b.price);
  if (!Number.isFinite(px) || Math.abs(px) < 100 || Math.abs(px) >= 2500) return false;
  const ip = bookImplied(px);
  if (ip == null || ip <= 2 || ip >= 98) return false;
  if (isYesNoLongshot(r) && Math.abs(px) >= 180) return false;
  return true;
}

function pickemQuote(row, key) {
  const b = bookOffer(row, key);
  if (!b || b.price == null) return null;
  const px = Number(b.price);
  if (!Number.isFinite(px) || Math.abs(px) < 100 || Math.abs(px) >= 2500) return null;
  const ip = bookImplied(px);
  if (ip == null || ip <= 2 || ip >= 98) return null;
  return b;
}

function isHalfLine(n) {
  const x = Number(n);
  return Number.isFinite(x) && Math.abs((x * 2) % 2 - 1) < 0.05;
}

function leanSide(row) {
  if (state.view !== "pp" && state.view !== "ev") return row;
  if (!isHalfLine(row.line)) return row;
  const p = row.pct_to_hit;
  if (p == null || p >= 50) return row;
  return {
    ...row,
    side: row.side === "Under" ? "Over" : "Under",
    pct_to_hit: +(100 - p).toFixed(1),
    flipped_from: row.side,
  };
}

function applyFilters(rows) {
  const game = $("game").value;
  const team = $("team")?.value || "";
  const stat = $("stat").value;
  const side = $("side").value;
  const tier = $("tier").value;
  const minPct = Number($("minPct").value || 0);
  const q = $("q").value.trim().toLowerCase();
  const be = breakEven();

  return rows.map(leanSide).filter((r) => {
    if (state.view === "pp" && !r.dfs?.prizepicks) return false;
    if (state.view === "ud" && !isStandardUd(r)) return false;
    if (state.view === "pick6" && !r.dfs?.pick6) return false;
    if (state.view === "prophetx" && !isStandardExchange(r, "prophetx")) return false;
    if (state.view === "novig" && !isStandardExchange(r, "novig")) return false;
    if (state.view === "kalshi" && !kalshiOffer(r)) return false;
    if (state.view === "polymarket" && !isStandardExchange(r, "polymarket")) return false;
    if (state.view === "dabble" && !pickemQuote(r, "dabble")) return false;
    if (state.view === "betr" && !pickemQuote(r, "betr")) return false;
    if (state.view === "ev") {
      const p = hitPct(r);
      if (p == null || p < be) return false;
    }
    if (state.view === "pp" || state.view === "ud" || state.view === "pick6" || state.view === "ev") {
      if (tier === "standard" && r.pp_tier && r.pp_tier !== "Standard") return false;
      if (tier === "standard" && r.is_alternate && !isFantasyStat(r.stat)) return false;
      if (tier === "demon" && r.pp_tier !== "Demon") return false;
      if (tier === "goblin" && r.pp_tier !== "Goblin") return false;
      if (tier === "alternate" && r.pp_tier !== "Alternate" && !r.is_alternate) return false;
    }
    if (hasStarted(r.commence_time)) return false;
    if (!matchesWhen(r.commence_time)) return false;
    if (!q && state.minBooks && !isFantasyStat(r.stat) && !["pp", "dabble", "betr"].includes(state.view) && sportsbookCount(r) < 2) return false;
    if (team && !rowHasTeam(r, team)) return false;
    if (game && gameKeyOf(r) !== game && r.game !== game) return false;
    if (stat && r.stat !== stat) return false;
    if (side === "ou" && r.side !== "Over" && r.side !== "Under") return false;
    if (side && side !== "ou" && side !== "all" && r.side !== side) return false;
    if (!q && isPricedView()) {
      const edge = rowEdge(r);
      const pack = fairQuotes(r, state.view);
      const min = Number($("minPct")?.value || 0);
      const pickem = state.view === "dabble" || state.view === "betr";
      if (edge == null && !pickem && !pack.split) return false;
      if (edge != null && edge < min) return false;
    }
    if (!q && !isPricedView() && hitPct(r) != null && hitPct(r) < Number($("minPct")?.value || 0)) return false;
    if (q && !`${r.player} ${r.stat} ${r.game} ${r.side}`.toLowerCase().includes(q)) return false;
    // When searching, show all standard lines for that player.
    if (q && r.is_alternate && !isFantasyStat(r.stat)) return false;
    return true;
  });
}

function sortRows(rows) {
  const dir = state.sortDir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    let va = a[state.sortKey];
    let vb = b[state.sortKey];
    if (state.sortKey === "ev") { va = rowEdge(a); vb = rowEdge(b); }
    if (state.sortKey === "pct_to_hit") { va = hitPct(a); vb = hitPct(b); }
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
}

function collapseOffers(rows) {
  if (!["pp", "ev"].includes(state.view)) return rows;
  const best = new Map();
  rows.forEach((r) => {
    const key = `${normName(r.player)}|${normName(r.stat)}|${r.side}|${displayLine(r)}|${gameKeyOf(r)}`;
    const prev = best.get(key);
    if (!prev || sportsbookCount(r) > sportsbookCount(prev)) best.set(key, r);
  });
  return [...best.values()];
}

function displayLine(row) {
  if ((state.view === "pp" || state.view === "ev") && row.dfs?.prizepicks?.line != null) return row.dfs.prizepicks.line;
  if (state.view === "ud" && row.dfs?.underdog?.line != null) return row.dfs.underdog.line;
  if (state.view === "pick6" && row.dfs?.pick6?.line != null) return row.dfs.pick6.line;
  if (state.view === "prophetx" && row.books?.prophetx?.line != null) return row.books.prophetx.line;
  if (state.view === "novig" && row.books?.novig?.line != null) return row.books.novig.line;
  if (state.view === "polymarket" && row.books?.polymarket?.line != null) return row.books.polymarket.line;
  if (state.view === "dabble" || state.view === "betr") {
    const b = bookOffer(row, state.view);
    if (b?.line != null) return b.line;
  }
  if (state.view === "kalshi") {
    const k = kalshiOffer(row);
    if (k?.line != null) return k.line;
  }
  return row.line;
}

function recTrue(row) {
  const f = row.fantasy_cmp || {};
  if (f.recs != null && f.recs !== "") return Number(f.recs);
  const meta = intelPlayer(row.player);
  const avg = avgLogs(intelLogs(row.gsis_id || meta?.gsis_id), "rec");
  if (avg != null) return avg;
  const key = nameKey(row.player);
  const g = gameKeyOf(row);
  const hit = (state.liveProps || state.data?.props || []).find((p) =>
    nameKey(p.player) === key && gameKeyOf(p) === g && /reception/i.test(p.stat || "")
  );
  if (!hit) return null;
  const n = Number(hit.avg_line ?? hit.book_line ?? hit.line);
  return Number.isFinite(n) ? n : null;
}

function fantasyCmp(row) {
  if (!isFantasyStat(row.stat)) return null;
  const f = { ...(row.fantasy_cmp || {}) };
  const pp = f.pp ?? row.dfs?.prizepicks?.line ?? null;
  const ud = f.ud ?? row.dfs?.underdog?.line ?? null;
  const sport = String(row.sport || "").toUpperCase();
  const qb = /QB/i.test(row.pos || row.position || "");
  const recs = recTrue(row);
  let udAsPp = f.ud_as_pp;
  let ppAsUd = f.pp_as_ud;
  let mode = f.mode || "same";
  if ((sport === "NFL" || sport === "CFB") && !qb) {
    mode = recs != null ? "ppr_vs_half" : "ppr_vs_half_no_recs";
    if (recs != null) {
      if (ud != null) udAsPp = +(Number(ud) + 0.5 * recs).toFixed(2);
      if (pp != null) ppAsUd = +(Number(pp) - 0.5 * recs).toFixed(2);
    }
  }
  return { ...f, pp, ud, recs, ud_as_pp: udAsPp, pp_as_ud: ppAsUd, mode };
}

function fantasyNote(row) {
  const f = fantasyCmp(row);
  if (!f) return "";
  const bits = [];
  if (f.recs != null) bits.push(`${f.recs} rec`);
  if (f.walks != null) bits.push(`${f.walks} bb`);
  if (f.doubles != null) bits.push(`${f.doubles} 2b`);
  if (f.steals != null) bits.push(`${f.steals} sb`);
  const extra = bits.length ? ` · ${bits.join(" / ")}` : "";
  if (state.view === "pp" && f.ud != null) {
    const shown = f.ud_as_pp != null ? f.ud_as_pp : f.ud;
    const txt = Number(f.ud) === Number(shown) ? `UD ${f.ud}` : `UD ${f.ud} → ${shown} PP`;
    return `<div class="line-note">${txt}${extra}</div>`;
  }
  if (state.view === "ud" && f.pp != null) {
    const shown = f.pp_as_ud != null ? f.pp_as_ud : f.pp;
    const txt = Number(f.pp) === Number(shown) ? `PP ${f.pp}` : `PP ${f.pp} → ${shown} UD`;
    return `<div class="line-note">${txt}${extra}</div>`;
  }
  return "";
}

function bookCell(row, key) {
  const src = bookOffer(row, key);
  if (!src) return `<td class="muted">—</td>`;
  const px = Number(src.price);
  if (!Number.isFinite(px) || Math.abs(px) < 100 || Math.abs(px) >= 2500) return `<td class="muted">—</td>`;
  const shown = displayLine(row);
  const cmp = fantasyCmp(row);
  let offerLine = src.line;
  if (cmp) {
    if (state.view === "pp" && key === "underdog" && cmp.ud_as_pp != null) offerLine = cmp.ud_as_pp;
    if (state.view === "ud" && key === "prizepicks" && cmp.pp_as_ud != null) offerLine = cmp.pp_as_ud;
  }
  const same = offerLine == null || shown == null || Number(offerLine) === Number(shown);
  const note = same ? "" : `<div class="line-note">${offerLine}</div>`;
  const vol = key === "kalshi" && src.vol_pct != null
    ? `<div class="line-note">${src.vol_pct}% vol${src.dollar ? ` · ${moneyShort(src.dollar)}` : ""}</div>`
    : "";
  return `<td class="price">${american(src.price)}${note}${vol}</td>`;
}

function fillWhen(all) {
  const sel = $("when");
  if (!sel) return;
  const current = sel.value;
  const days = unique((all || []).map((r) => ymdInCT(r.commence_time)).filter(Boolean)).sort();
  sel.innerHTML = [
    ["", "All dates"],
    ["today", "Today"],
    ["tomorrow", "Tomorrow"],
    ...days.map((d) => [d, dateLabel(d)]),
  ].map(([v, lab]) => `<option value="${escapeHtml(v)}">${escapeHtml(lab)}</option>`).join("");
  if ([...sel.options].some((o) => o.value === current)) sel.value = current;
}

function fillStats(pool) {
  const base = (pool || []).filter((r) => matchesWhen(r.commence_time) && !hasStarted(r.commence_time));
  const game = $("game")?.value || "";
  const team = $("team")?.value || "";
  const scoped = base.filter((r) => (!game || gameKeyOf(r) === game) && rowHasTeam(r, team));
  const stats = unique(scoped.map((r) => r.stat).filter(Boolean));
  const coreFirst = [...stats.filter((s) => CORE_STATS.has(s)).sort(), ...stats.filter((s) => !CORE_STATS.has(s)).sort()];
  if ($("stat")) fillSelect($("stat"), coreFirst, "All props");
}

function fillSelect(sel, values, allLabel) {
  const current = sel.value;
  sel.innerHTML = `<option value="">${allLabel}</option>` +
    values.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
  if ([...sel.options].some((o) => o.value === current)) sel.value = current;
}

function teamNames(row) {
  const raw = [row.away_team, row.home_team]
    .map((t) => String(t || "").replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 1);
  if (sportOf(row) === "NBA") {
    return unique(raw.map((t) => {
      const full = canonicalNbaTeam(t);
      return NBA_FULL.has(full) ? full : t;
    }));
  }
  return unique(raw);
}

function rowHasTeam(row, team) {
  if (!team) return true;
  const names = [row.away_team, row.home_team];
  if (sportOf(row) === "NBA") {
    const want = canonicalNbaTeam(team);
    return names.some((n) => {
      const full = canonicalNbaTeam(n);
      return (NBA_FULL.has(full) && full === want) || normName(n) === normName(team);
    });
  }
  const needle = String(team).toLowerCase();
  return `${row.away_team || ""} ${row.home_team || ""} ${row.game || ""} ${gameKeyOf(row)} ${matchup(row)}`.toLowerCase().includes(needle);
}

function fillGameAndTeam(pool) {
  const base = (pool || []).filter((r) => matchesWhen(r.commence_time) && !hasStarted(r.commence_time));
  const teams = unique(base.flatMap(teamNames)).sort((a, b) => a.localeCompare(b));
  if ($("team")) fillSelect($("team"), teams, "All teams");
  const team = $("team")?.value || "";
  const q = ($("gameQ")?.value || "").trim().toLowerCase();
  let games = unique(base.filter((r) => rowHasTeam(r, team)).map((r) => gameKeyOf(r)).filter(Boolean))
    .sort((a, b) => a.localeCompare(b));
  if (q) games = games.filter((g) => g.toLowerCase().includes(q));
  if ($("game")) {
    const prev = $("game").value;
    fillSelect($("game"), games, games.length ? "All games" : "No matching games");
    if (prev && ![...$("game").options].some((o) => o.value === prev)) $("game").value = "";
  }
}

function visibleBooks() {
  return BOOKS.filter((b) => state.booksOn.has(b.key));
}

function renderBookPicks() {
  $("bookPicks").innerHTML = BOOKS.map((b) => {
    const on = state.booksOn.has(b.key) ? "on" : "";
    const ex = b.exchange ? " ex" : "";
    return `<button type="button" class="book-pick ${on}${ex}" data-book="${b.key}">
      ${bookMark(b, "sm")}<span>${escapeHtml(b.name)}${b.exchange ? " · EX" : ""}</span>
    </button>`;
  }).join("");
}

function renderHead() {
  const fixed = `
    <th data-key="player">Player</th>
    <th data-key="stat">Stat</th>
    <th data-key="line">Line</th>
    <th data-key="pp_tier">Tier</th>
    <th data-key="pct_to_hit">% to Hit</th>
    <th data-key="ev">Edge</th>
    <th>Best</th>`;
  const books = visibleBooks().map((b) =>
    `<th data-book="${b.key}">${bookMark(b)}</th>`
  ).join("");
  $("headrow").innerHTML = fixed + books;
  $("headrow").querySelectorAll("th[data-key]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (state.sortKey === key) state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
      else {
        state.sortKey = key;
        state.sortDir = (key === "player" || key === "stat") ? "asc" : "desc";
      }
      render();
    });
  });
}

function tierBadge(row) {
  if (state.view === "pp" || state.view === "ev") {
    const tier = row.pp_tier;
    if (!tier) return `<span class="muted">—</span>`;
    const cls = tier === "Demon" ? "tier demon" : tier === "Goblin" ? "tier goblin" : tier === "Alternate" ? "tier alt" : "tier std";
    return `<span class="${cls}">${tier}</span>`;
  }
  if (row.is_alternate) return `<span class="tier alt">Alt</span>`;
  return `<span class="tier std">Standard</span>`;
}

function bestCell(row) {
  const b = row.best;
  if (!b) return `<td class="muted">—</td>`;
  const key = canonBook(b.book);
  const meta = BOOK_BY_KEY[key];
  const mark = meta ? bookMark(meta, "sm") : `<span class="muted">${escapeHtml(key)}</span>`;
  return `<td class="price">${mark} ${american(b.price)}</td>`;
}

function spreadCell(row) {
  if (row.spread == null) return `<td class="muted">—</td>`;
  const home = abbr(row.home_team);
  const n = Number(row.spread);
  const txt = n > 0 ? `${home} +${n}` : `${home} ${n}`;
  return `<td>${escapeHtml(txt)}</td>`;
}

function totalCell(row) {
  if (row.total == null) return `<td class="muted">—</td>`;
  return `<td>${Number(row.total)}</td>`;
}


function scriptLine(row) {
  const bits = [];
  if (row.spread != null) {
    const home = abbr(row.home_team);
    const n = Number(row.spread);
    bits.push(n > 0 ? `${home} +${n}` : `${home} ${n}`);
  }
  if (row.total != null) bits.push(`O/U ${Number(row.total)}`);
  return bits.join(" · ") || "—";
}

function moneyShort(n) {
  const x = Number(n);
  if (!Number.isFinite(x) || x <= 0) return "";
  if (x >= 1e6) return `$${(x / 1e6).toFixed(1)}M`;
  if (x >= 1e3) return `$${(x / 1e3).toFixed(1)}k`;
  return `$${Math.round(x)}`;
}

function teamTokens(name) {
  const raw = String(name || "").trim();
  const skip = new Set(["the", "pro", "football", "team", "game"]);
  const out = new Set();
  const add = (s) => String(s || "").toLowerCase().split(/[^a-z0-9]+/).forEach((w) => {
    if (w.length >= 2 && !skip.has(w)) out.add(w);
  });
  add(raw);
  const up = raw.toUpperCase();
  Object.entries(TEAM_ABBR).forEach(([full, ab]) => {
    if (up === ab || raw.toLowerCase() === full.toLowerCase()) add(full);
  });
  return [...out];
}

function hasTeamToken(text, tokens) {
  return tokens.filter((tok) => tok.length >= 3 && new RegExp(`(?:^|[^a-z0-9])${tok}(?:[^a-z0-9]|$)`).test(text)).length;
}

function kalshiMatch(list, game) {
  const sides = kalshiSides(list, game);
  return sides.home || sides.away || null;
}

function outcomeClause(m) {
  const raw = `${m.subtitle || ""} ${m.title || ""}`;
  const parts = raw.split(":");
  return parts[parts.length - 1].toLowerCase();
}

function parseKalshiPts(m) {
  const t = `${m.title || ""} ${m.subtitle || ""}`;
  const hit = t.match(/over\s+(\d+(?:\.\d+)?)/i) || t.match(/by\s+(\d+(?:\.\d+)?)/i);
  return hit ? Number(hit[1]) : null;
}

function kalshiSides(list, game, kind) {
  kind = kind || "win";
  const homeTok = teamTokens(game.home_team);
  const awayTok = teamTokens(game.away_team);
  const spread = Math.abs(Number(game.spread));
  const scored = (list || []).map((m) => {
    const clause = outcomeClause(m);
    const full = `${m.title || ""} ${m.subtitle || ""}`.toLowerCase();
    const isSpread = /wins by|cover|over \d/.test(`${clause} ${full}`);
    if (kind === "win" && isSpread) return null;
    if (kind === "cover" && !isSpread) return null;
    if (kind === "total" && !/over|under|total/.test(full)) return null;
    const text = clause.length > 6 ? clause : full;
    const h = hasTeamToken(text, homeTok);
    const a = hasTeamToken(text, awayTok);
    let side = null;
    if (h > a) side = "home";
    else if (a > h) side = "away";
    return { m, side, pts: parseKalshiPts(m), dollar: m.dollar || 0 };
  }).filter(Boolean);

  const pickSide = (side) => {
    let pool = scored.filter((x) => x.side === side);
    if (kind === "cover" && Number.isFinite(spread)) {
      pool = [...pool].sort((a, b) => {
        const da = a.pts == null ? 99 : Math.abs(a.pts - spread);
        const db = b.pts == null ? 99 : Math.abs(b.pts - spread);
        return da - db || b.dollar - a.dollar;
      });
    } else {
      pool.sort((a, b) => b.dollar - a.dollar);
    }
    return pool[0]?.m || null;
  };
  let homeM = pickSide("home");
  let awayM = pickSide("away");
  if (homeM && !awayM) awayM = flipKalshi(homeM);
  else if (awayM && !homeM) homeM = flipKalshi(awayM);
  return { home: homeM, away: awayM };
}

function flipKalshi(m) {
  if (!m || m.implied == null) return null;
  return {
    ...m,
    implied: +(100 - Number(m.implied)).toFixed(1),
    title: `${m.title || ""} (No side)`,
    dollar: null,
    flipped: true,
  };
}

function volShare(part, total) {
  if (!total) return null;
  return Math.round(1000 * (Number(part) || 0) / total) / 10;
}

function kalshiPairBlock(m, label, pairCash, marketWord) {
  if (!m) return `<div class="line-note muted">${escapeHtml(label)} —</div>`;
  const share = volShare(m.dollar, pairCash);
  return `<div class="line-note">
    <b>${escapeHtml(label)}</b>
    ${m.implied != null ? `${m.implied}¢ price` : ""}
    ${moneyShort(m.dollar) ? ` · ${moneyShort(m.dollar)} traded` : ""}
    ${share != null ? ` · ${share}% of ${marketWord} $` : ""}
  </div>`;
}

function kalshiCell(list, game, kind) {
  if (typeof game === "string") {
    const hit = (list || []).find((m) => (m.title || "").toLowerCase().includes(game.toLowerCase()));
    if (!hit) return `<span class="muted">—</span>`;
    return `<div class="price">${hit.implied != null ? hit.implied + "¢ price" : "—"}</div>
      <div class="line-note">${moneyShort(hit.dollar) || ""}</div>`;
  }
  const sides = kalshiSides(list, game || {}, kind || "win");
  if (!sides.home && !sides.away) return `<span class="muted">—</span>`;
  const pair = (sides.away?.dollar || 0) + (sides.home?.dollar || 0);
  return `${kalshiPairBlock(sides.away, abbr(game.away_team) || "Away", pair, "this market")}
    ${kalshiPairBlock(sides.home, abbr(game.home_team) || "Home", pair, "this market")}`;
}
function bookImplied(price) {
  if (price == null) return null;
  const n = Number(price);
  if (Number.isNaN(n) || n === 0) return null;
  return n < 0 ? (Math.abs(n) / (Math.abs(n) + 100)) * 100 : (100 / (n + 100)) * 100;
}
function gameBestEdge(g, k) {
  const mlHomeImp = bookImplied(g.ml_home);
  const mlAwayImp = bookImplied(g.ml_away);
  const kHome = kalshiMatch(k.ml, g);
  let best = null;
  if (kHome && kHome.implied != null && mlHomeImp != null) {
    best = +(kHome.implied - mlHomeImp).toFixed(1);
  }
  return best;
}
function headshotTag(url) {
  const src = url || FALLBACK_HEAD;
  return `<img class="headshot" src="${escapeHtml(src)}" alt="" referrerpolicy="no-referrer" onerror="if(this.dataset.fb)return;this.dataset.fb=1;this.src='${FALLBACK_HEAD}'" />`;
}
function ppId(row) {
  const raw = String(row?.pp_id || row?.dfs?.prizepicks?.id || "").trim();
  if (!raw || raw.startsWith("http") || !/^\d+$/.test(raw)) return "";
  return raw;
}

const SLIP_STAT_ALIAS = {
  "pass completions": "completions", "pass completion": "completions", "passing completions": "completions", "completions": "completions",
  "pass attempts": "pass att", "passing attempts": "pass att", "pass att": "pass att",
  "rush attempts": "rush att", "rushing attempts": "rush att", "rush att": "rush att",
  "ints": "ints", "int": "ints", "interceptions": "ints", "ints thrown": "ints",
  "receiving yards": "rec yds", "rec yards": "rec yds", "rec yds": "rec yds",
  "pass yards": "pass yds", "passing yards": "pass yds", "pass yds": "pass yds",
  "rush yards": "rush yds", "rushing yards": "rush yds", "rush yds": "rush yds",
  "kicking points": "kicking pts", "kicking pts": "kicking pts",
  "fg made": "field goals", "field goals made": "field goals", "field goals": "field goals",
  "anytime td": "anytime td", "anytime tds": "anytime td",
  "receptions": "receptions",
};

function slipStatKey(stat) {
  const raw = String(stat || "").replace(/[_+]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  return SLIP_STAT_ALIAS[raw] || raw;
}

function slipLegKey(player, stat, line) {
  const n = Number(line);
  return `${normName(player)}|${slipStatKey(stat)}|${Number.isFinite(n) ? n.toFixed(1) : ""}`;
}

const PP_SHEET_CSV = {
  NFL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5CGYxMTghCulNtsHaMDKjkkbbYKaEWt0tJ2ie7iu-Mx2YpBClXzIZaZeYRdkg7LJlt8r_6nrxdqYa/pub?gid=2102978132&single=true&output=csv",
  CFB: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSV0x8a_qRCwt9t2MRmRph7MwHioKNrZTN00niOF2spzpMzxrlaz3cKr5oE_soDhjkeH8NbU4UxsIqe/pub?gid=2102978132&single=true&output=csv",
  MLB: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLw3UZqoWqheDXCENlKhAGk8adRqvYH8LFik2LFAhKV4785KLw3a4e6jACDYPoKzqfquYDn5Tg1pB0/pub?gid=0&single=true&output=csv",
  WNBA: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRsopuNNvgPQEQBFP3JGqYf9LXHTO1sGdip73gkFTEjFw_RVVie4_ycGHC7g6RuunLvCk7yJdFp4ZxQ/pub?gid=0&single=true&output=csv",
  NBA: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSptSZasyTv6ao6maRZ2lUPu3My2_T1gi5gm--1nQ2aGWHO2sVKjxHUPDe461SRXtVCt4iWJ3sl6lqX/pub?gid=0&single=true&output=csv",
  CBB: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQx_BIRvb4w8yfASiJAmasowTnHHrHZQbKyQ6G-Nc7t1Igzx1IH-SLiOizclSV8zgThZ9qMbu7fKclo/pub?gid=0&single=true&output=csv",
  SOCCER: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9cof5aKuKsPbVlQ8rvoVrF2-ROXq096CrSIxIOO9swtl3smSUJ2JOtNcbdpX46RVx1HuqdIGeY57S/pub?gid=0&single=true&output=csv",
};
let ppCatalog = new Map();
let ppCatalogPending = null;
const ppCatalogDone = new Set();

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let q = false;
  const src = String(text || "");
  for (let i = 0; i < src.length; i += 1) {
    const c = src[i];
    if (q) {
      if (c === '"') {
        if (src[i + 1] === '"') { cell += '"'; i += 1; }
        else q = false;
      } else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).filter((r) => r.some((c) => c !== "")).map((r) => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = r[i] || ""; });
    return obj;
  });
}

function rememberPpId(player, stat, line, id) {
  if (!/^\d+$/.test(String(id || ""))) return;
  ppCatalog.set(slipLegKey(player, stat, line), String(id));
}

function indexLoadedPpIds() {
  for (const r of state.data?.props || []) {
    const id = ppId(r);
    if (!id) continue;
    rememberPpId(r.player, r.stat, slipLine(r), id);
  }
}

async function ensurePpCatalog(rows) {
  indexLoadedPpIds();
  const sports = [...new Set((rows || []).flatMap((r) => {
    const s = String(r.sport || "").toUpperCase();
    return s && PP_SHEET_CSV[s] ? [s] : ["NFL", "CFB", "NBA"];
  }))].filter((s) => PP_SHEET_CSV[s]);
  const needed = sports.filter((s) => !ppCatalogDone.has(s) && (rows || []).some((r) => {
    const rs = String(r.sport || "").toUpperCase();
    const sportOk = rs ? rs === s : true;
    return sportOk && !ppId(r) && !ppCatalog.get(slipLegKey(r.player, r.stat, slipLine(r)));
  }));
  if (!needed.length) return ppCatalog;
  if (ppCatalogPending) return ppCatalogPending;
  needed.forEach((s) => ppCatalogDone.add(s));
  ppCatalogPending = Promise.all(needed.map(async (sport) => {
    try {
      const res = await fetch(PP_SHEET_CSV[sport]);
      if (!res.ok) return;
      const parsed = parseCsvRows(await res.text());
      parsed.forEach((row) => {
        const id = String(row["Data ID"] || "").trim();
        if (!/^\d+$/.test(id)) return;
        rememberPpId(row["Player Name"], row["Stat Type"], row["Line Score"], id);
      });
    } catch (_) {}
  })).then(() => {
    ppCatalogPending = null;
    return ppCatalog;
  });
  return ppCatalogPending;
}

function findPpId(row) {
  const direct = ppId(row);
  if (direct) return direct;
  const hit = ppCatalog.get(slipLegKey(row.player, row.stat, slipLine(row)));
  if (hit) {
    row.pp_id = hit;
    if (row.dfs?.prizepicks) row.dfs.prizepicks.id = hit;
    return hit;
  }
  return "";
}
const SLIP_PAY = {
  2: { label: "3X", be: 1 / 3 },
  3: { label: "6X", be: 1 / 6 },
  4: { label: "10X", be: 0.10 },
  5: { label: "10X", be: 0.10 },
  6: { label: "25X", be: 0.04 },
};

function slipLine(r) {
  const raw = r?.dfs?.prizepicks?.line ?? r?.pp_line;
  const pp = Number(raw);
  return Number.isFinite(pp) ? pp : r?.line;
}

function ppShareLink(rows) {
  const parts = rows.map((r) => {
    const id = findPpId(r);
    if (!id || !/^\d+$/.test(id)) return "";
    const dir = String(r.side || "").toLowerCase() === "under" ? "u" : "o";
    const line = slipLine(r) ?? "";
    return `${id},${id}-${dir}-${line}`;
  }).filter(Boolean);
  if (parts.length !== rows.length) return "";
  return `https://prizepicks.onelink.me/gCQS/shareEntry?projections=${parts.join(",")}`;
}

function ppSlipLink(row) {
  const href = ppShareLink([row]);
  return href || "https://app.prizepicks.com/";
}

function slipLines(row) {
  return [row?.line, row?.pp_line, row?.dfs?.prizepicks?.line]
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

function sameSlipLeg(a, b) {
  if (!a || !b) return false;
  if (normName(a.player) !== normName(b.player)) return false;
  if (slipStatKey(a.stat) !== slipStatKey(b.stat)) return false;
  if (String(a.side || "").toLowerCase() !== String(b.side || "").toLowerCase()) return false;
  const al = slipLines(a);
  const bl = slipLines(b);
  if (!al.length || !bl.length) return true;
  return al.some((x) => bl.some((y) => Math.abs(x - y) <= 0.26));
}

function boardProps() {
  const out = [];
  const seen = new Set();
  const push = (r) => {
    if (!r || seen.has(r)) return;
    seen.add(r);
    out.push(r);
  };
  (state.data?.props || []).forEach(push);
  Object.values(state.boardCache || {}).forEach((b) => (b?.props || []).forEach(push));
  return out;
}

function hydrateSlipRow(row) {
  if (!row) return row;
  const sheet = Number(row.pct_to_hit);
  if (Number.isFinite(sheet) && sheet > 5 && sheet < 95 && row.books) return row;
  const hit = boardProps().find((p) => sameSlipLeg(row, p) && p.pct_to_hit != null);
  if (!hit) return row;
  const id = ppId(row) || ppId(hit);
  row.pct_to_hit = row.pct_to_hit ?? hit.pct_to_hit;
  row.true_point = row.true_point ?? hit.true_point;
  row.books = row.books || hit.books;
  row.sport = row.sport || hit.sport;
  if (!row.dfs?.prizepicks && hit.dfs?.prizepicks) row.dfs = { ...(row.dfs || {}), prizepicks: { ...hit.dfs.prizepicks } };
  if (id) {
    row.pp_id = id;
    if (!row.dfs) row.dfs = {};
    if (!row.dfs.prizepicks) row.dfs.prizepicks = {};
    row.dfs.prizepicks.id = id;
  }
  return row;
}

function slipProb(row) {
  hydrateSlipRow(row);
  const prev = state.view;
  state.view = "pp";
  const p = hitPct(row);
  state.view = prev;
  const n = Number(p);
  if (!Number.isFinite(n)) return null;
  return Math.min(0.97, Math.max(0.03, n / 100));
}

function chooseCombos(items, k) {
  const out = [];
  const cur = [];
  function walk(start) {
    if (cur.length === k) {
      out.push(cur.slice());
      return;
    }
    for (let i = start; i < items.length; i += 1) {
      cur.push(items[i]);
      walk(i + 1);
      cur.pop();
    }
  }
  walk(0);
  return out;
}

function slipPool() {
  return state.slip
    .map((r) => ({ r, p: slipProb(r) }))
    .filter((x) => x.p != null)
    .sort((a, b) => b.p - a.p)
    .slice(0, 8);
}

function slipCombos(size) {
  const pay = SLIP_PAY[size];
  const pool = slipPool();
  if (!pay || pool.length < size) return [];
  return chooseCombos(pool, size).map((combo) => {
    const names = new Set();
    let prod = 1;
    for (const x of combo) {
      const name = normName(x.r.player);
      if (names.has(name)) return null;
      names.add(name);
      prod *= x.p;
    }
    return { combo, cash: prod * 100, edge: (prod - pay.be) * 100, pay };
  }).filter(Boolean).sort((a, b) => b.edge - a.edge).slice(0, 15);
}

function saveSlip() {
  try {
    localStorage.setItem("ev_pp_slip", JSON.stringify(state.slip.map((r) => ({
      player: r.player, stat: r.stat, side: r.side, line: r.line,
      pp_line: slipLine(r),
      pp_id: ppId(r), sport: r.sport, game: r.game, headshot: r.headshot,
      event_id: r.event_id, market: r.market,
      pct_to_hit: r.pct_to_hit, true_point: r.true_point,
    }))));
  } catch (_) {}
}

function restoreSlip() {
  if (state.slip.length) return;
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem("ev_pp_slip") || "[]"); } catch (_) { return; }
  if (!Array.isArray(saved) || !saved.length) return;
  const props = boardProps();
  state.slip = saved.map((s) => props.find((r) => sameSlipLeg(s, r)) || s).filter(Boolean).slice(0, 10);
  state.slip.forEach(hydrateSlipRow);
}

function renderSlip() {
  const tab = document.querySelector('.tab[data-section="slip"]');
  if (tab) tab.textContent = state.slip.length ? `Bet Slips (${state.slip.length})` : "Bet Slips";
  const list = $("slipList");
  if (list) {
    list.innerHTML = state.slip.map((r, i) => {
      const pct = slipProb(r);
      return `<div class="slip-leg">
        <img src="${escapeHtml(r.headshot || FALLBACK_HEAD)}" alt="" onerror="this.src='${FALLBACK_HEAD}'">
        <div>
          <div class="player">${escapeHtml(r.player)}</div>
          <div class="game">${escapeHtml(r.side)} ${slipLine(r) ?? ""} ${escapeHtml(r.stat)}${pct != null ? ` · ${(pct * 100).toFixed(1)}%` : ""}</div>
        </div>
        <button type="button" class="book-pick" data-slip="${i}">Remove</button>
      </div>`;
    }).join("");
  }
  const sizes = $("slipSizes");
  if (sizes) {
    sizes.innerHTML = [2, 3, 4, 5, 6].map((n) => {
      const best = slipCombos(n)[0];
      const mark = !best ? "need legs" : `best ${best.edge >= 0 ? "+" : ""}${best.edge.toFixed(1)}`;
      return `<button type="button" data-slip-size="${n}" class="${state.slipSize === n ? "on" : ""}">${n}-Pick ${SLIP_PAY[n].label}<small>${mark}</small></button>`;
    }).join("");
  }
  const body = $("slipBody");
  const empty = $("slipEmpty");
  const rows = slipCombos(state.slipSize);
  const slipRows = state.slip || [];
  const unresolved = slipRows.filter((r) => !findPpId(r));
  if (unresolved.length && !ppCatalogPending) {
    const sportsLeft = [...new Set(unresolved.flatMap((r) => {
      const s = String(r.sport || "").toUpperCase();
      return s && PP_SHEET_CSV[s] ? [s] : ["NFL", "CFB", "NBA"];
    }))].filter((s) => PP_SHEET_CSV[s] && !ppCatalogDone.has(s));
    if (sportsLeft.length) ensurePpCatalog(slipRows).then(() => renderSlip());
  }
  if (body) {
    body.innerHTML = rows.map((c) => {
      const legs = c.combo.map((x) => `${x.r.player} ${x.r.side} ${slipLine(x.r) ?? ""} ${x.r.stat}`).join("<br>");
      const href = ppShareLink(c.combo.map((x) => x.r));
      const missing = c.combo.filter((x) => !findPpId(x.r)).map((x) => x.r.player);
      const link = href
        ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener">Place bet</a>`
        : `<span class="line-note">${ppCatalogPending ? "Loading projection id…" : missing.length ? `No projection id: ${escapeHtml(missing.join(", "))}` : "No projection id"}</span>`;
      const cls = c.edge >= 0 ? "pct good" : "pct bad";
      return `<tr>
        <td>${link}</td>
        <td>${legs}</td>
        <td>${c.cash.toFixed(1)}%</td>
        <td>${(c.pay.be * 100).toFixed(1)}%</td>
        <td><span class="${cls}">${c.edge >= 0 ? "+" : ""}${c.edge.toFixed(1)}</span></td>
        <td>${c.pay.label}</td>
      </tr>`;
    }).join("");
  }
  if (empty) {
    const need = state.slipSize - state.slip.length;
    const quiet = state.slip.filter((r) => slipProb(r) == null).map((r) => r.player);
    empty.style.display = rows.length ? "none" : "block";
    empty.textContent = state.slip.length < 2
      ? "Add at least 2 props with + slip."
      : need > 0
        ? `Add ${need} more leg${need === 1 ? "" : "s"} for a ${state.slipSize}-pick.`
        : quiet.length
          ? `${quiet.join(", ")} ${quiet.length === 1 ? "has" : "have"} no hit rate, so a ${state.slipSize}-pick cannot include ${quiet.length === 1 ? "that leg" : "those legs"}.`
          : "No combo at this size. Two props on the same player are not paired.";
  }
  saveSlip();
}

function addToSlip(row) {
  if (!row) return;
  const key = `${row.player}|${row.stat}|${row.side}|${row.line}`;
  if (state.slip.some((s) => `${s.player}|${s.stat}|${s.side}|${s.line}` === key)) {
    toast(`${row.player} is already on the slip`);
    return;
  }
  if (state.slip.length >= 10) {
    toast("Slip is full at 10 legs");
    return;
  }
  state.slip.push(row);
  renderSlip();
  toast(`Added ${row.player} ${row.side} ${slipLine(row) ?? ""} ${row.stat}`);
}

function toast(msg) {
  let el = $("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#173056;color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;font-weight:700;z-index:100;box-shadow:0 4px 12px rgba(0,0,0,.4);";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.hidden = true; }, 1600);
}

function renderGames() {
  const wrap = $("gamesWrap");
  if (!wrap) return;
  const showGames = state.section === "games";
  wrap.style.display = showGames ? "block" : "none";
  if (!showGames) return;
  const games = (state.data.games || []).filter((g) => !hasStarted(g.commence_time) && matchesWhen(g.commence_time));
  const k = state.data.kalshi || {};
  const ranked = games.map((g) => {
    const edge = gameBestEdge(g, k);
    return { ...g, edge };
  }).sort((a, b) => (b.edge ?? -999) - (a.edge ?? -999));
  const hot = [...(k.ml || []), ...(k.spread || []), ...(k.total || [])]
    .filter((m) => (m.dollar || 0) > 0)
    .sort((a, b) => (b.dollar || 0) - (a.dollar || 0))
    .slice(0, 8);
  const slateCash = hot[0]?.slate_dollar;
  const hotHtml = hot.length ? `<div class="ticker" style="margin-bottom:10px">${hot.map((m) =>
    `<span class="tick"><b>kalshi</b> ${escapeHtml((m.title || "").slice(0, 36))} ${m.implied != null ? m.implied + "¢" : ""} ${moneyShort(m.dollar)}${m.pct_slate != null ? ` · ${m.pct_slate}% slate` : ""}</span>`
  ).join("")}${slateCash ? `<span class="tick"><b>slate</b> ${moneyShort(slateCash)}</span>` : ""}</div>` : "";
  wrap.querySelector(".kalshi-hot")?.remove();
  if (hotHtml) {
    const div = document.createElement("div");
    div.className = "kalshi-hot";
    div.innerHTML = hotHtml;
    wrap.insertBefore(div, wrap.firstChild);
  }
  $("gamesBody").innerHTML = ranked.map((g) => {
    const edge = g.edge;
    return `<tr>
      <td><div class="player">${escapeHtml(g.game)}</div><div class="game"><span class="sport-tag">${escapeHtml(g.sport || "")}</span> ${escapeHtml(fmtWhen(g.commence_time))}</div></td>
      <td class="line-stack"><div class="line-num">${g.spread ?? "—"}</div>${g.spread_proj != null ? `<div class="line-note">proj ${g.spread_proj}</div>` : ""}</td>
      <td class="line-stack"><div class="line-num">${g.total ?? "—"}</div>${g.total_proj != null ? `<div class="line-note">proj ${g.total_proj}</div>` : ""}</td>
      <td class="price">${american(g.ml_away)}<div class="line-note">${bookImplied(g.ml_away) != null ? bookImplied(g.ml_away).toFixed(1) + "%" : ""}</div></td>
      <td class="price">${american(g.ml_home)}<div class="line-note">${bookImplied(g.ml_home) != null ? bookImplied(g.ml_home).toFixed(1) + "%" : ""}</div></td>
      <td>${kalshiCell(k.ml, g, "win")}</td>
      <td>${kalshiCell(k.spread, g, "cover")}</td>
      <td>${kalshiCell(k.total, g, "total")}</td>
      <td class="${edge != null && edge >= 0 ? "" : "muted"}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}</td>
    </tr>`;
  }).join("");
  $("gamesEmpty").style.display = games.length ? "none" : "block";
  $("count").textContent = `${games.length} games · Kalshi ML ${(k.ml || []).length}`;
  renderSlip();
}

function allKalshiMarkets() {
  const k = state.data?.kalshi || {};
  return [
    ...(k.ml || []).map((m) => ({ ...m, kind: m.kind || "ml", bucket: "game" })),
    ...(k.spread || []).map((m) => ({ ...m, kind: m.kind || "spread", bucket: "game" })),
    ...(k.total || []).map((m) => ({ ...m, kind: m.kind || "total", bucket: "game" })),
    ...(k.props || []).map((m) => ({ ...m, bucket: "props" })),
  ];
}

function renderVolume() {
  const wrap = $("volumeWrap");
  if (!wrap) return;
  wrap.style.display = state.section === "volume" ? "block" : "none";
  if (state.section !== "volume") return;
  const picks = $("volPicks");
  if (picks) {
    const opts = [
      ["all", "All"],
      ["game", "Game bets"],
      ["ml", "Moneyline"],
      ["spread", "Spread"],
      ["total", "Totals"],
      ["props", "Props"],
    ];
    picks.innerHTML = opts.map(([k, lab]) =>
      `<button type="button" class="book-pick ${state.volFilter === k ? "on" : ""}" data-vol="${k}">${lab}</button>`
    ).join("");
  }
  const q = ($("q")?.value || "").trim().toLowerCase();
  const filt = state.volFilter || "game";
  const rows = allKalshiMarkets()
    .filter((m) => {
      if (filt === "all") return true;
      if (filt === "game") return m.bucket === "game";
      if (filt === "props") return m.bucket === "props";
      return m.kind === filt;
    })
    .filter((m) => !q || `${m.title} ${m.subtitle} ${m.kind}`.toLowerCase().includes(q))
    .sort((a, b) => (b.dollar || 0) - (a.dollar || 0));
  const slate = rows[0]?.slate_dollar || rows.reduce((s, m) => s + (m.dollar || 0), 0);
  $("volumeBody").innerHTML = rows.slice(0, 200).map((m, i) => `<tr>
    <td>${i + 1}</td>
    <td><div class="player">${escapeHtml(m.title || m.ticker || "")}</div>
      <div class="game">${escapeHtml((m.kind || "").toUpperCase())} · ${escapeHtml((m.subtitle || "").slice(0, 40))}</div></td>
    <td class="price">${m.implied != null ? m.implied + "¢" : "—"}</td>
    <td>${moneyShort(m.dollar) || "—"}</td>
    <td>${m.pct_event != null ? m.pct_event + "%" : "—"}</td>
    <td>${m.pct_slate != null ? m.pct_slate + "%" : "—"}</td>
    <td>${moneyShort(m.dollar_24h) || "—"}</td>
    <td>${m.oi != null ? Math.round(m.oi).toLocaleString() : "—"}</td>
  </tr>`).join("");
  $("volumeEmpty").style.display = rows.length ? "none" : "block";
  $("count").textContent = `${rows.length} Kalshi markets · slate ${moneyShort(slate) || "$0"}`;
  $("updated").textContent = `Updated ${fmtWhen(state.data?.updated)} · Kalshi volume`;
}

function renderTicker() {
  const bar = $("newsTicker");
  const track = $("tickerTrack");
  if (!bar || !track) return;
  const news = state.intel?.news || [];
  const show = news.length && state.section !== "games";
  bar.hidden = !show;
  if (!show) return;
  track.innerHTML = news.slice(0, 18).map((n) =>
    `<a class="ticker-item" href="${escapeHtml(n.url || "#")}" target="_blank" rel="noopener"><b>${escapeHtml(n.source || "")}</b> ${escapeHtml(n.headline || "")}</a>`
  ).join("");
}

function renderNews() {
  const wrap = $("newsWrap");
  if (!wrap) return;
  wrap.style.display = state.section === "news" ? "block" : "none";
  if (state.section !== "news") return;
  const news = state.intel?.news || [];
  const q = ($("q")?.value || "").trim().toLowerCase();
  const rows = news.filter((n) => !q || `${n.headline} ${n.description} ${n.source}`.toLowerCase().includes(q));
  $("newsBody").innerHTML = rows.map((n) => {
    const names = (n.players || []).map((id) => playerByGsis(id)?.name || id).filter(Boolean);
    return `<tr>
      <td>${escapeHtml(n.source || "")}</td>
      <td><a class="player-btn" href="${escapeHtml(n.url || "#")}" target="_blank" rel="noopener">${escapeHtml(n.headline || "")}</a>
        <div class="game">${escapeHtml((n.description || "").slice(0, 140))}</div></td>
      <td class="muted">${escapeHtml(n.published || "")}</td>
      <td>${escapeHtml(names.join(", ") || "—")}</td>
    </tr>`;
  }).join("");
  $("newsEmpty").style.display = rows.length ? "none" : "block";
  $("count").textContent = `${rows.length} headlines · pulled ${fmtWhen(state.intel?.news_pulled_at)}`;
}

function renderInjuries() {
  const wrap = $("injWrap");
  if (!wrap) return;
  wrap.style.display = state.section === "injuries" ? "block" : "none";
  if (state.section !== "injuries") return;
  const q = ($("q")?.value || "").trim().toLowerCase();
  const rows = (state.intel?.injuries || []).filter((r) =>
    !q || `${r.name} ${r.team} ${r.report_status} ${r.report_injury}`.toLowerCase().includes(q)
  );
  $("injBody").innerHTML = rows.map((r) => `<tr>
    <td><div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.name)}">${escapeHtml(r.name || "")}</button></div></td>
    <td>${escapeHtml(r.team || "")}</td>
    <td>${escapeHtml(r.pos || "")}</td>
    <td>${injPill({ status: r.report_status, injury: r.report_injury }) || "—"}</td>
    <td>${escapeHtml(r.report_injury || r.practice_injury || "—")}</td>
    <td class="muted">${escapeHtml(r.practice_status || "—")}</td>
    <td class="muted">${r.season || ""} w${r.week || "—"}</td>
  </tr>`).join("");
  $("injEmpty").style.display = rows.length ? "none" : "block";
  const note = state.intel?.has_2026_logs ? "" : " · 2025 season file until Week 1 2026";
  $("count").textContent = `${rows.length} injury rows · latest ${state.intel?.injury_season || ""}w${state.intel?.injury_week || ""}${note}`;
}

function renderLogs() {
  const wrap = $("logsWrap");
  if (!wrap) return;
  wrap.style.display = state.section === "logs" ? "block" : "none";
  if (state.section !== "logs") return;
  const q = ($("q")?.value || "").trim().toLowerCase();
  const players = Object.values(state.intel?.players || {}).filter((p) => {
    if (!["QB", "RB", "WR", "TE", "K"].includes(p.pos)) return false;
    if (q && !`${p.name} ${p.team} ${p.pos}`.toLowerCase().includes(q)) return false;
    return (state.intel?.logs?.[p.gsis_id] || []).length;
  });
  const ranked = players.map((p) => {
    const recs = intelLogs(p.gsis_id);
    const last = recs[recs.length - 1];
    const inj = (state.intel?.injuries || []).find((i) => i.gsis_id === p.gsis_id);
    return {
      ...p, last, inj,
      rec: avgLogs(recs, "rec"), tgt: avgLogs(recs, "tgt"), recy: avgLogs(recs, "rec_yds"),
      rush: avgLogs(recs, "rush_yds"), car: avgLogs(recs, "car"),
      pass: avgLogs(recs, "pass_yds"), ppr: avgLogs(recs, "ppr"),
    };
  }).sort((a, b) => (b.ppr || 0) - (a.ppr || 0));
  $("logsBody").innerHTML = ranked.map((p) => `<tr>
    <td><div class="player-row">${headshotTag(p.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(p.name)}">${escapeHtml(p.name)}</button></div></td>
    <td>${escapeHtml(p.pos || "")}</td>
    <td>${escapeHtml(p.team || "")}</td>
    <td class="logs-mini">${p.last ? `${p.last.season} w${p.last.week} vs ${escapeHtml(p.last.opp || "")}` : "—"}</td>
    <td class="logs-mini">${p.rec ?? "—"} / ${p.tgt ?? "—"}</td>
    <td class="logs-mini">${p.recy ?? "—"}</td>
    <td class="logs-mini">${p.car ?? "—"}-${p.rush ?? "—"}</td>
    <td class="logs-mini">${p.pass ?? "—"}</td>
    <td class="logs-mini">${p.ppr ?? "—"}</td>
    <td>${p.inj ? injPill({ status: p.inj.report_status, injury: p.inj.report_injury }) : `<span class="muted">${state.intel?.has_2026_logs ? "" : "2025 logs"}</span>`}</td>
  </tr>`).join("");
  $("logsEmpty").style.display = ranked.length ? "none" : "block";
  $("count").textContent = `${ranked.length} skill players · seasons ${(state.intel?.log_seasons || []).join(", ") || "n/a"}`;
}

function bestOver(rows, stats) {
  return rows
    .filter((r) => r.side === "Over" || r.side === "Yes")
    .filter((r) => !stats || stats.has(r.stat))
    .sort((a, b) => (b.pct_to_hit || 0) - (a.pct_to_hit || 0));
}

function playerTeamGuess(row) {
  return row.nfl_team || intelPlayer(row.player)?.team || "";
}

function buildStackGames() {
  const rows = (state.data?.props || []).filter((r) =>
    String(r.sport || "").toUpperCase() === "NFL" && !hasStarted(r.commence_time) && r.dfs?.prizepicks
  );
  const byGame = {};
  rows.forEach((r) => {
    const key = r.game || `${r.away_team} @ ${r.home_team}`;
    (byGame[key] ||= { game: key, row: r, players: {} }).players[r.player] ||= [];
    byGame[key].players[r.player].push(r);
    byGame[key].row = r;
  });
  const shape = $("stackShape")?.value || "all";
  return Object.values(byGame).map((g) => {
    const all = Object.values(g.players).flat();
    const passers = bestOver(all, PASS_STATS);
    const qbName = passers[0]?.player;
    const wr = bestOver(all.filter((r) => r.player !== qbName), CATCH_STATS);
    const rush = bestOver(all.filter((r) => r.player !== qbName), RUSH_STATS);
    const qbTeam = playerTeamGuess(passers[0] || {});
    const bring = rush.find((r) => {
      const team = playerTeamGuess(r);
      return team && qbTeam && team !== qbTeam;
    }) || rush[0];
    const mini = [passers[0], wr[0]].filter(Boolean);
    const dbl = [passers[0], wr[0], wr[1]].filter(Boolean);
    const gameStack = [passers[0], wr[0], wr[1], bring].filter(Boolean);
    const picks = shape === "mini" ? mini : shape === "double" ? dbl : shape === "game" ? gameStack : gameStack;
    const uniq = [];
    picks.forEach((p) => { if (p && !uniq.some((u) => u.player === p.player && u.stat === p.stat)) uniq.push(p); });
    const score = uniq.length ? uniq.reduce((s, r) => s + (r.pct_to_hit || 0), 0) / uniq.length : 0;
    return {
      game: g.game,
      total: g.row.total,
      spread: g.row.spread,
      home: g.row.home_team,
      away: g.row.away_team,
      when: g.row.commence_time,
      qb: passers[0],
      pass: wr.slice(0, 3),
      rush: rush.slice(0, 3),
      bring,
      picks: uniq,
      score,
    };
  }).filter((g) => g.qb || g.pass.length).sort((a, b) => (b.total || 0) - (a.total || 0) || b.score - a.score);
}

function renderStacks() {
  const wrap = $("stacksWrap");
  if (!wrap) return;
  wrap.style.display = state.section === "stacks" ? "block" : "none";
  if (state.section !== "stacks") return;
  const games = buildStackGames();
  $("stacksBody").innerHTML = games.map((g) => `
    <article class="stack-card">
      <div class="stack-top">
        <div>
          <div class="stack-game">${escapeHtml(g.game)}</div>
          <div class="stack-meta">${escapeHtml(fmtWhen(g.when))} · ${g.spread != null ? `spread ${g.spread}` : ""} ${g.total != null ? `· O/U ${g.total}` : ""}</div>
        </div>
        <div class="stack-score">${g.score ? g.score.toFixed(1) + "% avg hit" : ""}</div>
      </div>
      <div class="stack-grid">
        <div class="stack-col">
          <h4>QB / pass</h4>
          ${g.qb ? `<div class="stack-pick"><button type="button" class="player-btn" data-player="${escapeHtml(g.qb.player)}">${escapeHtml(g.qb.player)}</button><span>${escapeHtml(g.qb.stat)} ${g.qb.line ?? ""} · ${g.qb.pct_to_hit?.toFixed(1) || "—"}%</span></div>` : `<div class="muted">—</div>`}
        </div>
        <div class="stack-col">
          <h4>Same-team receivers</h4>
          ${g.pass.slice(0, 3).map((r) => `<div class="stack-pick"><button type="button" class="player-btn" data-player="${escapeHtml(r.player)}">${escapeHtml(r.player)}</button><span>${escapeHtml(r.stat)} ${r.line ?? ""} · ${r.pct_to_hit?.toFixed(1) || "—"}%</span></div>`).join("") || `<div class="muted">—</div>`}
        </div>
        <div class="stack-col">
          <h4>Bring-back / rush</h4>
          ${g.bring ? `<div class="stack-pick"><button type="button" class="player-btn" data-player="${escapeHtml(g.bring.player)}">${escapeHtml(g.bring.player)}</button><span>${escapeHtml(g.bring.stat)} ${g.bring.line ?? ""} · ${g.bring.pct_to_hit?.toFixed(1) || "—"}%</span></div>` : `<div class="muted">—</div>`}
        </div>
      </div>
    </article>
  `).join("");
  $("stacksEmpty").style.display = games.length ? "none" : "block";
  $("count").textContent = `${games.length} stack games`;
}

function setTab(view) {
  document.querySelectorAll(".tab[data-view]").forEach((b) => b.classList.toggle("on", b.dataset.view === view));
  document.querySelectorAll(".tab[data-section]").forEach((b) => b.classList.remove("on"));
  state.view = view;
}

function syncTabs() {
  const group = groupOf(state.view);
  const sectionOn = ["preview", "slip", "bets", "volume"].includes(state.section);
  document.querySelectorAll(".mgroup").forEach((b) => b.classList.toggle("on", !sectionOn && b.dataset.group === group));
  document.querySelectorAll(".tab[data-view]").forEach((b) => {
    const g = b.dataset.group;
    b.hidden = !!(g && g !== group);
    b.classList.toggle("on", !sectionOn && b.dataset.view === state.view);
  });
  document.querySelectorAll(".tab[data-section]").forEach((b) => b.classList.toggle("on", b.dataset.section === state.section));
  const note = $("groupNote");
  if (note) {
    const priced = group === "exchanges" || state.view === "dabble" || state.view === "betr";
    note.hidden = !priced || sectionOn;
    if (!note.hidden) {
      note.textContent = state.view === "dabble" || state.view === "betr"
        ? "Edge is the traditional-book fair at this line, minus this book's price. One book cannot make an edge. Two books more than 8 points apart are marked split and get no edge. A price more than 8 points off the rest is ignored and marked stale."
        : "Edge is traditional books at this exact line, minus what this exchange pays. PrizePicks, Dabble, Betr, and copied no-vig numbers are not used. One book cannot make the edge. A book more than 8 points off the rest is ignored.";
    }
  }
  setMinMode(sectionOn ? state.market : group);
}

const MARKET_GROUPS = {
  dfs: ["pp", "ud", "pick6", "dabble", "betr", "ev", "all"],
  exchanges: ["prophetx", "novig", "kalshi", "polymarket"],
  books: ["books", "arb"],
};

function groupOf(view) {
  const hit = Object.entries(MARKET_GROUPS).find(([, views]) => views.includes(view));
  return hit ? hit[0] : "dfs";
}

function setMinMode(group) {
  const input = $("minPct");
  const name = document.querySelector("#minPctLabel .min-name");
  if (!input) return;
  if (group === "dfs" || group === "exchanges" || group === "books") state.market = group;
  const market = state.market || "dfs";
  const edge = market === "exchanges" || state.view === "dabble" || state.view === "betr";
  const key = edge ? "exchanges" : (market === "books" ? "books" : "dfs");
  const prev = state.minGroup || "dfs";
  if (prev !== key) {
    state.savedMin[prev] = input.value;
    input.value = state.savedMin[key] ?? (key === "exchanges" ? "0" : "50");
    state.minGroup = key;
  }
  if (name) name.textContent = edge ? "Min edge" : "Min %";
}

const NBA_CANON = {
  hawks: "Atlanta Hawks", celtics: "Boston Celtics", nets: "Brooklyn Nets",
  hornets: "Charlotte Hornets", bulls: "Chicago Bulls", cavaliers: "Cleveland Cavaliers",
  cavs: "Cleveland Cavaliers", mavericks: "Dallas Mavericks", mavs: "Dallas Mavericks",
  nuggets: "Denver Nuggets", pistons: "Detroit Pistons", warriors: "Golden State Warriors",
  rockets: "Houston Rockets", pacers: "Indiana Pacers", clippers: "LA Clippers",
  lakers: "Los Angeles Lakers", grizzlies: "Memphis Grizzlies", heat: "Miami Heat",
  bucks: "Milwaukee Bucks", timberwolves: "Minnesota Timberwolves", wolves: "Minnesota Timberwolves",
  pelicans: "New Orleans Pelicans", knicks: "New York Knicks", thunder: "Oklahoma City Thunder",
  magic: "Orlando Magic", "76ers": "Philadelphia 76ers", sixers: "Philadelphia 76ers",
  suns: "Phoenix Suns", blazers: "Portland Trail Blazers", kings: "Sacramento Kings",
  spurs: "San Antonio Spurs", raptors: "Toronto Raptors", jazz: "Utah Jazz",
  wizards: "Washington Wizards",
};

const NBA_FULL = new Set(Object.values(NBA_CANON));

function canonicalNbaTeam(name) {
  const raw = String(name || "").replace(/\s+/g, " ").trim();
  const low = raw.toLowerCase();
  if (!low) return "";
  if (low.includes("clipper")) return "LA Clippers";
  if (low.includes("laker")) return "Los Angeles Lakers";
  if (low.includes("trail blazer") || low === "blazers") return "Portland Trail Blazers";
  if (low.includes("76er") || low === "sixers") return "Philadelphia 76ers";
  if (NBA_CANON[low]) return NBA_CANON[low];
  const last = low.split(" ").pop();
  const full = NBA_CANON[last];
  if (!full) return raw;
  if (raw.split(" ").length === 1) return full;
  const words = low.split(" ");
  if (words.every((w) => full.toLowerCase().includes(w))) return full;
  return raw;
}

function gameKeyOf(row) {
  let away = row?.away_team;
  let home = row?.home_team;
  const g = String(row?.game || "");
  if ((!away || !home) && g.includes("@")) {
    const parts = g.split("@");
    away = away || parts[0].trim();
    home = home || parts.slice(1).join("@").trim();
  }
  away = away || "";
  home = home || "";
  if (sportOf(row) === "NBA") {
    const ca = canonicalNbaTeam(away);
    const ch = canonicalNbaTeam(home);
    if (NBA_FULL.has(ca)) away = ca;
    if (NBA_FULL.has(ch)) home = ch;
  }
  const a = abbr(away, row);
  const h = abbr(home, row);
  if (a && h) return `${a} @ ${h}`;
  return g.trim();
}

function teamPairKey(row) {
  const key = gameKeyOf(row);
  const parts = String(key || "").split("@").map((s) => s.trim()).filter(Boolean);
  if (parts.length !== 2) return key;
  return parts.slice().sort().join("|");
}

function richerGame(a, b) {
  const score = (r) => [r.spread, r.total, r.ml_home, r.ml_away, r.player, r.books].filter((x) => x != null && x !== "").length;
  return score(b) > score(a) ? b : a;
}

function upcomingGames() {
  const map = new Map();
  const add = (r) => {
    if (!r) return;
    if (r.commence_time && hasStarted(r.commence_time)) return;
    if (r.commence_time && !matchesWhen(r.commence_time)) return;
    const key = gameKeyOf(r);
    if (!key || key === "@") return;
    const pair = teamPairKey(r) || key;
    map.set(pair, map.has(pair) ? richerGame(map.get(pair), r) : r);
  };
  (state.data?.games || []).forEach(add);
  (state.data?.props || []).forEach(add);
  return [...map.values()].sort((a, b) => String(a.commence_time || "").localeCompare(String(b.commence_time || "")));
}

function rowsForGame(game) {
  const want = gameKeyOf({ game }) || String(game || "");
  if (!want) return [];
  return (state.data?.props || []).filter((r) => {
    if (hasStarted(r.commence_time)) return false;
    return gameKeyOf(r) === want;
  });
}

function previewBest(rows) {
  return rows
    .filter((r) => r.dfs?.prizepicks && (!r.pp_tier || r.pp_tier === "Standard") && !r.is_alternate)
    .map((r) => ({ r, edge: rowEdge(r) }))
    .filter((x) => x.r.pct_to_hit != null)
    .sort((a, b) => (b.edge ?? -999) - (a.edge ?? -999))
    .slice(0, 12);
}

function rowTeam(r) {
  return r.nfl_team || intelPlayer(r.player)?.team || "";
}

function gameScript(sample) {
  const sp = Number(sample.spread);
  if (sample.spread == null || Number.isNaN(sp)) return null;
  const homeFav = sp < 0;
  return {
    homeFav,
    margin: Math.abs(sp),
    fav: homeFav ? abbr(sample.home_team) : abbr(sample.away_team),
    dog: homeFav ? abbr(sample.away_team) : abbr(sample.home_team),
    favName: homeFav ? sample.home_team : sample.away_team,
    dogName: homeFav ? sample.away_team : sample.home_team,
  };
}

function rankedOvers(rows, team, stats) {
  return rows
    .filter((r) => r.side === "Over" && r.dfs?.prizepicks && (!stats || stats.has(r.stat)) && (!team || rowTeam(r) === team))
    .sort((a, b) => (b.pct_to_hit || 0) - (a.pct_to_hit || 0));
}

function previewCorrelates(rows, sample) {
  const out = [];
  const script = gameScript(sample);
  if (script && script.margin >= 3) {
    const favRush = rankedOvers(rows, script.fav, RUSH_STATS);
    const dogPass = rankedOvers(rows, script.dog, PASS_STATS);
    const dogCatch = rankedOvers(rows, script.dog, CATCH_STATS);
    const whyBase = `${script.favName} are ${script.margin}-point favorites. If they stay in front they should lean on the run and chew clock. ${script.dogName} are more likely to play from behind and throw.`;
    if (favRush[0] && (dogCatch[0] || dogPass[0])) {
      const b = dogCatch[0] || dogPass[0];
      out.push({ a: favRush[0], b, why: `${whyBase} Pair ${favRush[0].player} rush volume with ${b.player} ${b.stat}.` });
    }
    if (favRush[1] && dogPass[0] && dogPass[0].player !== (out[0]?.b?.player)) {
      out.push({ a: favRush[1], b: dogPass[0], why: `Same script: extra ${script.fav} carries plus ${script.dog} dropbacks.` });
    }
    if (dogPass[0] && dogCatch[0] && dogPass[0].player !== dogCatch[0].player) {
      out.push({ a: dogPass[0], b: dogCatch[0], why: `${script.dogName} trailing-script stack: QB yards with a pass catcher.` });
    }
  }
  const top = previewBest(rows).map((x) => x.r);
  if (top[0] && top[1] && top[0].player !== top[1].player) {
    out.push({
      a: top[0],
      b: top[1],
      why: `Two highest-edge standard props on this slate. Confirm they do not fight the same game script before combining.`,
    });
  }
  const seen = new Set();
  return out.filter((p) => {
    if (!p.a || !p.b) return false;
    const k = `${p.a.player}|${p.a.stat}|${p.b.player}|${p.b.stat}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 8);
}

function previewInjuries(sample) {
  const nfl = !sportOf(sample) || sportOf(sample) === "NFL";
  if (!nfl) return [];
  const teams = new Set([abbr(sample.away_team, sample), abbr(sample.home_team, sample)].filter((t) => TEAM_CODE_NICK[t] || t));
  const roster = new Set(rowsForGame(gameKeyOf(sample)).map((r) => nameKey(r.player)));
  const season = currentSeason();
  const rank = (s) => {
    const t = String(s || "").toLowerCase();
    if (t.includes("out") || t === "ir") return 0;
    if (t.includes("doubt")) return 1;
    if (t.includes("question")) return 2;
    return 3;
  };
  const fromIntel = (state.intel?.injuries || []).filter((inj) => {
    if (inj.season && Number(inj.season) !== season) return false;
    const t = abbr(inj.team);
    if (teams.size && t && teams.has(t)) return true;
    return roster.has(nameKey(inj.name));
  });
  const seen = new Set(fromIntel.map((i) => nameKey(i.name)));
  rowsForGame(gameKeyOf(sample)).forEach((r) => {
    if (!r.injury?.status || seen.has(nameKey(r.player))) return;
    if (r.injury.season && Number(r.injury.season) !== season) return;
    seen.add(nameKey(r.player));
    fromIntel.push({
      name: r.player,
      team: r.nfl_team || "",
      pos: r.position || r.nfl_pos || "",
      headshot: r.headshot,
      report_status: r.injury.status,
      report_injury: r.injury.injury,
      season: r.injury.season,
      week: r.injury.week,
    });
  });
  return fromIntel.sort((a, b) => rank(a.report_status) - rank(b.report_status) || String(a.name).localeCompare(String(b.name))).slice(0, 24);
}

function previewUsage(sample) {
  if (sportOf(sample) && sportOf(sample) !== "NFL") return "";
  const home = abbr(sample.home_team, sample);
  const away = abbr(sample.away_team, sample);
  const season = state.intel?.has_2026_logs ? 2026 : (state.intel?.log_seasons || []).slice(-1)[0] || 2026;
  const weekSet = new Set();
  const byTeam = { [away]: [], [home]: [] };
  const seen = new Set();
  const addPlayer = (name, meta, recs, row) => {
    const key = nameKey(name);
    if (!key || seen.has(key)) return;
    seen.add(key);
    const team = abbr(meta?.team || row?.nfl_team || "");
    if (team !== home && team !== away) return;
    const pos = String(meta?.pos || row?.position || row?.nfl_pos || "").toUpperCase();
    if (pos && !["QB", "RB", "WR", "TE", "FB", "HB"].includes(pos)) return;
    const weeks = (recs || []).filter((g) => Number(g.season) === Number(season) && g.off_pct != null);
    weeks.forEach((g) => weekSet.add(g.week));
    const snapPcts = weeks.map((g) => Number(g.off_pct)).filter((n) => Number.isFinite(n));
    const seasonPct = snapPcts.length ? snapPcts.reduce((a, b) => a + b, 0) / snapPcts.length : null;
    if (seasonPct == null && !weeks.length) return;
    byTeam[team].push({
      name,
      pos,
      meta,
      row,
      recs,
      seasonPct,
      byWeek: Object.fromEntries(weeks.map((g) => [g.week, g.off_pct])),
    });
  };
  rowsForGame(gameKeyOf(sample)).forEach((r) => {
    const meta = intelPlayer(r.player);
    addPlayer(r.player, meta, intelLogs(r.gsis_id || meta?.gsis_id), r);
  });
  Object.values(state.intel?.players || {}).forEach((p) => {
    const team = abbr(p.team);
    if (team !== home && team !== away) return;
    addPlayer(p.name, p, intelLogs(p.gsis_id), null);
  });
  const weeks = [...weekSet].filter(Boolean).sort((a, b) => a - b).slice(-6);
  const tone = (n, avg) => {
    if (n == null) return "snap-miss";
    if (avg == null) return "";
    if (n >= avg + 8) return "snap-up";
    if (n <= avg - 8) return "snap-down";
    return "snap-ok";
  };
  const table = (team, list) => {
    if (!list.length) return "";
    list.sort((a, b) => (b.seasonPct || 0) - (a.seasonPct || 0));
    const label = TEAM_CODE_NICK[team] ? `${team} ${TEAM_CODE_NICK[team]}` : team;
    return `<div class="snap-board">
      <h3>${escapeHtml(label)}</h3>
      <table class="popup-table snap-table">
        <thead><tr><th>Player</th><th>Pos</th><th>Season snap %</th>${weeks.map((w) => `<th>W${w}</th>`).join("")}</tr></thead>
        <tbody>${list.slice(0, 18).map((p) => {
          const pct = p.seasonPct == null ? 0 : Math.round(p.seasonPct);
          const row = p.row || { player: p.name, event_id: "", market: "", side: "", headshot: p.meta?.headshot };
          return `<tr class="popup-line" data-player="${escapeHtml(p.name)}" data-event="${escapeHtml(row.event_id || "")}" data-market="${escapeHtml(row.market || row.stat || "")}" data-side="${escapeHtml(row.side || "")}">
            <td>${headshotTag(row.headshot || p.meta?.headshot)} ${escapeHtml(p.name)}</td>
            <td>${escapeHtml(p.pos || "")}</td>
            <td><div class="snap-bar-wrap"><span class="snap-bar" style="width:${Math.min(100, pct)}%"></span><b>${p.seasonPct == null ? "—" : `${pct}%`}</b></div></td>
            ${weeks.map((w) => {
              const n = p.byWeek[w];
              const v = n == null ? "—" : `${Math.round(n)}%`;
              return `<td class="${tone(n, p.seasonPct)}">${v}</td>`;
            }).join("")}
          </tr>`;
        }).join("")}</tbody>
      </table>
    </div>`;
  };
  const html = `${table(away, byTeam[away] || [])}${table(home, byTeam[home] || [])}`;
  if (!html) return "";
  return `<div class="preview-card snap-card">
    <h3>Snaps by team <span class="muted" style="font-weight:400;font-size:12px">${escapeHtml(intelStamp())}</span></h3>
    <div class="corr-why">${season} offensive snap %. Green / red is vs that player's own season average. QBs do not show routes.</div>
    ${html}
  </div>`;
}

function bestGameBook(books, market, side) {
  let best = null;
  Object.entries(books || {}).forEach(([k, pack]) => {
    const rec = pack?.[market];
    const price = Number(rec?.[side]);
    if (!Number.isFinite(price) || Math.abs(price) < 100 || Math.abs(price) > 2000) return;
    const book = canonBook(k);
    if (!best || price > Number(best.price)) best = { book, price, line: rec.line };
  });
  return best;
}

function marketSideCard(label, best, hot, kalshiM, share, marketWord) {
  const meta = best ? BOOK_BY_KEY[best.book] : null;
  const book = best
    ? `${meta ? `${bookMark(meta, "sm")} ` : ""}${escapeHtml(meta?.name || best.book)} <b>${american(best.price)}</b>`
    : `<span class="muted">No price</span>`;
  let kLine = "";
  if (kalshiM && kalshiM.implied != null) {
    const cash = kalshiM.flipped ? "other side" : (moneyShort(kalshiM.dollar) || "");
    const pct = !kalshiM.flipped && share != null ? ` · ${share}% of ${marketWord} $` : "";
    kLine = `<div class="line-note">Kalshi ${kalshiM.implied}¢ ${american(centsToAmerican(kalshiM.implied))}${cash ? ` · ${cash}` : ""}${pct}</div>`;
  }
  return `<div class="gm-side ${hot ? "hot" : ""}">
    <div class="gm-line">${escapeHtml(label)}</div>
    <div class="gm-book">${book}</div>
    ${kLine}
  </div>`;
}

function sameGame(a, b) {
  if (!a || !b) return false;
  if (gameKeyOf(a) && gameKeyOf(a) === gameKeyOf(b)) return true;
  const an = [normName(a.away_team), normName(a.home_team)];
  const bn = [normName(b.away_team), normName(b.home_team)];
  const hit = (x, y) => x && y && (x === y || x.endsWith(y) || y.endsWith(x));
  return (hit(an[0], bn[0]) && hit(an[1], bn[1])) || (hit(an[0], bn[1]) && hit(an[1], bn[0]));
}

function espnGame(sample) {
  return (state.nbaIntel?.game_odds || []).find((g) => sameGame(g, sample)) || null;
}

function previewGameMarkets(sample) {
  const listed = (state.data?.games || []).find((g) => sameGame(g, sample)) || sample;
  const espn = espnGame(sample);
  const home = abbr(listed.home_team) || listed.home_team || "Home";
  const away = abbr(listed.away_team) || listed.away_team || "Away";
  const books = { ...(listed.books || {}) };
  if (espn) {
    const dk = books.draftkings || {};
    if (espn.ml_home != null || espn.ml_away != null) {
      dk.ml = { home: espn.ml_home, away: espn.ml_away };
      if (listed.ml_home == null) listed.ml_home = espn.ml_home;
      if (listed.ml_away == null) listed.ml_away = espn.ml_away;
    }
    if (espn.total_over != null || espn.total_under != null) {
      dk.total = { ...(dk.total || {}), line: espn.total ?? dk.total?.line, over: espn.total_over, under: espn.total_under };
    }
    if (espn.spread_home != null || espn.spread_away != null) {
      dk.spread = { ...(dk.spread || {}), line: espn.spread ?? dk.spread?.line, home: espn.spread_home, away: espn.spread_away };
    }
    books.draftkings = dk;
  }
  const hasBooks = Object.keys(books).length > 0;
  const n = listed.spread != null ? Number(listed.spread) : null;
  const t = listed.total != null ? Number(listed.total) : null;
  const homeSpread = n == null ? home : (n > 0 ? `${home} +${n}` : `${home} ${n}`);
  const awaySpread = n == null ? away : (n > 0 ? `${away} ${-n}` : `${away} +${Math.abs(n)}`);
  const rows = [];
  if (n != null || bestGameBook(books, "spread", "home") || bestGameBook(books, "spread", "away") || espn) {
    rows.push({
      market: "Spread",
      a: homeSpread,
      b: awaySpread,
      oa: bestGameBook(books, "spread", "home"),
      ob: bestGameBook(books, "spread", "away"),
      leanA: listed.spread_proj != null && n != null ? Number(listed.spread_proj) < n : null,
      ka: null, kb: null, kkind: "cover",
    });
  }
  if (t != null || bestGameBook(books, "total", "over") || bestGameBook(books, "total", "under") || espn) {
    rows.push({
      market: "Total",
      a: t != null ? `Over ${t}` : "Over",
      b: t != null ? `Under ${t}` : "Under",
      oa: bestGameBook(books, "total", "over"),
      ob: bestGameBook(books, "total", "under"),
      leanA: listed.total_proj != null && t != null ? Number(listed.total_proj) > t : null,
    });
  }
  const mlHome = bestGameBook(books, "ml", "home");
  const mlAway = bestGameBook(books, "ml", "away");
  if (listed.ml_home != null || listed.ml_away != null || mlHome || mlAway || espn) {
    rows.push({
      market: "Moneyline",
      a: `${home} ${listed.ml_home != null ? american(listed.ml_home) : ""}`.trim(),
      b: `${away} ${listed.ml_away != null ? american(listed.ml_away) : ""}`.trim(),
      oa: mlHome || (listed.ml_home != null ? { book: "consensus", price: listed.ml_home } : null),
      ob: mlAway || (listed.ml_away != null ? { book: "consensus", price: listed.ml_away } : null),
      leanA: listed.ml_home != null && listed.ml_away != null ? Number(listed.ml_home) < Number(listed.ml_away) : null,
    });
  }
  const k = state.data?.kalshi || {};
  const kWin = kalshiSides(k.ml, listed, "win");
  const kCov = kalshiSides(k.spread, listed, "cover");
  const winPair = (kWin.home?.dollar || 0) + (kWin.away?.dollar || 0);
  const covPair = (kCov.home?.dollar || 0) + (kCov.away?.dollar || 0);
  rows.forEach((r) => {
    if (r.market === "Moneyline") {
      r.ka = kWin.home; r.kb = kWin.away;
      r.sa = volShare(kWin.home?.dollar, winPair);
      r.sb = volShare(kWin.away?.dollar, winPair);
      r.kw = "ML";
    }
    if (r.market === "Spread") {
      r.ka = kCov.home; r.kb = kCov.away;
      r.sa = volShare(kCov.home?.dollar, covPair);
      r.sb = volShare(kCov.away?.dollar, covPair);
      r.kw = "spread";
    }
  });
  if (!rows.length) return "";
  return `<div class="preview-card">
    <h3>Game markets · best book</h3>
    <div class="gm-board">
      ${rows.map((r) => {
        let hotA = r.leanA === true;
        let hotB = r.leanA === false;
        if (r.leanA == null && r.oa?.price != null && r.ob?.price != null) {
          hotA = Number(r.oa.price) >= Number(r.ob.price);
          hotB = !hotA;
        }
        return `<div class="gm-col">
          <div class="gm-lab">${escapeHtml(r.market)}</div>
          <div class="gm-pair">
            ${marketSideCard(r.a, r.oa, hotA, r.ka, r.sa, r.kw)}
            ${marketSideCard(r.b, r.ob, hotB, r.kb, r.sb, r.kw)}
          </div>
        </div>`;
      }).join("")}
    </div>
    <div class="corr-why">${hasBooks ? "Each market is a column. Left / right inside it are the two sides. Green = lean." : "Run Update NFL Props so per-book game odds are written into the JSON."}</div>
    ${previewKalshi(sample)}
  </div>`;
}

function formatKalshiProp(m, side) {
  const raw = String(m?.title || "").replace(/\s+/g, " ").trim();
  const parts = raw.split(":");
  const player = (parts[0] || "").trim();
  let rest = (parts.slice(1).join(":") || raw).trim();
  rest = rest.replace(/^(over|under)\s+/i, "");
  rest = rest.replace(/\b([a-z])/g, (ch) => ch.toUpperCase());
  const under = /under|no/i.test(String(side || "Over"));
  const mark = under
    ? `<span class="tag under" title="Under">↓</span>`
    : `<span class="tag over" title="Over">↑</span>`;
  if (player && rest && player.toLowerCase() !== rest.toLowerCase()) {
    return `${escapeHtml(player)} ${mark} ${escapeHtml(rest)}`;
  }
  return `${mark} ${escapeHtml(raw)}`;
}

function gameTeams(sample) {
  const set = new Set();
  const bump = (t) => {
    const a = abbr(t);
    if (a && TEAM_CODE_NICK[a]) set.add(a);
  };
  bump(sample?.home_team);
  bump(sample?.away_team);
  String(sample?.game || "").split("@").forEach(bump);
  String(gameKeyOf(sample) || "").split("@").forEach(bump);
  return set;
}

function gameRosterNames(sample) {
  const teams = gameTeams(sample);
  if (teams.size < 2) return new Set();
  const names = new Set();
  const add = (name, team) => {
    const n = nameKey(name);
    const t = abbr(team);
    if (!n || !t || !teams.has(t)) return;
    names.add(n);
  };
  rowsForGame(gameKeyOf(sample)).forEach((r) => add(r.player, rowTeam(r)));
  Object.values(state.intel?.players || {}).forEach((p) => {
    add(p.full_name || p.name || p.display_name, p.team);
  });
  return names;
}

function kalshiNameMatch(title, name) {
  const t = nameKey(title);
  const n = nameKey(name);
  if (!t || !n) return false;
  if (t.includes(n)) return true;
  const toks = n.split(" ");
  if (toks.length < 2) return false;
  const first = toks[0];
  const last = toks[toks.length - 1];
  if (last.length < 4) return false;
  const initial = first[0];
  return t.includes(last) && (t.includes(`${initial} ${last}`) || t.includes(`${initial}${last}`) || t.startsWith(`${initial} `));
}

function kalshiPropsForGame(sample) {
  const list = state.data?.kalshi?.props || [];
  if (!list.length || !sample) return [];
  const roster = gameRosterNames(sample);
  if (!roster.size) return [];
  const teams = gameTeams(sample);
  return list.filter((m) => {
    const player = (m.title || "").split(":")[0];
    const key = nameKey(player);
    if (roster.has(key)) return true;
    for (const name of roster) {
      if (kalshiNameMatch(player, name)) return true;
    }
    const blob = `${m.title || ""} ${m.subtitle || ""}`.toUpperCase();
    return [...teams].some((t) => blob.includes(` ${t} `) || blob.startsWith(`${t} `));
  }).sort((a, b) => (b.dollar || 0) - (a.dollar || 0));
}

function kalshiPropsForPlayer(player) {
  const list = state.data?.kalshi?.props || [];
  const key = nameKey(player);
  if (!key) return [];
  return list.filter((m) => kalshiNameMatch(`${m.title || ""} ${m.subtitle || ""}`, player))
    .sort((a, b) => (b.dollar || 0) - (a.dollar || 0));
}

function kalshiActionNote(m, best, sample) {
  const title = nameKey(m.title);
  const match = (best || []).find((x) => {
    const n = nameKey(x.r.player);
    return n && title.includes(n);
  });
  if (match) return `Best prop: ${match.r.player} ${match.r.side} ${match.r.line ?? ""} ${match.r.stat}`;
  const script = gameScript(sample);
  if (!script) return "";
  const t = `${m.title || ""} ${m.subtitle || ""}`.toLowerCase();
  if (/rush|carry/.test(t) && nameKey(script.favName).split(" ").pop() && t.includes(nameKey(script.favName).split(" ").pop())) {
    return `Script: ${script.fav} favorite run`;
  }
  if (/(pass|rec|receiving|passing)/.test(t) && nameKey(script.dogName).split(" ").pop() && t.includes(nameKey(script.dogName).split(" ").pop())) {
    return `Script: ${script.dog} trailing pass`;
  }
  return "";
}

function previewAction(sample, best) {
  const props = kalshiPropsForGame(sample);
  if (!props.length) return "";
  const total = props.reduce((s, m) => s + (m.dollar || 0), 0);
  const script = gameScript(sample);
  const hits = props.slice(0, 8).map((m) => {
    const title = nameKey(m.title);
    const match = (best || []).find((x) => {
      const n = nameKey(x.r.player);
      return n && (title.includes(n) || title.includes(n.split(" ").pop()));
    });
    let why = "";
    if (match) why = `Also in Best Props: ${match.r.player} ${match.r.side} ${match.r.line ?? ""} ${match.r.stat}`;
    else if (script) {
      const t = `${m.title || ""} ${m.subtitle || ""}`.toLowerCase();
      if (/rush|carry/.test(t) && nameKey(script.favName).split(" ").pop() && t.includes(nameKey(script.favName).split(" ").pop())) {
        why = `Fits the script: ${script.fav} favorite should run if they lead.`;
      } else if (/(pass|rec|receiving|passing)/.test(t) && nameKey(script.dogName).split(" ").pop() && t.includes(nameKey(script.dogName).split(" ").pop())) {
        why = `Fits the script: ${script.dog} trailing and throwing.`;
      }
    }
    return { m, why, share: volShare(m.dollar, total) };
  });
  return `<div class="preview-card">
    <details class="preview-fold">
      <summary>Where the prop action is <span class="muted">${hits.length}</span></summary>
      ${hits.map(({ m, why, share }) => `<div class="preview-prop">
        <div><b>${formatKalshiProp(m, "Over")}</b>
          <div class="corr-why">Yes ${m.implied != null ? m.implied + "¢" : ""} (${american(centsToAmerican(m.implied))}) · ${moneyShort(m.dollar) || "$0"}${share != null ? ` · ${share}% of this game's Kalshi prop $` : ""}</div>
          ${why ? `<div class="corr-why">${escapeHtml(why)}</div>` : ""}
        </div>
        <span>${share != null ? share + "%" : "—"}</span>
      </div>`).join("")}
    </details>
  </div>`;
}

function previewKalshi(sample) {
  const k = state.data?.kalshi || {};
  const away = abbr(sample.away_team) || "Away";
  const home = abbr(sample.home_team) || "Home";
  const blocks = [
    ["Win", k.ml, "win"],
    ["Cover", k.spread, "cover"],
  ];
  const rows = [];
  blocks.forEach(([lab, list, kind]) => {
    const sides = kalshiSides(list, sample, kind);
    const pair = (sides.away?.dollar || 0) + (sides.home?.dollar || 0);
    [["away", away, sides.away], ["home", home, sides.home]].forEach(([, name, m]) => {
      if (!m) return;
      rows.push({
        market: lab,
        name,
        verb: kind === "cover" ? "covers" : "wins",
        cents: m.implied,
        amer: centsToAmerican(m.implied),
        dollar: m.flipped ? null : m.dollar,
        share: m.flipped ? null : volShare(m.dollar, pair),
        pts: parseKalshiPts(m),
        flipped: !!m.flipped,
      });
    });
  });
  const best = previewBest(rowsForGame(gameKeyOf(sample)));
  const allProps = kalshiPropsForGame(sample);
  const props = allProps.slice(0, 10);
  if (!rows.length && !props.length) return "";
  const table = rows.length ? `<table class="popup-table" style="margin-top:8px">
    <thead><tr><th>Bet</th><th>Price</th><th>American</th><th>$ traded</th><th>Share of that market</th></tr></thead>
    <tbody>${rows.map((r) => `<tr>
      <td><b>${escapeHtml(r.name)} ${r.verb}</b>${r.pts != null && r.market === "Cover" ? ` ${r.pts}` : ""}</td>
      <td>${r.cents != null ? r.cents + "¢" : "—"}</td>
      <td>${american(r.amer)}</td>
      <td>${r.flipped ? "same contract" : (moneyShort(r.dollar) || "—")}</td>
      <td>${r.flipped ? "No side" : (r.share != null ? r.share + "%" : "—")}</td>
    </tr>`).join("")}</tbody>
  </table>
  <div class="corr-why">Price ¢ = chance that bet hits. Share = this side’s $ vs the other side in the same market. A 13.5 alt is not the game spread.</div>` : "";
  const propPool = allProps.reduce((s, m) => s + (m.dollar || 0), 0);
  const who = escapeHtml(matchup(sample) || gameKeyOf(sample) || "this game");
  const propHtml = props.length
    ? `<div style="margin-top:10px"><b>Player props on Kalshi · Over / Yes</b>
      <div class="corr-why">${who} only · ${allProps.length} matched</div>
      <table class="popup-table">
        <thead><tr><th>Over bet</th><th>Yes ¢</th><th>American</th><th>$ traded</th><th>% of game prop $</th><th>Action</th></tr></thead>
        <tbody>${props.map((m) => `<tr>
        <td>${formatKalshiProp(m, "Over")}</td>
        <td>${m.implied != null ? m.implied + "¢" : ""}</td>
        <td>${american(centsToAmerican(m.implied))}</td>
        <td>${moneyShort(m.dollar) || "—"}</td>
        <td>${volShare(m.dollar, propPool) != null ? volShare(m.dollar, propPool) + "%" : "—"}</td>
        <td class="corr-why">${escapeHtml(kalshiActionNote(m, best, sample) || "—")}</td>
      </tr>`).join("")}</tbody></table>
      <div class="corr-why">Only players on this roster. Each row is the Over (Yes).</div></div>`
    : `<div style="margin-top:10px"><b>Player props on Kalshi</b>
      <div class="muted">No Kalshi player props matched the ${who} roster.</div></div>`;
  return `<div class="preview-card" style="margin-top:10px"><h3>Kalshi</h3>${table}${propHtml}</div>`;
}

function nbaTeam(name) {
  const intel = state.nbaIntel;
  if (!intel || !name) return null;
  const canon = canonicalNbaTeam(name) || name;
  const n = normName(canon);
  const nick = normName(name).split(" ").pop();
  return (intel.teams || []).find((t) => {
    const full = normName(t.name);
    const short = normName(t.short);
    const code = normName(t.abbr);
    return full === n || short === n || code === n || short === nick || full.endsWith(` ${nick}`);
  });
}

function nbaLineup(name) {
  const team = nbaTeam(name);
  return team ? (state.nbaIntel?.lineups || {})[team.abbr] || [] : [];
}

const NBA_LOG_CSV = "https://raw.githubusercontent.com/925Sports/nba-dfs-data/refs/heads/main/nba_game_log.csv";

function nbaDateKey(s) {
  const [m, d, y] = String(s || "").split("/").map(Number);
  if (!y || !m || !d) return 0;
  return y * 10000 + m * 100 + d;
}

function parseNbaLogCsv(text) {
  const lines = String(text || "").split(/\r?\n/);
  if (!lines.length) return {};
  const head = lines[0].split(",").map((h) => h.trim());
  const idx = Object.fromEntries(head.map((h, i) => [h, i]));
  const need = ["PLAYER", "GAME DATE", "PTS", "REB", "AST"];
  if (need.some((k) => idx[k] == null)) return {};
  const num = (v) => {
    const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : null;
  };
  const map = new Map();
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const c = lines[i].split(",");
    const name = c[idx.PLAYER];
    if (!name) continue;
    const rec = {
      date: c[idx["GAME DATE"]] || "",
      team: c[idx.TEAM] || "",
      opp: c[idx["MATCH UP"]] || "",
      min: c[idx.MIN] || "",
      pts: num(c[idx.PTS]),
      reb: num(c[idx.REB]),
      ast: num(c[idx.AST]),
      stl: num(c[idx.STL]),
      blk: num(c[idx.BLK]),
      to: num(c[idx.TOV]),
      fg3: num(c[idx["3sPM"]]),
      fp: num(c[idx.FP]),
    };
    const key = normName(name);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(rec);
  }
  const out = {};
  map.forEach((rows, key) => {
    rows.sort((a, b) => nbaDateKey(b.date) - nbaDateKey(a.date));
    out[key] = rows.slice(0, 10);
  });
  return out;
}

async function loadNbaLogs() {
  if (state.nbaLogMap || state.nbaLogLoading) return state.nbaLogMap || {};
  state.nbaLogLoading = true;
  try {
    const res = await fetch(NBA_LOG_CSV, { cache: "no-cache" });
    if (!res.ok) throw new Error(String(res.status));
    state.nbaLogMap = parseNbaLogCsv(await res.text());
  } catch (_) {
    state.nbaLogMap = {};
  }
  state.nbaLogLoading = false;
  if (state.section === "preview") renderPreview();
  if (!$("popup")?.hidden && state.popupKey) {
    const [player, eventId, market, side] = state.popupKey.split("|");
    if (player) openPlayerPopup(player, eventId, market, side);
  }
  return state.nbaLogMap;
}

function nbaLogs(name) {
  const key = normName(name);
  const fromCsv = state.nbaLogMap?.[key];
  if (fromCsv?.length) return fromCsv;
  return (state.nbaIntel?.logs || {})[key] || [];
}

function nbaSameTeam(name, team) {
  const hit = nbaTeam(name);
  const other = nbaTeam(team);
  if (hit && other) return hit.abbr === other.abbr;
  const a = normName(canonicalNbaTeam(name) || name);
  const b = normName(canonicalNbaTeam(team) || team);
  return a && b && (a === b || a.endsWith(b) || b.endsWith(a));
}

function nbaInjuriesFor(sample) {
  return (state.nbaIntel?.injuries || []).filter((i) => nbaSameTeam(sample.away_team, i.team) || nbaSameTeam(sample.home_team, i.team));
}

function nbaNewsFor(sample) {
  const away = nbaTeam(sample.away_team);
  const home = nbaTeam(sample.home_team);
  const tokens = [
    sample.away_team, sample.home_team,
    canonicalNbaTeam(sample.away_team), canonicalNbaTeam(sample.home_team),
    away?.name, home?.name, away?.short, home?.short, away?.abbr, home?.abbr,
  ].filter(Boolean).map((s) => String(s).toLowerCase());
  return (state.nbaIntel?.news || []).filter((n) => {
    const blob = `${n.headline || ""} ${n.description || ""} ${(n.categories || []).join(" ")}`.toLowerCase();
    return tokens.some((t) => t.length > 2 && blob.includes(t));
  }).slice(0, 6);
}

function dvpCell(cell) {
  if (!cell) return "—";
  const soft = cell.rank <= Math.ceil(cell.of / 3);
  const tough = cell.rank > Math.ceil((cell.of * 2) / 3);
  const cls = soft ? "pct good" : tough ? "pct bad" : "";
  return `<span class="${cls}">${cell.avg}</span> <span class="line-note">${cell.rank}/${cell.of}</span>`;
}

function previewNba(sample) {
  if (sportOf(sample) !== "NBA") return "";
  if (!state.nbaIntel) {
    return `<div class="preview-card"><h3>Lineups, DVP, injuries</h3><div class="muted">The NBA feed did not load. Publish data/nba-intel.json with the page.</div></div>`;
  }
  const sides = [
    { name: sample.away_team, team: nbaTeam(sample.away_team) },
    { name: sample.home_team, team: nbaTeam(sample.home_team) },
  ];
  const lineup = (side) => {
    const rows = nbaLineup(side.name);
    if (!rows.length) return `<div class="muted">No projected lineup yet.</div>`;
    return rows.map((p) => {
      const log = nbaLogs(p.name)[0];
      const last = log ? `${log.pts ?? "—"}/${log.reb ?? "—"}/${log.ast ?? "—"} vs ${log.opp || ""}` : "no recent log";
      return `<div class="preview-prop">
        <div class="player-row">${headshotTag(p.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(p.name)}">${escapeHtml(p.name)}</button></div>
        <div><span class="tag">${escapeHtml(p.pos)}</span><div class="corr-why">${escapeHtml(last)}</div></div>
      </div>`;
    }).join("");
  };
  const dvpTable = (side) => {
    const abbr = side.team?.abbr;
    const board = abbr ? state.nbaIntel.dvp?.[abbr] : null;
    if (!board) return `<div class="muted">No DVP yet.</div>`;
    const rows = ["G", "F", "C"].map((pos) => {
      const slot = board.pos?.[pos] || {};
      return `<tr><td>${pos}</td><td>${dvpCell(slot.pts)}</td><td>${dvpCell(slot.reb)}</td><td>${dvpCell(slot.ast)}</td></tr>`;
    }).join("");
    return `<table class="popup-table">
      <thead><tr><th>Pos</th><th>Pts</th><th>Reb</th><th>Ast</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="corr-why">${board.games || 0} games. Rank 1 allows the most. Green is a soft matchup.</div>`;
  };
  const logs = sides.map((side) => {
    const rows = nbaLineup(side.name).map((p) => {
      const games = nbaLogs(p.name).slice(0, 5);
      if (!games.length) return "";
      return `<div class="preview-prop">
        <b>${escapeHtml(p.name)}</b> <span class="tag">${escapeHtml(p.pos)}</span>
        <div class="corr-why">${games.map((g) => `${g.opp || "?"} ${g.pts ?? "—"}/${g.reb ?? "—"}/${g.ast ?? "—"}`).join(" · ")}</div>
      </div>`;
    }).join("");
    return `<div><h3>${escapeHtml(side.team?.abbr || side.name || "")}</h3>${rows || `<div class="muted">No starter logs yet.</div>`}</div>`;
  }).join("");
  return `<div class="preview-grid">
    ${sides.map((side) => `<div class="preview-card"><h3>Projected starting five · ${escapeHtml(side.team?.abbr || side.name || "")}</h3>${lineup(side)}</div>`).join("")}
  </div>
  <div class="preview-grid">
    ${sides.map((side) => `<div class="preview-card"><h3>DVP allowed · ${escapeHtml(side.team?.abbr || side.name || "")}</h3>${dvpTable(side)}</div>`).join("")}
  </div>
  <div class="preview-card"><h3>Starter logs</h3><div class="preview-grid">${logs}</div></div>`;
}

function previewHotCold(rows) {
  const scored = (rows || [])
    .filter((r) => r.dfs?.prizepicks && hitPct(r) != null)
    .map((r) => ({ r, pct: hitPct(r) }));
  const hot = scored.filter((x) => x.pct >= 56).sort((a, b) => b.pct - a.pct).slice(0, 8);
  const cold = scored.filter((x) => x.pct <= 48).sort((a, b) => a.pct - b.pct).slice(0, 8);
  const line = (x, kind) => `<div class="preview-prop">
    <div class="player-row">${headshotTag(x.r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(x.r.player)}" data-eid="${escapeHtml(x.r.event_id || "")}" data-market="${escapeHtml(x.r.market || "")}" data-side="${escapeHtml(x.r.side)}">${escapeHtml(x.r.player)}</button>
      ${sideTag(x.r.side)} <span class="line-num">${x.r.line ?? ""}</span> ${escapeHtml(x.r.stat)}</div>
    <span class="${kind === "hot" ? "pct good" : "pct bad"}">${x.pct.toFixed(1)}%</span>
  </div>`;
  if (!hot.length && !cold.length) return "";
  return `<div class="preview-grid">
    <div class="preview-card"><h3>Hot hit rates</h3>
      <div class="corr-why">PrizePicks sheet hit rate, 56% or better.</div>
      ${hot.length ? hot.map((x) => line(x, "hot")).join("") : `<div class="muted">None on this game.</div>`}
    </div>
    <div class="preview-card"><h3>Cold hit rates</h3>
      <div class="corr-why">Same sheet, 48% or worse.</div>
      ${cold.length ? cold.map((x) => line(x, "cold")).join("") : `<div class="muted">None on this game.</div>`}
    </div>
  </div>`;
}

function previewNews(sample) {
  const rows = rowsForGame(gameKeyOf(sample));
  const names = rows.map((r) => String(r.player || "").toLowerCase()).filter(Boolean);
  const tokens = [sample.away_team, sample.home_team, abbr(sample.away_team), abbr(sample.home_team)]
    .filter(Boolean).map((s) => String(s).toLowerCase());
  return (state.intel?.news || []).filter((n) => {
    const blob = `${n.headline || ""} ${n.description || ""}`.toLowerCase();
    if (tokens.some((t) => t.length > 2 && blob.includes(t))) return true;
    return names.some((nm) => nm && blob.includes(nm));
  }).slice(0, 8);
}

function injuryItem(r) {
  return `<div class="preview-inj">
    <button type="button" class="preview-inj-head" data-inj="1">
      <div class="player-row">${headshotTag(r.headshot)}
        <div>
          <span class="player">${escapeHtml(r.name || "")}</span>
          <div class="corr-why">${escapeHtml(r.pos || "")}</div>
        </div>
      </div>
      ${injPill({ status: r.report_status, injury: r.report_injury }) || "—"}
    </button>
    <div class="preview-inj-body" hidden>
      <div>${escapeHtml(r.report_injury || r.practice_injury || "No injury detail")}</div>
      <div class="corr-why">${escapeHtml(r.practice_status || r.report_injury || "")}</div>
      <button type="button" class="player-btn" data-player="${escapeHtml(r.name || "")}">Open ${escapeHtml(r.name || "")}</button>
    </div>
  </div>`;
}

function renderPreview() {
  const wrap = $("previewWrap");
  if (!wrap) return;
  wrap.style.display = state.section === "preview" ? "block" : "none";
  if (state.section !== "preview") return;
  const games = upcomingGames();
  const q = ($("q")?.value || "").trim().toLowerCase();
  const shown = games.filter((g) => !q || `${g.game} ${g.away_team} ${g.home_team} ${g.sport}`.toLowerCase().includes(q));
  if (!state.previewGame || !shown.some((g) => gameKeyOf(g) === state.previewGame)) {
    state.previewGame = shown[0] ? gameKeyOf(shown[0]) : "";
  }
  $("previewList").innerHTML = shown.map((g) => {
    const key = gameKeyOf(g);
    const on = key === state.previewGame ? "on" : "";
    return `<button type="button" class="preview-game ${on}" data-game="${escapeHtml(key)}">
      <b>${escapeHtml(matchup(g) || key)}</b>
      <span>${escapeHtml(g.sport || "")} · ${escapeHtml(fmtWhen(g.commence_time))}</span>
    </button>`;
  }).join("") || `<div class="empty">No upcoming games.</div>`;
  const sample = shown.find((g) => gameKeyOf(g) === state.previewGame);
  const main = $("previewMain");
  if (!sample) {
    main.innerHTML = `<div class="empty" id="previewEmpty">Pick a game to open the preview.</div>`;
    $("count").textContent = `${shown.length} games`;
    return;
  }
  const rows = rowsForGame(state.previewGame);
  const best = previewBest(rows);
  const corr = previewCorrelates(rows, sample);
  const inj = sportOf(sample) === "NBA" ? nbaInjuriesFor(sample).map((r) => ({
    name: r.name, team: r.team, pos: r.pos, headshot: r.headshot,
    report_status: r.status, report_injury: r.injury || r.detail, practice_status: r.detail,
  })) : previewInjuries(sample);
  const news = sportOf(sample) === "NBA" ? nbaNewsFor(sample) : previewNews(sample);
  const listed = (state.data?.games || []).find((g) =>
    gameKeyOf(g) === gameKeyOf(sample) || (g.home_team === sample.home_team && g.away_team === sample.away_team)
  ) || sample;
  const homeAbbr = abbr(sample.home_team);
  const wxRow = rows.find((r) => r.weather || r.venue_name || r.venue_type) || sample;
  const loc = STADIUMS[homeAbbr] || wxRow.venue_name || `${sample.home_team || "Home"} stadium`;
  const wx = [wxRow.venue_type, wxRow.weather, wxRow.temp != null ? `${wxRow.temp}°` : ""].filter(Boolean).join(" · ");
  const sportKey = String(sample.sport || "").toLowerCase();
  const lineBits = [
    sample.spread != null ? `<div class="preview-chip"><b>Spread</b>${escapeHtml(scriptLine(sample).split(" · ")[0] || String(sample.spread))}</div>` : "",
    sample.total != null ? `<div class="preview-chip"><b>Total</b>O/U ${Number(sample.total)}</div>` : "",
    listed.ml_away != null || listed.ml_home != null ? `<div class="preview-chip"><b>Moneyline</b>${escapeHtml(abbr(sample.away_team))} ${american(listed.ml_away)} · ${escapeHtml(abbr(sample.home_team))} ${american(listed.ml_home)}</div>` : "",
    sample.spread_proj != null ? `<div class="preview-chip"><b>Spread proj</b>${sample.spread_proj}</div>` : "",
    sample.total_proj != null ? `<div class="preview-chip"><b>Total proj</b>${sample.total_proj}</div>` : "",
  ].join("");
  main.innerHTML = `
    <div class="preview-hero" data-sport="${escapeHtml(sportKey)}">
      <div class="sport-tag">${escapeHtml(sample.sport || "")}</div>
      <h2>${escapeHtml(matchup(sample) || state.previewGame)}</h2>
      <div class="game">${escapeHtml(fmtWhen(sample.commence_time))}${sample.broadcasts ? ` · ${escapeHtml(sample.broadcasts)}` : ""}</div>
      <div class="script">${venueIcon(wxRow)} ${escapeHtml(loc)}${wx ? ` · ${weatherIcon(wxRow)} ${escapeHtml(wx)}` : ""}</div>
      <div class="preview-lines">${lineBits || `<span class="muted">No consensus game line yet</span>`}</div>
    </div>
    ${previewGameMarkets(sample)}
    ${previewNba(sample)}
    ${previewHotCold(rows)}
    ${previewAction(sample, best)}
    <div class="preview-grid">
      <div class="preview-card">
        <h3>Best props</h3>
        ${best.length ? best.map(({ r, edge }) => `<div class="preview-prop">
          <div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">${escapeHtml(r.player)}</button>
            ${sideTag(r.side)} <span class="line-num">${r.line ?? ""}</span> ${escapeHtml(r.stat)}</div>
          <span class="${edgeClass(edge)}">${edge == null ? (hitPct(r) != null ? hitPct(r).toFixed(1) + "%" : "—") : `${edge > 0 ? "+" : ""}${edge.toFixed(1)}`}</span>
        </div>`).join("") : `<div class="muted">No standard PP props with a hit rate yet.</div>`}
      </div>
      <div class="preview-card">
        <h3>Correlated ideas</h3>
        ${corr.length ? corr.map((p) => `<div class="preview-corr">
          <div>
            <button type="button" class="player-btn" data-player="${escapeHtml(p.a.player)}" data-eid="${escapeHtml(p.a.event_id || "")}" data-market="${escapeHtml(p.a.market || "")}" data-side="${escapeHtml(p.a.side)}">${escapeHtml(p.a.player)} ${escapeHtml(p.a.side)} ${p.a.line ?? ""} ${escapeHtml(p.a.stat)}</button>
            <div class="corr-why">+ ${escapeHtml(p.b.player)} ${escapeHtml(p.b.side)} ${p.b.line ?? ""} ${escapeHtml(p.b.stat)}</div>
            <div class="corr-why">${escapeHtml(p.why)}</div>
          </div>
        </div>`).join("") : `<div class="muted">Not enough overlapping stats to build stacks yet.</div>`}
      </div>
    </div>
    ${previewUsage(sample)}
    <div class="preview-grid">
      ${sportOf(sample) === "NBA" ? [
        { name: sample.away_team, rows: inj.filter((r) => nbaSameTeam(sample.away_team, r.team)) },
        { name: sample.home_team, rows: inj.filter((r) => nbaSameTeam(sample.home_team, r.team)) },
      ].map((side) => `<div class="preview-card">
        <h3>Injuries · ${escapeHtml(nbaTeam(side.name)?.abbr || side.name || "")}</h3>
        ${side.rows.length ? side.rows.map(injuryItem).join("") : `<div class="muted">${state.nbaIntel ? "No injury rows for this team." : "NBA injury feed did not load."}</div>`}
      </div>`).join("") : `<div class="preview-card">
        <h3>Injuries / availability <span class="muted" style="font-weight:400;font-size:12px">${escapeHtml(intelStamp())}</span></h3>
        ${inj.length ? inj.map(injuryItem).join("") : `<div class="muted">${sample.sport === "NFL" || !sample.sport ? "No matching injury rows." : "Injury feed is NFL-only right now."}</div>`}
      </div>`}
      <div class="preview-card">
        <h3>News</h3>
        ${news.length ? news.map((n) => `<div class="preview-prop">
          <div><a class="player-btn" href="${escapeHtml(n.url || "#")}" target="_blank" rel="noopener">${escapeHtml(n.headline || "")}</a>
          <div class="corr-why">${escapeHtml(n.source || "")} · ${escapeHtml(n.published || "")}</div></div>
        </div>`).join("") : `<div class="muted">${sportOf(sample) === "NBA" && !state.nbaIntel ? "NBA news feed did not load." : "No tagged headlines for this matchup."}</div>`}
      </div>
    </div>`;
  $("count").textContent = `${shown.length} games · ${rows.length} props`;
  $("updated").textContent = `Updated ${fmtWhen(state.data?.updated)} · BE ${breakEven()}%`;
}

function showSectionWraps() {
  const intel = ["news", "injuries", "logs"].includes(state.section);
  const propsWrap = $("propsWrap");
  const books = document.querySelector(".books-bar");
  const filt = document.querySelector(".filters");
  const arbWrap = $("arbStakeWrap");
  if (arbWrap) arbWrap.hidden = state.view !== "arb" || state.section !== "props";
  if (propsWrap) propsWrap.style.display = state.section === "props" && state.layout !== "cards" ? "block" : "none";
  const cards = $("cardGrid");
  if (cards) {
    const on = state.section === "props" && state.layout === "cards";
    cards.hidden = !on;
    cards.style.display = on ? "grid" : "none";
    if (!on) cards.innerHTML = "";
  }
  const slip = $("slipPanel");
  if (slip) slip.hidden = state.section !== "slip";
  const bets = $("betsPanel");
  if (bets) bets.hidden = state.section !== "bets";
  ["previewWrap", "gamesWrap", "volumeWrap", "newsWrap", "injWrap", "logsWrap", "stacksWrap"].forEach((id) => {
    const el = $(id);
    if (el) el.style.display = "none";
  });
  if (books) books.style.display = state.section === "props" ? "flex" : "none";
  if (filt) [...filt.querySelectorAll("select, label, input")].forEach((el) => {
    if (el.id === "sport" || el.id === "section" || el.id === "q") return;
    if (el.id === "when") {
      el.style.display = intel || state.section === "stacks" ? "none" : "";
      return;
    }
    el.style.display = intel || ["games", "stacks", "preview", "volume", "slip", "bets"].includes(state.section) ? "none" : "";
  });
}

function indexKalshi() {
  const byFull = new Map();
  const byLast = new Map();
  (state.data?.kalshi?.props || []).forEach((m) => {
    const playerPart = nameKey((m.title || "").split(":")[0]);
    if (!playerPart) return;
    if (!byFull.has(playerPart)) byFull.set(playerPart, []);
    byFull.get(playerPart).push(m);
    const last = playerPart.split(" ").pop();
    if (!last) return;
    if (!byLast.has(last)) byLast.set(last, []);
    byLast.get(last).push(m);
  });
  state.kalshiByFull = byFull;
  state.kalshiByLast = byLast;
}

function bestBookEdge(row) {
  const TRAD = ["draftkings", "fanduel", "betmgm", "williamhill_us", "betrivers", "espnbet", "bovada", "hardrockbet", "pinnacle"];
  const fair = exchangeFair(row, "");
  if (fair == null || fair < 15 || fair > 85) return null;
  const pack = fairQuotes(row, "");
  if (pack.nBooks < 2 || pack.split) return null;
  const rowLine = Number(row.line);
  let best = null;
  TRAD.forEach((k) => {
    const b = row.books?.[k];
    if (!b || b.price == null) return;
    if (b.line != null && Math.abs(Number(b.line) - rowLine) > 0.6) return;
    const px = Number(b.price);
    if (!Number.isFinite(px) || px > 250 || px < -300) return;
    const ip = bookImplied(px);
    if (ip == null || ip < 20 || ip > 80) return;
    const edge = +(fair - ip).toFixed(1);
    if (edge > 8 || edge < -5) return;
    if (!best || edge > best.edge) best = { book: k, price: px, ip, edge, fair };
  });
  return best && best.edge > 1 ? best : null;
}

function arbPairs(rows) {
  const groups = new Map();
  rows.forEach((r) => {
    if (!r.player || r.line == null) return;
    const key = `${nameKey(r.player)}|${r.stat}|${r.line}|${gameKeyOf(r)}`;
    if (!groups.has(key)) groups.set(key, { over: null, under: null, sample: r });
    const g = groups.get(key);
    if (String(r.side).toLowerCase() === "over") g.over = r;
    else if (String(r.side).toLowerCase() === "under") g.under = r;
  });
  const out = [];
  const TRAD = ["draftkings", "fanduel", "betmgm", "williamhill_us", "betrivers", "espnbet", "bovada", "hardrockbet", "pinnacle", "novig", "prophetx"];
  groups.forEach((g) => {
    if (!g.over || !g.under) return;
    let bestOver = null, bestUnder = null;
    TRAD.forEach((k) => {
      const o = g.over.books?.[k];
      const u = g.under.books?.[k];
      if (o?.price != null && Math.abs(Number(o.price)) < 400 && Math.abs(Number(o.price)) >= 100) {
        const ip = bookImplied(o.price);
        if (ip != null && (!bestOver || ip < bestOver.ip)) bestOver = { book: k, price: o.price, ip };
      }
      if (u?.price != null && Math.abs(Number(u.price)) < 400 && Math.abs(Number(u.price)) >= 100) {
        const ip = bookImplied(u.price);
        if (ip != null && (!bestUnder || ip < bestUnder.ip)) bestUnder = { book: k, price: u.price, ip };
      }
    });
    if (!bestOver || !bestUnder || bestOver.book === bestUnder.book) return;
    const sum = bestOver.ip + bestUnder.ip;
    if (sum >= 99.5 || sum < 96) return;
    const arb = +(100 - sum).toFixed(2);
    const overStake = +(bestOver.ip / sum * 100).toFixed(1);
    const underStake = +(bestUnder.ip / sum * 100).toFixed(1);
    out.push({ ...g.sample, over: bestOver, under: bestUnder, arb, overStake, underStake });
  });
  return out.sort((a, b) => b.arb - a.arb);
}

function viewOffer(row) {
  const dfsView = { pp: "prizepicks", ud: "underdog", pick6: "pick6", dabble: "dabble", betr: "betr" };
  const v = state.view;
  if (dfsView[v]) {
    const src = bookOffer(row, dfsView[v]);
    if (src) return { bookKey: dfsView[v], line: src.line ?? row.line, price: src.price };
  }
  if (v === "ev" || v === "all") {
    const src = bookOffer(row, "prizepicks");
    if (src) return { bookKey: "prizepicks", line: src.line ?? displayLine(row), price: src.price };
  }
  if (v === "novig" || v === "prophetx" || v === "kalshi" || v === "polymarket") {
    const src = bookOffer(row, v);
    if (src) return { bookKey: v, line: src.line ?? row.line, price: src.price };
  }
  if (v === "books") {
    const best = bestBookEdge(row);
    if (best) return { bookKey: best.book, line: row.line, price: best.price };
  }
  return { bookKey: "board", line: displayLine(row) ?? row.line, price: null };
}

function pickId(p) {
  return [normName(p.player), normName(p.stat), String(p.side || "").toLowerCase(), String(p.line), p.bookKey].join("|");
}

function pickFromRow(row, offer) {
  const bookKey = offer?.bookKey || "board";
  const meta = BOOK_BY_KEY[bookKey];
  return {
    player: row.player || "",
    stat: row.stat || "",
    side: row.side || "",
    line: offer?.line ?? row.line,
    bookKey,
    book: meta?.name || (bookKey === "board" ? "Shown line" : bookKey),
    price: offer?.price ?? null,
    sport: row.sport || "",
    game: matchup(row),
    when: row.commence_time || "",
    headshot: row.headshot || "",
  };
}

function savePicks() {
  try { localStorage.setItem("ev_my_bets", JSON.stringify(state.picks)); } catch (_) {}
}

function restorePicks() {
  try {
    const saved = JSON.parse(localStorage.getItem("ev_my_bets") || "[]");
    state.picks = Array.isArray(saved) ? saved.filter((p) => p && p.player) : [];
  } catch (_) {
    state.picks = [];
  }
}

function updateBetsTab() {
  const tab = document.querySelector('.tab[data-section="bets"]');
  if (tab) tab.textContent = state.picks.length ? `My Bets (${state.picks.length})` : "My Bets";
}

function togglePick(pick) {
  if (!pick?.player) return;
  const id = pickId(pick);
  const had = state.picks.some((p) => p.id === id);
  state.picks = had ? state.picks.filter((p) => p.id !== id) : state.picks.concat([{ ...pick, id }]);
  savePicks();
  updateBetsTab();
  toast(had ? "Removed from My Bets" : "Added to My Bets");
  if (state.section === "bets") renderBets();
  else if (state.section === "props") render();
  if (!$("popup")?.hidden && state.popupKey) {
    const [player, eventId, market, side] = state.popupKey.split("|");
    if (player) openPlayerPopup(player, eventId, market, side);
  }
}

function likeButton(pick, kind) {
  const id = pickId(pick);
  const on = state.picks.some((p) => p.id === id);
  const text = kind === "hero" ? (on ? "On My Bets" : "Add to My Bets") : kind === "row" ? (on ? "Saved" : "+ bet") : (on ? "✓" : "+");
  const cls = kind === "row" ? "bet-add" : kind === "hero" ? "like-btn" : "like-line";
  return `<button type="button" class="${cls}${on ? " on" : ""}" data-pick="${encodeURIComponent(JSON.stringify(pick))}">${text}</button>`;
}

function renderBets() {
  updateBetsTab();
  const grid = $("betsGrid");
  const empty = $("betsEmpty");
  const rows = state.picks || [];
  if (empty) empty.style.display = rows.length ? "none" : "block";
  if (!grid) return;
  grid.innerHTML = rows.map((p, i) => {
    const sideClass = p.side === "Over" || p.side === "Yes" ? "over" : "under";
    const meta = BOOK_BY_KEY[p.bookKey];
    return `<article class="bet-card">
      <div class="who">${headshotTag(p.headshot)}<span>${escapeHtml(p.player)}</span></div>
      <div class="play"><span class="tag ${sideClass}">${escapeHtml(p.side || "")}</span><span class="num">${p.line ?? ""}</span></div>
      <div class="stat">${escapeHtml(p.stat || "")}</div>
      <div class="where">${meta ? bookMark(meta, "sm") + " " : ""}${escapeHtml(p.book || "")}${p.price != null ? ` · ${american(p.price)}` : ""}</div>
      <div class="where">${escapeHtml(p.sport || "")}${p.game ? ` · ${escapeHtml(p.game)}` : ""}${p.when ? ` · ${escapeHtml(fmtWhen(p.when))}` : ""}</div>
      <button type="button" class="book-pick drop" data-bet-i="${i}">Remove</button>
    </article>`;
  }).join("");
  $("count").textContent = `${rows.length} saved bet${rows.length === 1 ? "" : "s"}`;
}

function render(full) {
  if (!state.data && !state.intel) return;
  syncTabs();
  showSectionWraps();
  if (full || !state.uiReady) {
    const all = state.data?.props || [];
    fillWhen(all);
    if (state.data) {
      $("updated").textContent = isPricedView()
        ? `Updated ${fmtWhen(state.data.updated)} · fair vs price`
        : `Updated ${fmtWhen(state.data.updated)} · BE ${breakEven()}%`;
      const sport = ($("sport")?.value || state.sport || "all").toLowerCase();
      const pool = sport === "all" ? all : all.filter((r) => String(r.sport || "").toLowerCase() === sport);
      fillGameAndTeam(pool);
      fillStats(pool);
    }
    renderBookPicks();
    renderHead();
    indexKalshi();
    renderTicker();
    state.uiReady = true;
  }
  const sec = state.section;
  if (sec === "slip") { renderSlip(); return; }
  if (sec === "bets") { renderBets(); return; }
  if (sec === "preview") { renderPreview(); return; }
  if (sec === "games") { renderGames(); return; }
  if (sec === "volume") { renderVolume(); return; }
  if (sec === "news") { renderNews(); return; }
  if (sec === "injuries") { renderInjuries(); return; }
  if (sec === "logs") { renderLogs(); return; }
  if (sec === "stacks") { renderStacks(); return; }
  if (sec !== "props") return;
  if (!state.data) return;
  const all = state.liveProps || state.data.props || [];

  if (state.view === "books") {
    const hits = all.map((r) => ({ r, best: bestBookEdge(r) })).filter((x) => x.best && x.best.edge > 0.5);
    hits.sort((a, b) => b.best.edge - a.best.edge);
    $("count").textContent = `${hits.length} books edges`;
    $("empty").style.display = hits.length ? "none" : "block";
    $("empty").textContent = "No book is beating the market right now.";
    $("headrow").innerHTML = `<th>Player</th><th>Stat</th><th>Line</th><th>Book</th><th>Price</th><th>Fair</th><th>Edge</th>`;
    $("tbody").innerHTML = hits.slice(0, 200).map(({ r, best }) => {
      const meta = BOOK_BY_KEY[best.book];
      return `<tr>
        <td><div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">${escapeHtml(r.player)}${posTag(r)}</button></div>
          <div class="game"><span class="sport-tag ${escapeHtml(String(r.sport || "").toLowerCase())}">${escapeHtml(r.sport || "")}</span> ${escapeHtml(matchup(r))}</div></td>
        <td>${escapeHtml(r.stat)}</td>
        <td class="line-cell"><div class="line-stack">${sideTag(r.side)}<div class="line-num">${r.line ?? ""}</div></div></td>
        <td>${meta ? bookMark(meta, "sm") + " " + escapeHtml(meta.name) : best.book}</td>
        <td>${american(best.price)}</td>
        <td>${best.fair}%${r.avg_line != null ? `<div class="line-note">mkt ${r.avg_line}</div>` : ""}</td>
        <td><span class="pct good">+${best.edge}</span><div class="line-note">${sportsbookCount(r)} books</div></td>
      </tr>`;
    }).join("");
    return;
  }

  if (state.view === "arb") {
    const wrap = $("arbStakeWrap");
    if (wrap) wrap.hidden = false;
    const pairs = arbPairs(all);
    const stake = Number($("arbStake")?.value || 10);
    $("count").textContent = `${pairs.length} arbs`;
    $("empty").style.display = pairs.length ? "none" : "block";
    $("empty").textContent = "No arbitrage pairs right now.";
    $("headrow").innerHTML = `<th>Player</th><th>Stat</th><th>Line</th><th>Over</th><th>Under</th><th>Arb</th><th>$ on Over</th><th>$ on Under</th><th>Profit</th>`;
    $("tbody").innerHTML = pairs.slice(0, 100).map((p) => {
      const om = BOOK_BY_KEY[p.over.book];
      const um = BOOK_BY_KEY[p.under.book];
      const overDol = +(stake * p.overStake / 100).toFixed(2);
      const underDol = +(stake * p.underStake / 100).toFixed(2);
      const profit = +(stake * p.arb / 100).toFixed(2);
      return `<tr>
        <td><div class="player-row">${headshotTag(p.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(p.player)}" data-eid="${escapeHtml(p.event_id || "")}" data-market="${escapeHtml(p.market || "")}" data-side="Over">${escapeHtml(p.player)}${posTag(p)}</button></div>
          <div class="game"><span class="sport-tag ${escapeHtml(String(p.sport || "").toLowerCase())}">${escapeHtml(p.sport || "")}</span> ${escapeHtml(matchup(p))}</div></td>
        <td>${escapeHtml(p.stat)}</td>
        <td class="line-num">${p.line ?? ""}</td>
        <td>${om ? bookMark(om, "sm") : ""} ${american(p.over.price)}</td>
        <td>${um ? bookMark(um, "sm") : ""} ${american(p.under.price)}</td>
        <td><span class="pct good">${p.arb}%</span></td>
        <td>$${overDol}</td>
        <td>$${underDol}</td>
        <td><span class="pct good">$${profit}</span></td>
      </tr>`;
    }).join("");
    return;
  }

  const rows = sortRows(collapseOffers(applyFilters(all)));
  const cap = 200;
  const view = rows.slice(0, cap);
  $("count").textContent = rows.length > cap ? `${cap} of ${rows.length.toLocaleString()} shown` : `${rows.length.toLocaleString()} shown`;

  if (!rows.length) {
    $("tbody").innerHTML = "";
    $("empty").style.display = "block";
    const emptyMsg = state.view === "pick6"
      ? "Pick6 has no lines on this slate yet."
      : state.view === "dabble"
        ? (all.some((r) => pickemQuote(r, "dabble"))
          ? "No Dabble line clears this min edge. Lower Min edge, or search a player."
          : "Dabble has no priced lines on this slate. Combo rows use dabble_au or dabble_us_dfs.")
        : state.view === "betr"
          ? (all.some((r) => pickemQuote(r, "betr"))
            ? "No Betr line clears this min edge. Lower Min edge, or search a player."
            : "Betr is not in this slate. The combo sheet needs bookmaker betr_au or betr_us_dfs. BetRight is a different book and is not used.")
          : state.view === "polymarket"
            ? "No Polymarket price that a traditional book also posts at that line."
            : state.view === "kalshi"
              ? "No Kalshi contract matched to a traditional book line."
              : "No rows match these filters.";
    $("empty").textContent = emptyMsg;
    return;
  }
  $("empty").style.display = "none";
  setLayout(state.layout);
  if (state.layout === "cards") {
    const grid = $("cardGrid");
    if (grid) grid.innerHTML = playerCards(view);
    return;
  }
  const cols = visibleBooks();
  $("tbody").innerHTML = view.map((r) => {
    const sideClass = r.side === "Over" || r.side === "Yes" ? "over" : (r.side === "Under" || r.side === "No" ? "under" : "");
    const lineTxt = displayLine(r);
    const edge = rowEdge(r);
    return `
      <tr>
        <td>
          <div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">${escapeHtml(r.player)}${posTag(r)}</button>${venueIcon(r)}${weatherIcon(r)}${flagIcons(r)}</div>
          <div class="game"><span class="sport-tag ${escapeHtml(String(r.sport || "").toLowerCase())}">${escapeHtml(r.sport || "")}</span> ${escapeHtml(matchup(r))} · ${escapeHtml(fmtWhen(r.commence_time))}</div>
          <div class="script">${scriptLine(r)}${r.broadcasts ? ` · ${escapeHtml(r.broadcasts)}` : ""}</div>
        </td>
        <td>${escapeHtml(r.stat)}</td>
        <td class="line-cell"><div class="line-stack"><span class="tag ${sideClass}">${escapeHtml(r.side)}</span><div class="line-num">${lineTxt ?? "—"}</div>${fantasyNote(r)}</div></td>
        <td>${tierBadge(r)}</td>
        <td><span class="${pctClass(hitPct(r))}">${hitPct(r) != null ? hitPct(r).toFixed(1) + "%" : "—"}</span></td>
        <td class="${edge >= 0 ? "" : "muted"}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}${edgeNote(r)}${r.dfs?.prizepicks ? `<button type="button" class="slip-add" data-eid="${escapeHtml(r.event_id || "")}" data-player="${escapeHtml(r.player)}" data-stat="${escapeHtml(r.stat)}" data-line="${r.line ?? ""}" data-side="${escapeHtml(r.side)}">+ slip</button>` : ""}${likeButton(pickFromRow(r, viewOffer(r)), "row")}</td>
        ${bestCell(r)}
        ${cols.map((b) => bookCell(r, b.key)).join("")}
      </tr>`;
  }).join("");
}

function setLayout(mode) {
  state.layout = mode === "cards" ? "cards" : "table";
  localStorage.setItem("ev_layout", state.layout);
  document.querySelectorAll(".layout-btn").forEach((b) => b.classList.toggle("on", b.dataset.layout === state.layout));
  showSectionWraps();
}

function playerCards(rows) {
  const groups = new Map();
  rows.forEach((r) => {
    const key = nameKey(r.player);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  });
  const cards = [...groups.values()].map((list) => {
    list.sort((a, b) => (rowEdge(b) ?? -99) - (rowEdge(a) ?? -99));
    return { best: rowEdge(list[0]), list };
  }).sort((a, b) => (b.best ?? -99) - (a.best ?? -99));
  return cards.slice(0, 80).map(({ list }) => {
    const top = list[0];
    const lines = list.slice(0, 8).map((r) => {
      const edge = rowEdge(r);
      const offer = viewOffer(r);
      const meta = BOOK_BY_KEY[offer.bookKey];
      return `<div class="pline" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">
        <div class="pline-main">${sideTag(r.side)} <span class="pline-stat">${escapeHtml(r.stat || "")}</span> <span class="line-num">${displayLine(r) ?? "—"}</span></div>
        <div class="pline-edge ${edge == null ? "muted" : edge >= 0 ? "pct good" : "pct bad"}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}<small>${hitPct(r) != null ? hitPct(r).toFixed(1) + "%" : ""}</small></div>
        <div class="pline-meta">${meta ? bookMark(meta, "sm") : ""} ${escapeHtml(meta?.name || offer.bookKey || "")}${r.dfs?.prizepicks ? `<button type="button" class="slip-add" data-eid="${escapeHtml(r.event_id || "")}" data-player="${escapeHtml(r.player)}" data-stat="${escapeHtml(r.stat)}" data-line="${r.line ?? ""}" data-side="${escapeHtml(r.side)}">+ slip</button>` : ""} ${likeButton(pickFromRow(r, offer), "cell")}</div>
      </div>`;
    }).join("");
    return `<article class="pcard">
      <div class="pcard-top">
        ${headshotTag(top.headshot)}
        <div>
          <div class="pcard-name"><button type="button" class="player-btn" data-player="${escapeHtml(top.player)}" data-eid="${escapeHtml(top.event_id || "")}" data-market="${escapeHtml(top.market || "")}" data-side="${escapeHtml(top.side)}">${escapeHtml(top.player)}</button>${posTag(top)}</div>
          <div class="pcard-sub">${escapeHtml(matchup(top))} · ${escapeHtml(fmtWhen(top.commence_time))}</div>
        </div>
      </div>
      <div class="pcard-lines">${lines}</div>
    </article>`;
  }).join("");
}

document.querySelectorAll(".layout-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.layout === "cards" ? "cards" : "table";
    paintThen(mode === "cards" ? "Building player cards…" : "Building the table…", () => {
      setLayout(mode);
      render();
    });
  });
});
$("cardGrid")?.addEventListener("click", (e) => {
  if (e.target.closest(".slip-add") || e.target.closest(".like-btn")) return;
  const line = e.target.closest(".pline, .player-btn");
  if (!line?.dataset.player) return;
  openPlayerPopup(line.dataset.player, line.dataset.eid || "", line.dataset.market || "", line.dataset.side || "");
});
document.querySelectorAll(".tab[data-view]").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.view = btn.dataset.view;
    if (btn.dataset.group) state.groupView[btn.dataset.group] = btn.dataset.view;
    if (state.section !== "props") {
      state.section = "props";
      if ($("section")) $("section").value = "props";
    }
    renderHead();
    render();
  });
});
document.querySelectorAll(".mgroup").forEach((btn) => {
  btn.addEventListener("click", () => {
    const group = btn.dataset.group;
    state.view = state.groupView[group] || MARKET_GROUPS[group][0];
    if (state.section !== "props") {
      state.section = "props";
      if ($("section")) $("section").value = "props";
    }
    renderHead();
    render();
  });
});
document.querySelectorAll(".tab[data-section]").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.section = btn.dataset.section;
    if ($("section")) $("section").value = state.section;
    const panel = $("slipPanel");
    if (panel) panel.hidden = state.section !== "slip";
    render(true);
  });
});

document.addEventListener("click", (e) => {
  const vol = e.target.closest("#volPicks [data-vol]");
  if (!vol) return;
  state.volFilter = vol.dataset.vol;
  renderVolume();
});

$("bookPicks").addEventListener("click", (e) => {
  const btn = e.target.closest(".book-pick");
  if (!btn) return;
  const key = btn.dataset.book;
  if (state.booksOn.has(key)) {
    if (state.booksOn.size === 1) return;
    state.booksOn.delete(key);
  } else {
    state.booksOn.add(key);
  }
  renderHead();
  render();
});

$("booksReset").addEventListener("click", () => {
  state.booksOn = new Set(DEFAULT_ON);
  render();
});

if ($("sport")) {
  $("sport").addEventListener("change", () => {
    state.sport = $("sport").value;
    loadData();
  });
}
if ($("section")) {
  $("section").addEventListener("change", () => {
    state.section = $("section").value;
    render();
  });
}
$("stackShape")?.addEventListener("change", render);
$("stacksBody")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".player-btn");
  if (btn?.dataset.player) openPlayerPopup(btn.dataset.player, "", "", "");
});
$("arbStake")?.addEventListener("input", () => { if (state.view === "arb") render(); });
$("minBooks")?.addEventListener("change", () => {
  state.minBooks = !!$("minBooks").checked;
  render();
});
let qTimer = null;
["game", "stat", "side", "tier", "picks", "minPct", "when", "team"].forEach((id) => {
  $(id)?.addEventListener("change", () => {
    const run = () => {
      if (id === "when" || id === "team" || id === "game") {
        const all = state.data?.props || [];
        const sport = ($("sport")?.value || state.sport || "all").toLowerCase();
        const pool = sport === "all" ? all : all.filter((r) => String(r.sport || "").toLowerCase() === sport);
        fillGameAndTeam(pool);
        fillStats(pool);
      }
      render();
    };
    if (id === "when") {
      paintThen(`Loading ${whenLoadLabel()}…`, run);
      return;
    }
    run();
  });
});
$("q")?.addEventListener("input", () => {
  clearTimeout(qTimer);
  qTimer = setTimeout(() => render(), 180);
});
$("game")?.addEventListener("mousedown", (e) => {
  e.preventDefault();
  const drop = $("gameDrop");
  if (!drop) return;
  drop.hidden = !drop.hidden;
  if (!drop.hidden) {
    renderGameOpts();
    $("gameQ")?.focus();
  }
});
function renderGameOpts() {
  const sel = $("game");
  const box = $("gameOpts");
  if (!sel || !box) return;
  const q = ($("gameQ")?.value || "").trim().toLowerCase();
  const opts = [...sel.options].filter((o) => !q || o.textContent.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
  box.innerHTML = opts.map((o) => `<button type="button" class="game-opt${o.value === sel.value ? " on" : ""}" data-val="${escapeHtml(o.value)}">${escapeHtml(o.textContent)}</button>`).join("");
}
$("gameOpts")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".game-opt");
  if (!btn) return;
  $("game").value = btn.dataset.val;
  $("gameDrop").hidden = true;
  $("gameQ").value = "";
  render();
});
$("gameQ")?.addEventListener("input", renderGameOpts);
document.addEventListener("click", (e) => {
  if (!e.target.closest("#gameCombo")) $("gameDrop").hidden = true;
});

function closePopup() {
  const el = $("popup");
  if (el) el.hidden = true;
}

function lastVsOppNote(games, focus) {
  const opp = upcomingOpp(focus);
  if (!opp || !games.length) return "";
  const hits = [...games].reverse().filter((g) => String(g.opp || "").toUpperCase() === String(opp).toUpperCase());
  if (!hits.length) return "";
  const g = hits[0];
  const v = logValue(g, focus.stat);
  if (v == null || focus.line == null) return `Last vs ${opp}: ${g.season} w${g.week}.`;
  const over = String(focus.side || "Over").toLowerCase() !== "under";
  const cash = over ? v > Number(focus.line) : v < Number(focus.line);
  const push = v === Number(focus.line);
  return `Last vs ${opp} (${g.season} w${g.week}): ${v} ${focus.stat}. That ${push ? "pushed" : cash ? "cashed" : "missed"} this ${focus.side} ${focus.line} number.`;
}

function bestPayoutKey(map, preferLine) {
  const entries = Object.entries(map || {}).filter(([, v]) => v && v.price != null);
  if (!entries.length) return "";
  const exact = preferLine != null && preferLine !== ""
    ? entries.filter(([, v]) => v.line != null && Number(v.line) === Number(preferLine))
    : [];
  const pool = exact.length ? exact : entries;
  pool.sort((a, b) => Number(b[1].price) - Number(a[1].price));
  return pool[0][0];
}

function bestOppositePrice(row) {
  if (!row) return null;
  let best = null;
  const scan = { ...(row.books || {}), ...(row.dfs || {}) };
  Object.entries(scan).forEach(([k, v]) => {
    if (v?.price == null) return;
    if (!best || Number(v.price) > Number(best.price)) best = { book: k, price: v.price, line: v.line };
  });
  return best;
}

function betSummary(focus, recs, oppRow) {
  const be = breakEven();
  const edge = rowEdge(focus);
  const splits = splitStats(recs, focus.stat, focus.line, focus.side);
  const good = edge != null && edge >= 0;
  const fade = !good ? bestOppositePrice(oppRow) : null;
  const fadeMeta = fade ? BOOK_BY_KEY[fade.book] : null;
  const vs = lastVsOppNote(recs, focus);
  const rows = [];
  rows.push(`<div class="sum-kicker">${good ? "Play" : edge == null ? "No edge yet" : "Pass / fade"}</div>`);
  rows.push(`<p><b>The bet:</b> ${escapeHtml(focus.player)} ${escapeHtml(focus.side || "")} ${displayLine(focus) ?? ""} ${escapeHtml(focus.stat)} · ${escapeHtml(matchup(focus) || "this game")}.</p>`);
  const cash = hitPct(focus);
  if (cash != null) {
    rows.push(`<p><b>Why it screens ${good ? "good" : "soft"}:</b> ${cash.toFixed(1)}% to hit vs ${be}% needed on a ${pickSize()}-pick${edge == null ? "" : ` (${edge > 0 ? "+" : ""}${edge} edge)`}.</p>`);
  }
  if (splits?.L5?.n) {
    rows.push(`<p><b>Recent form:</b> ${splits.L5.hits} of his last ${splits.L5.n} graded games cashed this ${escapeHtml(String(focus.side || "side").toLowerCase())} (${splits.L5.hit ?? "—"}% hit rate${splits.L5.pushes ? `, ${splits.L5.pushes} push` : ""}). L5 average: ${splits.L5.avg}.</p>`);
  }
  if (splits?.L10?.n >= 8 && splits.L10.hit != null) {
    rows.push(`<p><b>Longer sample:</b> ${splits.L10.hit}% hit rate over his last ${splits.L10.n} games.</p>`);
  }
  if (vs) rows.push(`<p><b>Last meeting:</b> ${escapeHtml(vs)}</p>`);
  if (focus.injury?.status) {
    rows.push(`<p><b>Availability:</b> ${escapeHtml(focus.injury.status)}${focus.injury.injury ? ` (${escapeHtml(focus.injury.injury)})` : ""}.</p>`);
  }
  if (!good && fade && oppRow) {
    rows.push(`<p><b>If you fade it:</b> ${escapeHtml(oppRow.side)} ${fade.line ?? oppRow.line ?? ""} at ${escapeHtml(fadeMeta?.name || fade.book)} ${american(fade.price)}.</p>`);
  } else if (!good && oppRow) {
    rows.push(`<p><b>If you fade it:</b> ${escapeHtml(oppRow.side)} ${oppRow.line ?? ""}.</p>`);
  }
  return rows.join("");
}

function nameKey(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function standardishLines(rows) {
  const best = new Map();
  (rows || []).forEach((r) => {
    if (!r?.stat) return;
    if (r.pp_tier && r.pp_tier !== "Standard") return;
    if (r.is_alternate && !isFantasyStat(r.stat)) return;
    const key = `${nameKey(r.player)}|${r.stat}|${gameKeyOf(r)}`;
    const ref = r.avg_line ?? r.book_line;
    const dist = (r.line != null && ref != null) ? Math.abs(Number(r.line) - Number(ref)) : 0;
    const score = (isFantasyStat(r.stat) ? 8 : 0)
      + (r.dfs?.prizepicks ? 4 : 0)
      + (r.pp_tier === "Standard" || !r.pp_tier ? 3 : 0)
      + (r.dfs?.underdog ? 1 : 0)
      - dist;
    const prev = best.get(key);
    if (!prev || score > prev.score) best.set(key, { r, score });
  });
  return [...best.values()].map((x) => x.r).sort((a, b) => String(a.stat).localeCompare(String(b.stat)));
}

function logFamily(stat) {
  const s = String(stat || "").toLowerCase();
  if (/pass\+rush|rush\+rec|fantasy|anytime td/.test(s)) return "mix";
  if (/(pass yd|pass td|pass att|completion|int\b|passing)/.test(s)) return "pass";
  if (/(rush yd|rush att|rush td|carries|rushing)/.test(s)) return "rush";
  if (/(rec|tgt|target|catch|receiving|longest rec)/.test(s)) return "rec";
  return "mix";
}

function contextLog(recs, focus) {
  if (!recs.length) return `<div class="muted">No ${currentSeason()} game log yet.</div>`;
  const pos = String(focus?.position || focus?.nfl_pos || intelPlayer(focus?.player)?.pos || "").toUpperCase();
  const fam = logFamily(focus?.stat);
  const passOn = fam === "pass" || pos === "QB";
  const rushOn = true;
  const recOn = fam === "rec" || fam === "mix" || ["WR", "TE", "RB", "FB", "HB"].includes(pos);
  const catchPct = (g) => (g.tgt ? Math.round((Number(g.rec || 0) / g.tgt) * 100) : null);
  const groups = [`<th class="grp" colspan="3">Fantasy / game</th>`];
  const sub = ["<th>Week</th><th>Fpts</th><th>Matchup</th>"];
  if (passOn) { groups.push(`<th class="grp" colspan="5">Passing</th>`); sub.push("<th>Cmp</th><th>Att</th><th>Yds</th><th>TD</th><th>INT</th>"); }
  if (recOn) { groups.push(`<th class="grp" colspan="7">Receiving</th>`); sub.push("<th>Rec</th><th>Tar</th><th>Yds</th><th>TD</th><th>Tgt%</th><th>Catch%</th><th>Rte%</th>"); }
  if (rushOn) { groups.push(`<th class="grp" colspan="4">Rushing</th>`); sub.push("<th>Att</th><th>Yds</th><th>Avg</th><th>TD</th>"); }
  groups.push(`<th class="grp" colspan="2">Snaps</th>`);
  sub.push("<th>Snp</th><th>Snp%</th>");
  const row = (g) => {
    const match = `${g.home === false ? "@" : "vs"} ${g.opp || ""}`;
    const avg = g.car ? (Number(g.rush_yds || 0) / g.car).toFixed(1) : "—";
    const bits = [
      `<td>${String(g.season || "").slice(2)} W${g.week}</td>`,
      `<td>${g.ppr ?? g.fant ?? "—"}</td>`,
      `<td class="match">${escapeHtml(match)}</td>`,
    ];
    if (passOn) bits.push(`<td>${g.cmp ?? 0}</td><td>${g.att ?? 0}</td><td>${g.pass_yds ?? 0}</td><td>${g.pass_td ?? 0}</td><td>${g.int ?? 0}</td>`);
    if (recOn) bits.push(`<td>${g.rec ?? 0}</td><td>${g.tgt ?? 0}</td><td>${g.rec_yds ?? 0}</td><td>${g.rec_td ?? 0}</td><td>${teamTargetShare(g) != null ? `${teamTargetShare(g)}%` : "—"}</td><td>${catchPct(g) != null ? `${catchPct(g)}%` : "—"}</td><td>${g.route_pct != null ? `${Math.round(g.route_pct)}%` : "—"}</td>`);
    if (rushOn) bits.push(`<td>${g.car ?? 0}</td><td>${g.rush_yds ?? 0}</td><td>${avg}</td><td>${g.rush_td ?? 0}</td>`);
    bits.push(`<td>${g.off_snaps ?? "—"}</td><td>${g.off_pct != null ? `${Math.round(g.off_pct)}%` : "—"}</td>`);
    return `<tr>${bits.join("")}</tr>`;
  };
  return `<div class="dfs-wrap">
    <div class="popup-h">Recent games</div>
    <div class="log-scroll"><table class="popup-table popup-logs dfs-log">
      <thead><tr>${groups.join("")}</tr><tr>${sub.join("")}</tr></thead>
      <tbody>${[...recs].reverse().map(row).join("")}</tbody>
    </table></div>
  </div>`;
}

function usageDetail(recs, pos, focus) {
  if (!recs.length) return `<div class="muted">No ${currentSeason()} usage yet.</div>`;
  const qb = /^QB$/i.test(pos || "");
  const u = usagePack(recs);
  const weekRows = [...recs].reverse().map((g) => `<tr>
    <td>${String(g.season || "").slice(2)} W${g.week}</td>
    <td>${g.home === false ? "@" : "vs"} ${escapeHtml(g.opp || "")}</td>
    <td>${g.off_snaps ?? "—"}</td>
    <td>${g.off_pct != null ? `${Math.round(g.off_pct)}%` : "—"}</td>
    <td>${qb ? "—" : (g.routes ?? "—")}</td>
    <td>${qb ? "—" : (g.route_pct != null ? `${Math.round(g.route_pct)}%` : "—")}</td>
    <td>${g.tgt ?? "—"}</td>
    <td>${g.rec ?? "—"}</td>
    <td>${g.car ?? "—"}</td>
  </tr>`).join("");
  const stats = [
    ["Targets", "tgt"],
    ["Receptions", "rec"],
    ["Rec Yds", "rec_yds"],
    ["Rush Att", "car"],
    ["Rush Yds", "rush_yds"],
    ["Pass Yds", "pass_yds"],
    ["Snaps", "off_snaps"],
    ["Snap %", "off_pct"],
  ];
  if (!qb) stats.splice(2, 0, ["Routes", "routes"]);
  const last = (n, key) => {
    const list = recs.slice(-n).map((g) => Number(g[key])).filter((v) => Number.isFinite(v));
    if (!list.length) return "—";
    return +(list.reduce((a, b) => a + b, 0) / list.length).toFixed(1);
  };
  const line = focus?.line;
  const statRows = stats.map(([lab, key]) => `<tr>
    <td>${lab}</td>
    <td>${recs.at(-1)?.[key] ?? "—"}</td>
    <td>${last(2, key)}</td>
    <td>${last(5, key)}</td>
    <td>${last(recs.length, key)}</td>
    <td>${key === LOG_STAT[focus?.stat] || lab === focus?.stat ? (line ?? "—") : "—"}</td>
  </tr>`).join("");
  return `${u ? usageStrip(recs, pos) : ""}
    <h4 class="popup-h">By week</h4>
    <div class="log-scroll"><table class="popup-table">
      <thead><tr><th>Week</th><th>Opp</th><th>Snaps</th><th>Snap%</th><th>Routes</th><th>Rte%</th><th>Tgt</th><th>Rec</th><th>Rush att</th></tr></thead>
      <tbody>${weekRows}</tbody>
    </table></div>
    <h4 class="popup-h">By stat</h4>
    <div class="log-scroll"><table class="popup-table">
      <thead><tr><th>Stat</th><th>Last</th><th>L2</th><th>L5</th><th>Season</th><th>This line</th></tr></thead>
      <tbody>${statRows}</tbody>
    </table></div>`;
}

function dvpFor(row) {
  if (sportOf(row) !== "NFL" || !state.intel?.logs || !state.intel?.players) return null;
  const meta = intelPlayer(row.player);
  const pos = String(row.position || meta?.pos || "").toUpperCase();
  if (!pos || !["QB", "RB", "WR", "TE"].includes(pos)) return null;
  const oppRaw = row.home ? row.away_team : row.home_team;
  const oppAb = abbr(oppRaw, row);
  if (!oppAb) return null;
  const stat = String(row.stat || "");
  const statKey = /pass td/i.test(stat) ? "pass_td"
    : /pass yds|passing/i.test(stat) ? "pass_yds"
    : /rush td/i.test(stat) ? "rush_td"
    : /rush yds|rushing/i.test(stat) ? "rush_yds"
    : /rush att|carries/i.test(stat) ? "car"
    : /rec td/i.test(stat) ? "rec_td"
    : /receptions|^rec$/i.test(stat) ? "rec"
    : /targets/i.test(stat) ? "tgt"
    : /rec yds|receiving/i.test(stat) ? "rec_yds"
    : /completions/i.test(stat) ? "cmp"
    : /pass att/i.test(stat) ? "att"
    : "ppr";
  const byOpp = {};
  Object.values(state.intel.players).forEach((p) => {
    if (String(p.pos || "").toUpperCase() !== pos) return;
    (state.intel.logs[p.gsis_id] || []).forEach((g) => {
      const o = abbr(g.opp, row);
      if (!o) return;
      const gameKey = `${g.season}|${g.week}|${o}`;
      if (!byOpp[o]) byOpp[o] = {};
      if (!byOpp[o][gameKey]) byOpp[o][gameKey] = 0;
      const v = Number(g[statKey]);
      if (Number.isFinite(v)) byOpp[o][gameKey] += v;
    });
  });
  const ranks = Object.entries(byOpp).map(([o, games]) => {
    const totals = Object.values(games);
    return { opp: o, avg: totals.reduce((a, b) => a + b, 0) / totals.length, n: totals.length };
  }).sort((a, b) => b.avg - a.avg);
  const hit = ranks.find((r) => r.opp === oppAb);
  if (!hit) return null;
  return { pos, opp: oppAb, avg: +hit.avg.toFixed(1), rank: ranks.indexOf(hit) + 1, of: ranks.length, stat: row.stat || statKey };
}

function bookLineBoard(rows) {
  const dfsKeys = new Set(["prizepicks", "underdog", "pick6", "betr", "dabble"]);
  const map = new Map();
  const put = (book, line, side, price, dfs) => {
    const px = Number(price);
    const n = Number(line);
    if (!book || !Number.isFinite(n) || !Number.isFinite(px) || Math.abs(px) < 100 || Math.abs(px) > 2500) return;
    const key = `${book}|${n}`;
    if (!map.has(key)) map.set(key, { book, line: n, over: null, under: null, dfs: !!dfs });
    const slot = map.get(key);
    const overish = side === "over" || side === "yes";
    if (overish) {
      if (slot.over == null || px > slot.over) slot.over = px;
    } else if (slot.under == null || px > slot.under) slot.under = px;
  };
  (rows || []).forEach((r) => {
    const side = String(r.side || "").toLowerCase();
    if (!["over", "under", "yes", "no"].includes(side)) return;
    Object.entries(mergeBooks(r.books) || {}).forEach(([k, b]) => {
      if (!b || dfsKeys.has(k) || k === "kalshi") return;
      put(k, b.line != null && b.line !== "" ? b.line : r.line, side, b.price, false);
    });
    Object.entries(r.dfs || {}).forEach(([k, b]) => {
      if (!b) return;
      put(k, b.line != null && b.line !== "" ? b.line : r.line, side, k === "prizepicks" ? -117 : b.price, true);
    });
  });
  return [...map.values()].sort((a, b) => a.line - b.line || String(a.book).localeCompare(String(b.book)));
}

function lineBoardHtml(rows, focus) {
  const board = bookLineBoard(rows);
  const yesNo = focus && (focus.side === "Yes" || focus.side === "No");
  const overLab = yesNo ? "Yes" : "Over";
  const underLab = yesNo ? "No" : "Under";
  const focusSide = String(focus?.side || "");
  const focusLine = Number(displayLine(focus) ?? focus?.line);
  if (!board.length) return `<div class="muted">No posted lines to compare.</div>`;

  const byLine = new Map();
  board.forEach((r) => {
    if (!byLine.has(r.line)) byLine.set(r.line, []);
    byLine.get(r.line).push(r);
  });
  const lines = [...byLine.keys()].sort((a, b) => {
    const af = Number.isFinite(focusLine) && a === focusLine ? -1 : 0;
    const bf = Number.isFinite(focusLine) && b === focusLine ? -1 : 0;
    return af - bf || a - b;
  });

  const bestAt = (list, side) => {
    const vals = list.map((r) => r[side]).filter((n) => n != null);
    return vals.length ? Math.max(...vals) : null;
  };
  const focusList = Number.isFinite(focusLine) ? byLine.get(focusLine) || [] : [];
  const bestOver = bestAt(focusList, "over");
  const bestUnder = bestAt(focusList, "under");
  const bestBook = (side, price) => focusList.find((r) => r[side] === price);
  const summary = Number.isFinite(focusLine) ? `<div class="line-summary">
    <div><span>This line</span><b>${focusLine}</b></div>
    <div><span>Best ${overLab}</span><b class="pct good">${bestOver == null ? "—" : american(bestOver)}</b>${bestBook("over", bestOver) ? `<small>${escapeHtml(BOOK_BY_KEY[bestBook("over", bestOver).book]?.name || "")}</small>` : ""}</div>
    <div><span>Best ${underLab}</span><b class="pct good">${bestUnder == null ? "—" : american(bestUnder)}</b>${bestBook("under", bestUnder) ? `<small>${escapeHtml(BOOK_BY_KEY[bestBook("under", bestUnder).book]?.name || "")}</small>` : ""}</div>
  </div>` : "";

  const groups = lines.map((line) => {
    const list = byLine.get(line);
    const onFocus = Number.isFinite(focusLine) && line === focusLine;
    const sideKey = focusSide === "Under" || focusSide === "No" ? "under" : "over";
    list.sort((a, b) => (b[sideKey] ?? -9999) - (a[sideKey] ?? -9999) || (a.dfs === b.dfs ? 0 : a.dfs ? 1 : -1));
    const overBest = bestAt(list, "over");
    const underBest = bestAt(list, "under");
    const body = list.map((r) => {
      const meta = BOOK_BY_KEY[r.book];
      const overBtn = r.over != null && focus ? likeButton(pickFromRow({ ...focus, side: overLab, line }, { bookKey: r.book, line, price: r.over }), "cell") : "";
      const underBtn = r.under != null && focus ? likeButton(pickFromRow({ ...focus, side: underLab, line }, { bookKey: r.book, line, price: r.under }), "cell") : "";
      return `<tr class="${r.dfs ? "dfs-row" : ""}">
        <td>${meta ? bookMark(meta, "sm") + " " + escapeHtml(meta.name) : escapeHtml(r.book)}${r.dfs ? ` <span class="line-note">DFS</span>` : ""}</td>
        <td class="${r.over != null && r.over === overBest ? "best-pay" : ""}">${r.over == null ? "—" : american(r.over)}${overBtn}</td>
        <td class="${r.under != null && r.under === underBest ? "best-pay" : ""}">${r.under == null ? "—" : american(r.under)}${underBtn}</td>
      </tr>`;
    }).join("");
    return `<div class="line-group${onFocus ? " on" : ""}">
      <div class="line-head"><b>${line}</b>${onFocus ? `<span>your line</span>` : `<span class="line-note">${line > focusLine ? "higher" : "lower"} number</span>`}</div>
      <table class="popup-table">
        <thead><tr><th>Book</th><th>${overLab}</th><th>${underLab}</th></tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
  }).join("");

  return `${summary}<div class="line-groups">${groups}</div>
    <div class="corr-why">Grouped by number. Your line is first. Green is the best price at that number. + saves that book, side, and line to My Bets.</div>`;
}

function shortLogDate(s) {
  const t = String(s || "");
  if (t.includes("T")) return t.slice(5, 10);
  const parts = t.split("/");
  if (parts.length >= 2 && parts[0] && parts[1]) return `${parts[0]}/${parts[1]}`;
  return t.slice(0, 10);
}

function nbaLogBlock(name) {
  const recs = nbaLogs(name);
  if (!recs.length) {
    if (state.nbaLogLoading) return `<div class="muted">Loading NBA game log…</div>`;
    return "";
  }
  const row = (g) => `<tr>
    <td>${escapeHtml(shortLogDate(g.date))}</td>
    <td>${g.starter ? "S" : ""}</td>
    <td class="match">${escapeHtml(g.opp || "")}</td>
    <td>${g.min ?? "—"}</td>
    <td>${g.pts ?? "—"}</td>
    <td>${g.reb ?? "—"}</td>
    <td>${g.ast ?? "—"}</td>
    <td>${g.stl ?? "—"}</td>
    <td>${g.blk ?? "—"}</td>
    <td>${g.to ?? "—"}</td>
    <td>${g.fg3 ?? "—"}</td>
  </tr>`;
  return `<div class="dfs-wrap">
    <div class="popup-h">Recent games</div>
    <div class="log-scroll"><table class="popup-table popup-logs dfs-log">
      <thead><tr>
        <th>Date</th><th></th><th>Opp</th><th>Min</th><th>Pts</th><th>Reb</th><th>Ast</th><th>Stl</th><th>Blk</th><th>TO</th><th>3PT</th>
      </tr></thead>
      <tbody>${recs.map(row).join("")}</tbody>
    </table></div>
  </div>`;
}

function nbaDvpFor(focus) {
  if (!state.nbaIntel || sportOf(focus) !== "NBA") return null;
  const logs = nbaLogs(focus.player);
  const family = { PG: "G", SG: "G", G: "G", SF: "F", PF: "F", F: "F", C: "C" };
  const pos = family[(logs[0]?.pos || nbaLineup(focus.home_team).concat(nbaLineup(focus.away_team)).find((p) => normName(p.name) === normName(focus.player))?.pos || "").toUpperCase()];
  if (!pos) return null;
  const mine = logs[0]?.team;
  const home = nbaTeam(focus.home_team);
  const away = nbaTeam(focus.away_team);
  const opp = mine && home?.abbr === mine ? away : home;
  const board = opp ? state.nbaIntel.dvp?.[opp.abbr]?.pos?.[pos] : null;
  if (!board) return null;
  return { opp: opp.abbr, pos, games: state.nbaIntel.dvp[opp.abbr].games, board };
}

function openPlayerPopup(player, eventId, market, side) {
  const popupKey = `${player}|${eventId || ""}|${market || ""}|${side || ""}`;
  if (state.popupKey !== popupKey) {
    state.popupChartAll = false;
    state.popupTab = state.popupTab && state.popupKey.startsWith(`${player}|`) ? state.popupTab : "bet";
  }
  state.popupKey = popupKey;
  const all = state.data?.props || [];
  const key = nameKey(player);
  const mine = all.filter((r) => r.player === player || nameKey(r.player) === key);
  let focus = mine.find((r) => String(r.event_id || "") === String(eventId || "") && String(r.market || "") === String(market || "") && String(r.side || "") === String(side || ""))
    || mine.find((r) => String(r.side || "") === String(side || "") && String(r.market || "") === String(market || ""))
    || mine[0];
  if (!focus) {
    const meta = intelPlayer(player);
    const inj = (state.intel?.injuries || []).find((i) => i.name === player || i.gsis_id === meta?.gsis_id);
    const nba = nbaLogs(player);
    const nbaInj = (state.nbaIntel?.injuries || []).find((i) => normName(i.name) === normName(player));
    if (!meta && !inj && !nba.length && !nbaInj) return;
    focus = {
      player,
      sport: nba.length || nbaInj ? "NBA" : "",
      headshot: meta?.headshot || inj?.headshot || nbaInj?.headshot,
      gsis_id: meta?.gsis_id || inj?.gsis_id,
      game: meta ? `${meta.team} ${meta.pos}` : (nbaInj?.team || ""),
      injury: inj ? { status: inj.report_status, injury: inj.report_injury, week: inj.week, season: inj.season }
        : nbaInj ? { status: nbaInj.status, injury: nbaInj.injury } : null,
      books: {}, dfs: {},
    };
  }
  const edge = rowEdge(focus);
  const shownLine = displayLine(focus);
  const quoteRows = mine.filter((r) => r.stat === focus.stat && (!focus.game || !r.game || r.game === focus.game));
  const bookLine = Number(focus.line);
  const wholePush = isWholeLine(shownLine) && Number.isFinite(bookLine) && Math.abs(bookLine - Number(shownLine)) > 0.2;
  const pushNote = wholePush
    ? `<div class="corr-why">PrizePicks ${escapeHtml(focus.side || "")} ${shownLine} pushes on exactly ${shownLine}. Cash needs ${String(focus.side || "").toLowerCase() === "under" ? `${Number(shownLine) - 1} or fewer` : `${Number(shownLine) + 1} or more`}. Books at ${bookLine} are a different bet.</div>`
    : "";
  const oppSide = focus.side === "Over" ? "Under" : focus.side === "Under" ? "Over" : focus.side === "Yes" ? "No" : focus.side === "No" ? "Yes" : "";
  let oppRow = oppSide ? (mine.find((r) => r.stat === focus.stat && r.game === focus.game && r.side === oppSide)
    || mine.find((r) => r.stat === focus.stat && r.side === oppSide)) : null;
  focus = { ...focus, books: mergeBooks(focus.books) };
  if (oppRow) oppRow = { ...oppRow, books: mergeBooks(oppRow.books) };
  const bookKeys = unique([...Object.keys(focus.books || {}), ...Object.keys(oppRow?.books || {})]).sort();
  const dfs = Object.entries(focus.dfs || {});
  const oppDfs = Object.entries(oppRow?.dfs || {});
  const others = standardishLines(mine.filter((r) => !(r.event_id === focus.event_id && r.stat === focus.stat && r.side === focus.side)));
  const meta = intelPlayer(player);
  const pos = focus.position || focus.nfl_pos || meta?.pos || "";
  const gsis = focus.gsis_id || meta?.gsis_id;
  const recs = intelLogs(gsis);
  const nbaRecs = nbaLogs(player);
  const relatedNews = sportOf(focus) === "NBA"
    ? nbaNewsFor(focus)
    : (state.intel?.news || []).filter((n) => (n.players || []).includes(gsis) || (n.headline || "").toLowerCase().includes(String(player).toLowerCase()));
  const liveInj = focus.injury?.status ? focus.injury : (() => {
    if (sportOf(focus) === "NBA") {
      const hit = (state.nbaIntel?.injuries || []).find((i) => normName(i.name) === normName(player));
      return hit ? { status: hit.status, injury: hit.injury || hit.detail } : null;
    }
    const hit = (state.intel?.injuries || []).find((i) => i.gsis_id === gsis || nameKey(i.name) === nameKey(player));
    if (!hit || (hit.season && Number(hit.season) !== currentSeason())) return null;
    return { status: hit.report_status, injury: hit.report_injury, week: hit.week, season: hit.season };
  })();
  if (liveInj && !focus.injury) focus.injury = liveInj;
  const kProps = kalshiPropsForPlayer(player);
  const logBlock = sportOf(focus) === "NBA"
    ? (nbaRecs.length || state.nbaLogLoading ? nbaLogBlock(player) || `<div class="muted">Loading NBA game log…</div>` : `<div class="muted">No game log yet.</div>`)
    : (recs.length ? contextLog(recs, focus) : `<div class="muted">No game log yet.</div>`);
  const newsBlock = relatedNews.length ? `<h4 class="popup-h">News</h4>
    ${relatedNews.slice(0, 6).map((n) => `<div class="popup-stat" style="margin-bottom:8px"><b>${escapeHtml(n.source || "")} · ${escapeHtml(n.published || "")}</b>
      <a href="${escapeHtml(n.url || "#")}" target="_blank" rel="noopener">${escapeHtml(n.headline || "")}</a></div>`).join("")}` : "";
  const injBlock = liveInj ? `<div class="popup-stat" style="margin-bottom:12px"><b>Injury</b>${injPill(liveInj)} ${escapeHtml(liveInj.injury || "")}${liveInj.week ? ` · ${liveInj.season || ""}w${liveInj.week}` : ""}</div>` : "";
  const newsNote = relatedNews.length ? `<div class="popup-stat" style="margin-bottom:12px"><b>Injury / news</b>${relatedNews.slice(0, 3).map((n) => `<div><a href="${escapeHtml(n.url || "#")}" target="_blank" rel="noopener">${escapeHtml(n.headline || "")}</a><div class="corr-why">${escapeHtml(n.source || "")} · ${escapeHtml(n.published || "")}</div></div>`).join("")}</div>` : "";

  $("popupCard").innerHTML = `
    <div class="popup-top">
      <div>
        <div class="popup-name">${headshotTag(focus.headshot)} ${escapeHtml(focus.player)}${posTag(focus)}${liveInj ? injPill(liveInj) : ""}</div>
        <div class="popup-sub">${escapeHtml(matchup(focus))} · ${escapeHtml(fmtWhen(focus.commence_time))}${scriptLine(focus) ? ` · ${escapeHtml(scriptLine(focus))}` : ""}</div>
        <div class="popup-bet">
          <div class="bet-kicker">This bet${(() => { const o = viewOffer(focus); const meta = BOOK_BY_KEY[o.bookKey]; return meta ? ` · ${meta.name}` : ""; })()}</div>
          <div class="bet-hero">
            <div class="bet-main">
              ${sideTag(focus.side)}
              <div>
                <div class="bet-line">${shownLine ?? "—"}</div>
                <div class="bet-stat">${escapeHtml(focus.stat || "")}</div>
              </div>
            </div>
            <div class="bet-rail">
              <div><span>To hit</span><b class="${pctClass(hitPct(focus))}">${hitPct(focus) != null ? hitPct(focus).toFixed(1) + "%" : "—"}</b></div>
              <div><span>Edge</span><b class="${edgeClass(edge)}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}</b></div>
              <div><span>Need</span><b>${breakEven().toFixed(1)}%</b></div>
            </div>
          </div>
          <div class="bet-foot">
            <div class="bet-sub">${escapeHtml(focus.player || "")}${focus.pp_tier ? ` · ${escapeHtml(focus.pp_tier)}` : ""}${matchup(focus) ? ` · ${escapeHtml(matchup(focus))}` : ""}</div>
            ${likeButton(pickFromRow(focus, viewOffer(focus)), "hero")}
          </div>
        </div>
      </div>
      <button type="button" class="popup-x" id="popupClose">✕</button>
    </div>
    <div class="pop-tabs">
      <button type="button" class="pop-tab on" data-pop-tab="bet">Bet</button>
      <button type="button" class="pop-tab" data-pop-tab="chart">Chart</button>
      <button type="button" class="pop-tab" data-pop-tab="log">Game log</button>
      <button type="button" class="pop-tab" data-pop-tab="usage">Usage</button>
      <button type="button" class="pop-tab" data-pop-tab="dvp">DVP</button>
      <button type="button" class="pop-tab" data-pop-tab="lines">Lines</button>
    </div>
    <div class="pop-body">
    <div class="pop-pane" data-pop-pane="bet">
    ${pushNote}
    ${injBlock}
    ${newsNote}
    <div class="popup-stat sum-card" style="margin-bottom:12px"><b>Bet write-up</b>${betSummary(focus, recs, oppRow)}</div>
    </div>
    <div class="pop-pane" data-pop-pane="chart" hidden>
    ${renderSplitChart(focus, recs) || `<div class="muted">No chart for this stat yet.</div>`}
    </div>
    <div class="pop-pane" data-pop-pane="log" hidden>
    ${logBlock}
    </div>
    <div class="pop-pane" data-pop-pane="usage" hidden>
    ${usageDetail(recs, pos || meta?.pos, focus)}
    </div>
    <div class="pop-pane" data-pop-pane="dvp" hidden>
    ${(() => {
      const nba = nbaDvpFor(focus);
      if (nba) {
        const pts = nba.board.pts;
        const soft = pts && pts.rank <= Math.ceil(pts.of / 3);
        return `<div class="popup-stat"><b>${escapeHtml(nba.opp)} vs ${escapeHtml(nba.pos)}</b>
          Allows ${pts?.avg ?? "—"} pts · ${nba.board.reb?.avg ?? "—"} reb · ${nba.board.ast?.avg ?? "—"} ast per game to ${escapeHtml(nba.pos)}
          <div class="corr-why">Pts rank ${pts?.rank ?? "—"} of ${pts?.of ?? "—"}. ${soft ? "Soft matchup." : "Tougher matchup."} ${nba.games || 0} games in the sample.</div>
        </div>`;
      }
      const d = dvpFor(focus);
      if (!d) return `<div class="muted">DVP needs an opponent and a position. NFL uses QB/RB/WR/TE. NBA uses G/F/C from the recent logs.</div>`;
      const soft = d.rank <= 10;
      return `<div class="popup-stat"><b>${escapeHtml(d.opp)} vs ${escapeHtml(d.pos)}</b>
        Allows ${d.avg} ${escapeHtml(d.stat)} per game to ${escapeHtml(d.pos)} · rank ${d.rank} of ${d.of}
        <div class="corr-why">${soft ? "Soft matchup (top 10 allowed)." : "Tougher matchup."}</div>
      </div>`;
    })()}
    </div>
    <div class="pop-pane" data-pop-pane="lines" hidden>
    ${newsBlock}
    ${focus.fantasy_cmp ? `<div class="corr-why" style="margin-bottom:8px">
      Scoring convert: ${
        focus.fantasy_cmp.mode === "ppr_vs_half"
          ? `football PPR vs half-PPR using true rec avg ${focus.fantasy_cmp.recs}`
          : focus.fantasy_cmp.mode === "ppr_vs_half_no_recs"
            ? "football PPR vs half-PPR (no receptions true line yet)"
            : focus.fantasy_cmp.mode === "mlb_hitter"
              ? `MLB convert using true avgs BB ${focus.fantasy_cmp.walks ?? 0} / 2B ${focus.fantasy_cmp.doubles ?? 0} / SB ${focus.fantasy_cmp.steals ?? 0}`
              : focus.fantasy_cmp.mode === "mlb_hitter_no_avgs"
                ? "MLB scorer differs on BB / 2B / SB — no true lines yet"
                : "same scoring"
      }.
      PP ${focus.fantasy_cmp.pp ?? "—"} · UD ${focus.fantasy_cmp.ud ?? "—"}
      · UD as PP ${focus.fantasy_cmp.ud_as_pp ?? "—"}
      · PP as UD ${focus.fantasy_cmp.pp_as_ud ?? "—"}.
    </div>` : ""}
    ${lineBoardHtml(quoteRows, focus)}
    <div style="margin:12px 0 8px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="tab on" id="popupSlip">Add to PP slip</button>
      <a class="tab" href="${ppSlipLink(focus)}" target="_blank" rel="noopener">Open this pick in PrizePicks</a>
    </div>
    ${kProps.length ? `<h4 style="margin:16px 0 8px">Kalshi volume</h4>
      <table class="popup-table">
        <thead><tr><th>Market</th><th>Yes ¢</th><th>$ Vol</th><th>% game</th></tr></thead>
        <tbody>${kProps.slice(0, 8).map((m) => `<tr>
          <td>${escapeHtml((m.title || "").slice(0, 64))}</td>
          <td>${m.implied != null ? m.implied + "¢" : "—"}</td>
          <td>${moneyShort(m.dollar) || "—"}</td>
          <td>${m.pct_event != null ? m.pct_event + "%" : "—"}</td>
        </tr>`).join("")}</tbody>
      </table>` : ""}
    ${others.length ? `<h4 style="margin:16px 0 8px">Other standard-ish lines</h4>
    <div class="corr-why">Click a row to open that bet.</div>
    <table class="popup-table">
      <thead><tr><th>Stat</th><th>Side</th><th>Line</th><th>% to hit</th></tr></thead>
      <tbody>
        ${others.slice(0, 20).map((r) => `<tr class="popup-line" role="button" data-player="${escapeHtml(r.player)}" data-event="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || r.stat || "")}" data-side="${escapeHtml(r.side || "")}">
          <td>${escapeHtml(r.stat)}</td><td>${escapeHtml(r.side)}</td>
          <td>${displayLine(r) ?? "—"}</td><td>${(() => { const p = hitPct(r); return p != null ? p.toFixed(1) + "%" : "—"; })()}</td>
        </tr>`).join("")}
      </tbody>
    </table>` : ""}
    </div>
    </div>
  `;
  $("popup").hidden = false;
  $("popupClose").onclick = closePopup;
  const slipBtn = $("popupSlip");
  if (slipBtn) slipBtn.onclick = () => addToSlip(focus);
  if (state.popupTab && state.popupTab !== "bet") {
    $("popupCard")?.querySelectorAll("[data-pop-tab]").forEach((b) => b.classList.toggle("on", b.dataset.popTab === state.popupTab));
    $("popupCard")?.querySelectorAll("[data-pop-pane]").forEach((p) => { p.hidden = p.dataset.popPane !== state.popupTab; });
  }
}

document.addEventListener("click", (e) => {
  const line = e.target.closest("tr.popup-line");
  if (line) {
    openPlayerPopup(line.dataset.player, line.dataset.event, line.dataset.market, line.dataset.side);
    return;
  }
  const injHead = e.target.closest(".preview-inj-head");
  if (injHead) {
    const body = injHead.parentElement?.querySelector(".preview-inj-body");
    if (body) body.hidden = !body.hidden;
    injHead.classList.toggle("open", body && !body.hidden);
    return;
  }
  const pick = e.target.closest("#previewList .preview-game");
  if (pick?.dataset.game) {
    state.previewGame = pick.dataset.game;
    renderPreview();
    return;
  }
  const intelBtn = e.target.closest("#injBody .player-btn, #logsBody .player-btn, #previewMain .player-btn");
  if (intelBtn?.dataset.player) {
    openPlayerPopup(intelBtn.dataset.player, intelBtn.dataset.eid || "", intelBtn.dataset.market || "", intelBtn.dataset.side || "");
  }
});

$("tbody").addEventListener("click", (e) => {
  const add = e.target.closest(".slip-add");
  if (add) {
    const all = state.data?.props || [];
    const player = add.dataset.player;
    const side = add.dataset.side;
    const stat = add.dataset.stat || "";
    const line = String(add.dataset.line ?? "");
    const eid = add.dataset.eid || "";
    const row = all.find((r) => r.player === player && r.side === side && String(r.stat) === stat && String(r.line ?? "") === line && (!eid || r.event_id === eid))
      || all.find((r) => r.player === player && r.side === side && String(r.stat) === stat && String(r.line ?? "") === line);
    if (row) addToSlip(row);
    else toast("Could not find that prop");
    return;
  }
  const liked = e.target.closest("[data-pick]");
  if (liked) {
    try { togglePick(JSON.parse(decodeURIComponent(liked.getAttribute("data-pick")))); } catch (_) {}
    return;
  }
  const btn = e.target.closest(".player-btn");
  if (!btn) return;
  openPlayerPopup(btn.dataset.player, btn.dataset.eid, btn.dataset.market, btn.dataset.side);
});
$("slipList")?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-slip]");
  if (!btn) return;
  state.slip.splice(Number(btn.dataset.slip), 1);
  renderSlip();
});
document.addEventListener("click", (e) => {
  const size = e.target.closest("[data-slip-size]");
  if (size) {
    state.slipSize = Number(size.dataset.slipSize);
    renderSlip();
    return;
  }
  if (e.target.closest("#slipClear")) {
    state.slip = [];
    renderSlip();
    toast("Slip cleared");
  }
});
$("popup")?.addEventListener("click", (e) => {
  const liked = e.target.closest("[data-pick]");
  if (liked) {
    try { togglePick(JSON.parse(decodeURIComponent(liked.getAttribute("data-pick")))); } catch (_) {}
    return;
  }
  if (e.target.id === "popup") closePopup();
  const more = e.target.closest("[data-chart-more]");
  if (more) {
    state.popupChartAll = more.dataset.chartMore !== "less";
    state.popupTab = "chart";
    const [player, eventId, market, side] = (state.popupKey || "").split("|");
    if (player) openPlayerPopup(player, eventId, market, side);
    return;
  }
  const tab = e.target.closest("[data-pop-tab]");
  if (!tab) return;
  const name = tab.dataset.popTab;
  state.popupTab = name;
  $("popupCard")?.querySelectorAll("[data-pop-tab]").forEach((b) => b.classList.toggle("on", b === tab));
  $("popupCard")?.querySelectorAll("[data-pop-pane]").forEach((p) => { p.hidden = p.dataset.popPane !== name; });
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopup(); });

function hideFlagTip() {
  const tip = $("flagTip");
  if (tip) tip.hidden = true;
}
document.addEventListener("mouseover", (e) => {
  const flag = e.target.closest?.(".flag");
  const tip = $("flagTip");
  if (!flag || !tip) return;
  const src = flag.querySelector(".tip-src");
  if (!src) return;
  tip.innerHTML = src.innerHTML;
  tip.hidden = false;
  const r = flag.getBoundingClientRect();
  const tw = tip.offsetWidth || 220;
  const left = Math.min(window.innerWidth - tw - 8, Math.max(8, r.left));
  const top = r.bottom + 8;
  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest?.(".flag") && !e.relatedTarget?.closest?.(".flag") && !e.relatedTarget?.closest?.("#flagTip")) {
    hideFlagTip();
  }
});
document.addEventListener("scroll", hideFlagTip, true);

const LOAD_LINES = [
  "Warming up the slate…",
  "Checking the books…",
  "Hiking the props…",
  "Sharpening the edges…",
  "Two-minute drill…",
];

let loaderHold = false;
function setLoader(msg) {
  const el = $("loaderText");
  if (el && msg) el.textContent = msg;
}
function showLoader(msg) {
  const el = $("loader");
  if (!el) return;
  loaderHold = true;
  if (msg) setLoader(msg);
  el.classList.remove("out");
  el.hidden = false;
}
function hideLoader() {
  const el = $("loader");
  loaderHold = false;
  if (!el) return;
  el.classList.add("out");
}
function sportLoadLabel() {
  const sport = ($("sport")?.value || state.sport || "all").toLowerCase();
  if (sport === "all") return "every sport";
  return SPORT_LABEL[sport] || sport.toUpperCase();
}
function whenLoadLabel() {
  const sel = $("when");
  const v = sel?.value || "";
  if (!v) return "every date";
  if (v === "today") return "today";
  if (v === "tomorrow") return "tomorrow";
  return sel?.selectedOptions?.[0]?.textContent?.trim() || "that date";
}
function paintThen(msg, fn) {
  showLoader(msg);
  requestAnimationFrame(() => setTimeout(() => {
    try { fn(); } finally { hideLoader(); }
  }, 40));
}

let lineIdx = 0;
const lineTimer = setInterval(() => {
  if (loaderHold) return;
  lineIdx = (lineIdx + 1) % LOAD_LINES.length;
  setLoader(LOAD_LINES[lineIdx]);
}, 700);

function tagSport(data, sport) {
  const props = (data?.props || []).map((r) => ({ ...r, sport: r.sport || sport }));
  const games = (data?.games || []).map((g) => ({ ...g, sport: g.sport || sport }));
  return { ...data, props, games };
}

async function fetchBoard(url, version) {
  const full = version ? `${url}?v=${encodeURIComponent(version)}` : url;
  const res = await fetch(full, { cache: "no-cache" });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

let loadGen = 0;
async function loadData() {
  const gen = ++loadGen;
  showLoader(`Loading ${sportLoadLabel()}…`);
  await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 30)));
  if (gen !== loadGen) return;
  try {
    setLoader("Checking the books…");
    let version = "";
    try {
      const meta = await fetch("./data/meta.json", { cache: "no-cache" }).then((r) => r.ok ? r.json() : null);
      version = meta?.updated || "";
    } catch (_) {}
    if (gen !== loadGen) return;
    setLoader("Hiking the props…");
    try {
      state.intel = await fetchBoard(INTEL_URL, version);
    } catch (_) {
      state.intel = null;
    }
    try {
      state.nbaIntel = await fetchBoard(NBA_INTEL_URL, version);
    } catch (_) {
      state.nbaIntel = null;
    }
    setLoader("Pulling NBA game logs…");
    loadNbaLogs();
    const sport = $("sport")?.value || state.sport || "all";
    state.sport = sport;
    state.boardCache = state.boardCache || {};
    const HEAVY = new Set(["soccer", "nba"]);
    let keys = sport === "all"
      ? Object.keys(DATA_URLS).filter((k) => !HEAVY.has(k))
      : [sport];
    const pull = async (list) => {
      const missing = list.filter((k) => !state.boardCache[k]);
      if (!missing.length) return;
      const results = await Promise.allSettled(missing.map((k) => fetchBoard(DATA_URLS[k], version)));
      results.forEach((res, i) => {
        const key = missing[i];
        state.boardCache[key] = res.status === "fulfilled"
          ? tagSport(res.value, SPORT_LABEL[key] || key.toUpperCase())
          : { props: [], games: [], kalshi: {} };
      });
    };
    await pull(keys);
    if (gen !== loadGen) return;
    const liveCount = (list) => list.reduce((n, k) => {
      const props = state.boardCache[k]?.props || [];
      return n + props.filter((r) => !hasStarted(r.commence_time)).length;
    }, 0);
    if (sport === "all" && liveCount(keys) === 0) {
      const extra = [...HEAVY].filter((k) => DATA_URLS[k] && !keys.includes(k));
      if (extra.length) {
        setLoader("Loading the live slate…");
        await pull(extra);
        keys = keys.concat(extra);
      }
    }
    if (gen !== loadGen) return;
    const boards = keys.map((k) => state.boardCache[k] || { props: [], games: [], kalshi: {} });
    const newest = boards.map((b) => b.updated).filter(Boolean).sort().at(-1);
    state.data = {
      updated: newest,
      sport: sport === "all" ? "ALL" : (SPORT_LABEL[sport] || sport.toUpperCase()),
      props: boards.flatMap((b) => b.props || []),
      games: boards.flatMap((b) => b.games || []),
      kalshi: {
        ml: boards.flatMap((b) => b.kalshi?.ml || []),
        spread: boards.flatMap((b) => b.kalshi?.spread || []),
        total: boards.flatMap((b) => b.kalshi?.total || []),
        props: boards.flatMap((b) => b.kalshi?.props || []),
      },
    };
    state.liveProps = (state.data.props || []).filter((r) => !hasStarted(r.commence_time));
    restoreSlip();
    state.uiReady = false;
    setLoader("Building the board…");
    render(true);
  } catch (err) {
    if (gen !== loadGen) return;
    $("updated").textContent = "Could not load props JSON";
    $("empty").style.display = "block";
    $("empty").textContent = "No data yet. Run the GitHub Action.";
    console.error(err);
  } finally {
    if (gen === loadGen) {
      clearInterval(lineTimer);
      hideLoader();
    }
  }
}

document.addEventListener("click", (e) => {
  const rm = e.target.closest("[data-bet-i]");
  if (rm && e.target.closest("#betsPanel")) {
    state.picks.splice(Number(rm.dataset.betI), 1);
    savePicks();
    updateBetsTab();
    renderBets();
    return;
  }
  if (e.target.closest("#betsClear")) {
    state.picks = [];
    savePicks();
    updateBetsTab();
    renderBets();
    toast("My Bets cleared");
  }
});

restorePicks();
updateBetsTab();
loadData();
