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
  booksOn: new Set(DEFAULT_ON),
  slip: [],
  previewGame: "",
  minBooks: true,
};

const $ = (id) => document.getElementById(id);

function american(price) {
  if (price == null || price === "") return "—";
  const n = Number(price);
  if (Number.isNaN(n)) return "—";
  return n > 0 ? `+${Math.round(n)}` : String(Math.round(n));
}

function pickSize() { return Number($("picks").value || 5); }
function breakEven() { return PP_BE[pickSize()] || 54.93; }

function rowEdge(row) {
  if (row.pct_to_hit == null) return null;
  return +(row.pct_to_hit - breakEven()).toFixed(1);
}

function pctClass(pct) {
  if (pct == null) return "pct";
  if (pct >= breakEven()) return "pct good";
  if (pct >= breakEven() - 2) return "pct ok";
  return "pct bad";
}

function fmtWhen(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

function hasStarted(iso) {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return t <= Date.now();
}

function ymdLocal(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function shiftYmd(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dateLabel(ymd) {
  if (!ymd) return "";
  const d = new Date(`${ymd}T12:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function matchesWhen(iso) {
  const sel = $("when")?.value || "";
  if (!sel) return true;
  const day = ymdLocal(iso);
  if (!day) return false;
  if (sel === "today") return day === ymdLocal();
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

function abbr(team) { return TEAM_ABBR[team] || team || ""; }

function matchup(row) {
  const away = abbr(row.away_team);
  const home = abbr(row.home_team);
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

function intelLogs(gsis) {
  if (!gsis) return [];
  return state.intel?.logs?.[gsis] || [];
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
  return { L5: last(5), L10: last(10), L15: last(15), L20: last(20), home, away, all: pack("Avg", vals) };
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
  const home = abbr(focus.home_team);
  const away = abbr(focus.away_team);
  if (team && home && team === home) return away;
  if (team && away && team === away) return home;
  return "";
}

function renderSplitChart(focus, recs) {
  if (!recs.length || !focus?.stat) return "";
  const splits = splitStats(recs, focus.stat, focus.line, focus.side);
  if (!splits) return "";
  const opp = vsOppSplit(recs, focus.stat, focus.line, focus.side, upcomingOpp(focus));
  const rows = [splits.L5, splits.L10, splits.L15, splits.L20, splits.home, splits.away, opp, splits.all].filter(Boolean);
  const maxAvg = Math.max(...rows.map((r) => r.avg || 0), Number(focus.line) || 0, 1);
  return `<h4 style="margin:16px 0 8px">Trend vs ${escapeHtml(focus.side || "")} ${focus.line ?? ""} ${escapeHtml(focus.stat || "")}</h4>
    <div class="split-note">${state.intel?.has_2026_logs ? "" : "2025 logs until Week 1 · "}hit rate ignores pushes</div>
    <div class="split-chart">
      ${rows.map((r) => {
        const w = r.avg == null ? 0 : Math.max(4, Math.round((r.avg / maxAvg) * 100));
        const hw = r.hit == null ? 0 : r.hit;
        return `<div class="split-row">
          <div class="split-lab">${escapeHtml(r.label)}<span>${r.n}g</span></div>
          <div class="split-bars">
            <div class="split-bar"><i style="width:${w}%"></i><em>avg ${r.avg ?? "—"}</em></div>
            <div class="split-bar hit"><i style="width:${hw}%"></i><em>hit ${r.hit == null ? "—" : r.hit + "%"}</em></div>
          </div>
        </div>`;
      }).join("")}
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

function bookOffer(row, key) {
  const meta = BOOK_BY_KEY[key];
  if (meta?.dfs) {
    const src = row.dfs?.[key] || null;
    if (!src) return null;
    if (key === "prizepicks") return { ...src, price: -117 };
    return src;
  }
  const books = mergeBooks(row.books);
  return books[key] || row.books?.[key] || null;
}

function applyFilters(rows) {
  const game = $("game").value;
  const stat = $("stat").value;
  const side = $("side").value;
  const tier = $("tier").value;
  const minPct = Number($("minPct").value || 0);
  const q = $("q").value.trim().toLowerCase();
  const be = breakEven();

  return rows.filter((r) => {
    if (state.view === "pp" && !r.dfs?.prizepicks) return false;
    if (state.view === "ud" && !r.dfs?.underdog) return false;
    if (state.view === "pick6" && !r.dfs?.pick6) return false;
    if (state.view === "prophetx" && !r.books?.prophetx) return false;
    if (state.view === "novig" && !r.books?.novig) return false;
    if (state.view === "ev" && !(r.pct_to_hit >= be)) return false;
    if (state.view === "pp" || state.view === "pick6" || state.view === "ev") {
      if (tier === "standard" && ((r.pp_tier && r.pp_tier !== "Standard") || r.is_alternate)) return false;
      if (tier === "demon" && r.pp_tier !== "Demon") return false;
      if (tier === "goblin" && r.pp_tier !== "Goblin") return false;
      if (tier === "alternate" && r.pp_tier !== "Alternate" && !r.is_alternate) return false;
    }
    if (hasStarted(r.commence_time)) return false;
    if (!matchesWhen(r.commence_time)) return false;
    if (state.minBooks && !isFantasyStat(r.stat) && sportsbookCount(r) < 2) return false;
    if (game && r.game !== game) return false;
    if (stat && r.stat !== stat) return false;
    if (side === "ou" && r.side !== "Over" && r.side !== "Under") return false;
    if (side && side !== "ou" && side !== "all" && r.side !== side) return false;
    if (r.pct_to_hit != null && r.pct_to_hit < minPct) return false;
    if (q && !`${r.player} ${r.stat} ${r.game} ${r.side}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

function sortRows(rows) {
  const dir = state.sortDir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    let va = a[state.sortKey];
    let vb = b[state.sortKey];
    if (state.sortKey === "ev") { va = rowEdge(a); vb = rowEdge(b); }
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
}

function displayLine(row) {
  if (state.view === "pp" && row.dfs?.prizepicks?.line != null) return row.dfs.prizepicks.line;
  if (state.view === "ud" && row.dfs?.underdog?.line != null) return row.dfs.underdog.line;
  if (state.view === "pick6" && row.dfs?.pick6?.line != null) return row.dfs.pick6.line;
  if (state.view === "prophetx" && row.books?.prophetx?.line != null) return row.books.prophetx.line;
  if (state.view === "novig" && row.books?.novig?.line != null) return row.books.novig.line;
  return row.line;
}

function fantasyNote(row) {
  const f = row.fantasy_cmp;
  if (!f || !/fantasy/i.test(row.stat || "")) return "";
  const bits = [];
  if (f.recs != null) bits.push(`${f.recs} rec`);
  if (f.walks != null) bits.push(`${f.walks} bb`);
  if (f.doubles != null) bits.push(`${f.doubles} 2b`);
  if (f.steals != null) bits.push(`${f.steals} sb`);
  const extra = bits.length ? ` · ${bits.join(" / ")}` : "";
  if (state.view === "pp" && f.ud != null && f.ud_as_pp != null) {
    const txt = Number(f.ud) === Number(f.ud_as_pp) ? `UD ${f.ud}` : `UD ${f.ud} → ${f.ud_as_pp} PP`;
    return `<div class="line-note">${txt}${extra}</div>`;
  }
  if (state.view === "ud" && f.pp != null && f.pp_as_ud != null) {
    const txt = Number(f.pp) === Number(f.pp_as_ud) ? `PP ${f.pp}` : `PP ${f.pp} → ${f.pp_as_ud} UD`;
    return `<div class="line-note">${txt}${extra}</div>`;
  }
  return "";
}

function bookCell(row, key) {
  const src = bookOffer(row, key);
  if (!src) return `<td class="muted">—</td>`;
  const shown = displayLine(row);
  const cmp = row.fantasy_cmp;
  let offerLine = src.line;
  if (cmp && /fantasy/i.test(row.stat || "")) {
    if (state.view === "pp" && key === "underdog" && cmp.ud_as_pp != null) offerLine = cmp.ud_as_pp;
    if (state.view === "ud" && key === "prizepicks" && cmp.pp_as_ud != null) offerLine = cmp.pp_as_ud;
  }
  const same = offerLine == null || shown == null || Number(offerLine) === Number(shown);
  const note = same ? "" : `<div class="line-note">${offerLine}</div>`;
  return `<td class="price">${american(src.price)}${note}</td>`;
}

function fillWhen(all) {
  const sel = $("when");
  if (!sel) return;
  const current = sel.value;
  const days = unique((all || []).map((r) => ymdLocal(r.commence_time)).filter(Boolean)).sort();
  sel.innerHTML = [
    ["", "All dates"],
    ["today", "Today"],
    ["tomorrow", "Tomorrow"],
    ...days.map((d) => [d, dateLabel(d)]),
  ].map(([v, lab]) => `<option value="${escapeHtml(v)}">${escapeHtml(lab)}</option>`).join("");
  if ([...sel.options].some((o) => o.value === current)) sel.value = current;
}

function fillSelect(sel, values, allLabel) {
  const current = sel.value;
  sel.innerHTML = `<option value="">${allLabel}</option>` +
    values.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
  if ([...sel.options].some((o) => o.value === current)) sel.value = current;
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

function tierBadge(tier) {
  if (!tier) return `<span class="muted">—</span>`;
  const cls = tier === "Demon" ? "tier demon" : tier === "Goblin" ? "tier goblin" : tier === "Alternate" ? "tier alt" : "tier std";
  return `<span class="${cls}">${tier}</span>`;
}

function bestCell(row) {
  const b = row.best;
  if (!b) return `<td class="muted">—</td>`;
  const meta = BOOK_BY_KEY[b.book];
  const mark = meta ? bookMark(meta, "sm") : `<span class="muted">${escapeHtml(b.book)}</span>`;
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

function kalshiMatch(list, game) {
  const blob = `${game.away_team || ""} ${game.home_team || ""} ${game.game || ""}`.toLowerCase();
  const bits = blob.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  const hits = (list || []).filter((m) => {
    const t = (m.title || "").toLowerCase();
    return bits.filter((w) => t.includes(w)).length >= 1;
  });
  return hits[0] || null;
}
function kalshiCell(list, game) {
  const hit = typeof game === "string" ? (list || []).find((m) => (m.title || "").toLowerCase().includes(game.toLowerCase())) : kalshiMatch(list, game || {});
  if (!hit) return `<span class="muted">—</span>`;
  const px = hit.implied != null ? `${hit.implied}¢` : "—";
  const vol = hit.volume != null ? ` · ${Math.round(hit.volume)}` : "";
  return `<div class="price">${px}${vol}</div><div class="line-note">${escapeHtml((hit.title || "").slice(0, 42))}</div>`;
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
  if (!raw || raw.startsWith("http")) return "";
  return raw;
}
function ppSlipLink(rows) {
  const list = Array.isArray(rows) ? rows : [rows];
  const ids = list.map(ppId).filter(Boolean);
  if (!ids.length) return "https://app.prizepicks.com/";
  if (ids.length === 1) return `https://app.prizepicks.com/?projection=${encodeURIComponent(ids[0])}`;
  return `https://app.prizepicks.com/?projections=${encodeURIComponent(ids.join(","))}`;
}
function renderSlip() {
  const bar = $("slipBar");
  if (!bar) return;
  bar.hidden = state.section === "games" || state.slip.length === 0;
  if ($("slipCount")) $("slipCount").textContent = String(state.slip.length);
  if ($("slipPicks")) {
    $("slipPicks").innerHTML = state.slip.map((r, i) =>
      `<button type="button" class="book-pick on" data-slip="${i}">${escapeHtml(r.player)} ${escapeHtml(r.side)} ${r.line ?? ""} ✕</button>`
    ).join("");
  }
  const open = $("slipOpen");
  if (open) {
    open.href = ppSlipLink(state.slip);
  }
}
function addToSlip(row) {
  if (state.slip.length >= 6) return;
  const sig = `${row.player}|${row.stat}|${row.side}|${row.line}`;
  if (state.slip.some((r) => `${r.player}|${r.stat}|${r.side}|${r.line}` === sig)) return;
  state.slip.push(row);
  renderSlip();
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
  $("gamesBody").innerHTML = ranked.map((g) => {
    const edge = g.edge;
    return `<tr>
      <td><div class="player">${escapeHtml(g.game)}</div><div class="game"><span class="sport-tag">${escapeHtml(g.sport || "")}</span> ${escapeHtml(fmtWhen(g.commence_time))}</div></td>
      <td class="line-stack"><div class="line-num">${g.spread ?? "—"}</div>${g.spread_proj != null ? `<div class="line-note">proj ${g.spread_proj}</div>` : ""}</td>
      <td class="line-stack"><div class="line-num">${g.total ?? "—"}</div>${g.total_proj != null ? `<div class="line-note">proj ${g.total_proj}</div>` : ""}</td>
      <td class="price">${american(g.ml_away)}<div class="line-note">${bookImplied(g.ml_away) != null ? bookImplied(g.ml_away).toFixed(1) + "%" : ""}</div></td>
      <td class="price">${american(g.ml_home)}<div class="line-note">${bookImplied(g.ml_home) != null ? bookImplied(g.ml_home).toFixed(1) + "%" : ""}</div></td>
      <td>${kalshiCell(k.ml, g)}</td>
      <td>${kalshiCell(k.spread, g)}</td>
      <td>${kalshiCell(k.total, g)}</td>
      <td class="${edge != null && edge >= 0 ? "" : "muted"}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}</td>
    </tr>`;
  }).join("");
  $("gamesEmpty").style.display = games.length ? "none" : "block";
  $("count").textContent = `${games.length} games · Kalshi ML ${(k.ml || []).length}`;
  renderSlip();
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
  const previewOn = state.section === "preview";
  document.querySelectorAll(".tab[data-view]").forEach((b) => b.classList.toggle("on", !previewOn && b.dataset.view === state.view));
  document.querySelectorAll(".tab[data-section]").forEach((b) => b.classList.toggle("on", b.dataset.section === state.section));
}

function gameKeyOf(row) {
  return row.game || `${row.away_team || ""} @ ${row.home_team || ""}`.trim();
}

function upcomingGames() {
  const all = state.data?.props || [];
  const map = new Map();
  all.forEach((r) => {
    if (hasStarted(r.commence_time)) return;
    if (!matchesWhen(r.commence_time)) return;
    const key = gameKeyOf(r);
    if (!key || map.has(key)) return;
    map.set(key, r);
  });
  return [...map.values()].sort((a, b) => String(a.commence_time || "").localeCompare(String(b.commence_time || "")));
}

function rowsForGame(game) {
  return (state.data?.props || []).filter((r) => gameKeyOf(r) === game && !hasStarted(r.commence_time));
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
  const teams = [abbr(sample.away_team), abbr(sample.home_team), sample.nfl_team].filter(Boolean);
  const names = new Set(rowsForGame(gameKeyOf(sample)).map((r) => normName(r.player)));
  const rank = (s) => {
    const t = String(s || "").toLowerCase();
    if (t.includes("out") || t === "ir") return 0;
    if (t.includes("doubt")) return 1;
    if (t.includes("question")) return 2;
    return 3;
  };
  return (state.intel?.injuries || []).filter((inj) => {
    if (teams.includes(inj.team)) return true;
    return names.has(normName(inj.name));
  }).sort((a, b) => rank(a.report_status) - rank(b.report_status) || String(a.name).localeCompare(String(b.name))).slice(0, 20);
}

function bestGameBook(books, market, side) {
  let best = null;
  Object.entries(books || {}).forEach(([k, pack]) => {
    const rec = pack?.[market];
    const price = rec?.[side];
    if (price == null) return;
    const book = canonBook(k);
    if (!best || Number(price) > Number(best.price)) best = { book, price, line: rec.line };
  });
  return best;
}

function marketSideCard(label, best, hot) {
  const meta = best ? BOOK_BY_KEY[best.book] : null;
  const book = best
    ? `${meta ? `${bookMark(meta, "sm")} ` : ""}${escapeHtml(meta?.name || best.book)} <b>${american(best.price)}</b>`
    : `<span class="muted">No price</span>`;
  return `<div class="gm-side ${hot ? "hot" : ""}">
    <div class="gm-line">${escapeHtml(label)}</div>
    <div class="gm-book">${book}</div>
  </div>`;
}

function previewGameMarkets(sample) {
  const listed = (state.data?.games || []).find((g) =>
    gameKeyOf(g) === gameKeyOf(sample) || (g.home_team === sample.home_team && g.away_team === sample.away_team)
  ) || sample;
  const home = abbr(listed.home_team) || listed.home_team || "Home";
  const away = abbr(listed.away_team) || listed.away_team || "Away";
  const books = listed.books || {};
  const hasBooks = Object.keys(books).length > 0;
  const n = listed.spread != null ? Number(listed.spread) : null;
  const t = listed.total != null ? Number(listed.total) : null;
  const homeSpread = n == null ? home : (n > 0 ? `${home} +${n}` : `${home} ${n}`);
  const awaySpread = n == null ? away : (n > 0 ? `${away} ${-n}` : `${away} +${Math.abs(n)}`);
  const rows = [];
  if (n != null || bestGameBook(books, "spread", "home") || bestGameBook(books, "spread", "away")) {
    rows.push({
      market: "Spread",
      a: homeSpread,
      b: awaySpread,
      oa: bestGameBook(books, "spread", "home"),
      ob: bestGameBook(books, "spread", "away"),
      leanA: listed.spread_proj != null && n != null ? Number(listed.spread_proj) < n : null,
    });
  }
  if (t != null || bestGameBook(books, "total", "over") || bestGameBook(books, "total", "under")) {
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
  if (listed.ml_home != null || listed.ml_away != null || mlHome || mlAway) {
    rows.push({
      market: "Moneyline",
      a: `${home} ${listed.ml_home != null ? american(listed.ml_home) : ""}`.trim(),
      b: `${away} ${listed.ml_away != null ? american(listed.ml_away) : ""}`.trim(),
      oa: mlHome || (listed.ml_home != null ? { book: "consensus", price: listed.ml_home } : null),
      ob: mlAway || (listed.ml_away != null ? { book: "consensus", price: listed.ml_away } : null),
      leanA: listed.ml_home != null && listed.ml_away != null ? Number(listed.ml_home) < Number(listed.ml_away) : null,
    });
  }
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
            ${marketSideCard(r.a, r.oa, hotA)}
            ${marketSideCard(r.b, r.ob, hotB)}
          </div>
        </div>`;
      }).join("")}
    </div>
    <div class="corr-why">${hasBooks ? "Each market is a column. Left / right inside it are the two sides. Green = lean." : "Run Update NFL Props so per-book game odds are written into the JSON."}</div>
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
  const inj = previewInjuries(sample);
  const news = previewNews(sample);
  const listed = (state.data?.games || []).find((g) =>
    gameKeyOf(g) === gameKeyOf(sample) || (g.home_team === sample.home_team && g.away_team === sample.away_team)
  ) || sample;
  const homeAbbr = abbr(sample.home_team);
  const loc = STADIUMS[homeAbbr] || (sample.broadcasts ? String(sample.broadcasts) : `${sample.home_team || "Home"} stadium`);
  const lineBits = [
    sample.spread != null ? `<div class="preview-chip"><b>Spread</b>${escapeHtml(scriptLine(sample).split(" · ")[0] || String(sample.spread))}</div>` : "",
    sample.total != null ? `<div class="preview-chip"><b>Total</b>O/U ${Number(sample.total)}</div>` : "",
    listed.ml_away != null || listed.ml_home != null ? `<div class="preview-chip"><b>Moneyline</b>${escapeHtml(abbr(sample.away_team))} ${american(listed.ml_away)} · ${escapeHtml(abbr(sample.home_team))} ${american(listed.ml_home)}</div>` : "",
    sample.spread_proj != null ? `<div class="preview-chip"><b>Spread proj</b>${sample.spread_proj}</div>` : "",
    sample.total_proj != null ? `<div class="preview-chip"><b>Total proj</b>${sample.total_proj}</div>` : "",
  ].join("");
  main.innerHTML = `
    <div class="preview-hero">
      <div class="sport-tag">${escapeHtml(sample.sport || "")}</div>
      <h2>${escapeHtml(matchup(sample) || state.previewGame)}</h2>
      <div class="game">${escapeHtml(fmtWhen(sample.commence_time))}${sample.broadcasts ? ` · ${escapeHtml(sample.broadcasts)}` : ""}</div>
      <div class="script">${escapeHtml(loc)}</div>
      <div class="preview-lines">${lineBits || `<span class="muted">No consensus game line yet</span>`}</div>
    </div>
    ${previewGameMarkets(sample)}
    <div class="preview-grid">
      <div class="preview-card">
        <h3>Best props</h3>
        ${best.length ? best.map(({ r, edge }) => `<div class="preview-prop">
          <div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">${escapeHtml(r.player)} ${escapeHtml(r.side)} ${r.line ?? ""} ${escapeHtml(r.stat)}</button></div>
          <span class="${pctClass(r.pct_to_hit)}">${r.pct_to_hit?.toFixed(1)}%${edge == null ? "" : ` · ${edge > 0 ? "+" : ""}${edge.toFixed(1)}`}</span>
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
    <div class="preview-grid">
      <div class="preview-card">
        <h3>Injuries / availability</h3>
        ${inj.length ? inj.map((r) => `<div class="preview-inj">
          <button type="button" class="preview-inj-head" data-inj="1">
            <div class="player-row">${headshotTag(r.headshot)}
              <div>
                <span class="player">${escapeHtml(r.name || "")}</span>
                <div class="corr-why">${escapeHtml(r.team || "")} · ${escapeHtml(r.pos || "")}</div>
              </div>
            </div>
            ${injPill({ status: r.report_status, injury: r.report_injury }) || "—"}
          </button>
          <div class="preview-inj-body" hidden>
            <div>${escapeHtml(r.report_injury || r.practice_injury || "No injury detail")}</div>
            <div class="corr-why">Practice: ${escapeHtml(r.practice_status || "—")}${r.practice_injury ? ` · ${escapeHtml(r.practice_injury)}` : ""}</div>
            <div class="corr-why">${r.season || ""}w${r.week || ""} · click name in logs for full card</div>
            <button type="button" class="player-btn" data-player="${escapeHtml(r.name || "")}">Open ${escapeHtml(r.name || "")} popup</button>
          </div>
        </div>`).join("") : `<div class="muted">${sample.sport === "NFL" || !sample.sport ? "No matching injury rows." : "Injury feed is NFL-only right now."}</div>`}
      </div>
      <div class="preview-card">
        <h3>News</h3>
        ${news.length ? news.map((n) => `<div class="preview-prop">
          <div><a class="player-btn" href="${escapeHtml(n.url || "#")}" target="_blank" rel="noopener">${escapeHtml(n.headline || "")}</a>
          <div class="corr-why">${escapeHtml(n.source || "")} · ${escapeHtml(n.published || "")}</div></div>
        </div>`).join("") : `<div class="muted">No tagged headlines for this matchup.</div>`}
      </div>
    </div>`;
  $("count").textContent = `${shown.length} games · ${rows.length} props`;
  $("updated").textContent = `Updated ${fmtWhen(state.data?.updated)} · BE ${breakEven()}%`;
}

function renderIntelSections() {
  const intel = ["news", "injuries", "logs"].includes(state.section);
  const propsWrap = document.querySelector(".table-wrap:not(#gamesWrap):not(#newsWrap):not(#injWrap):not(#logsWrap)");
  const books = document.querySelector(".books-bar");
  const filt = document.querySelector(".filters");
  if (propsWrap) propsWrap.style.display = (state.section === "props") ? "block" : "none";
  if (books) books.style.display = state.section === "props" ? "flex" : "none";
  if (filt) [...filt.querySelectorAll("select, label, input")].forEach((el) => {
    if (el.id === "sport" || el.id === "section" || el.id === "q") return;
    if (el.id === "when") {
      el.style.display = intel || state.section === "stacks" ? "none" : "";
      return;
    }
    el.style.display = intel || state.section === "games" || state.section === "stacks" || state.section === "preview" ? "none" : "";
  });
  renderTicker();
  renderNews();
  renderInjuries();
  renderLogs();
  renderStacks();
  renderPreview();
  return intel;
}

function render() {
  if (!state.data && !state.intel) return;
  syncTabs();
  renderIntelSections();
  renderGames();
  const all = state.data?.props || [];
  fillWhen(all);
  if (state.section !== "props") return;
  if (!state.data) return;
  $("updated").textContent = `Updated ${fmtWhen(state.data.updated)} · BE ${breakEven()}%`;
  fillSelect($("game"), unique(all.map((r) => r.game)).sort(), "All games");
  const stats = unique(all.map((r) => r.stat));
  const coreFirst = [...stats.filter((s) => CORE_STATS.has(s)).sort(), ...stats.filter((s) => !CORE_STATS.has(s)).sort()];
  fillSelect($("stat"), coreFirst, "All props");

  renderBookPicks();
  renderHead();

  const rows = sortRows(applyFilters(all));
  $("count").textContent = `${rows.length.toLocaleString()} shown`;

  if (!rows.length) {
    $("tbody").innerHTML = "";
    $("empty").style.display = "block";
    return;
  }
  $("empty").style.display = "none";
  const cols = visibleBooks();
  $("tbody").innerHTML = rows.map((r) => {
    const sideClass = r.side === "Over" || r.side === "Yes" ? "over" : (r.side === "Under" || r.side === "No" ? "under" : "");
    const lineTxt = displayLine(r);
    const edge = rowEdge(r);
    return `
      <tr>
        <td>
          <div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">${escapeHtml(r.player)}</button>${flagIcons(r)}</div>
          <div class="game"><span class="sport-tag">${escapeHtml(r.sport || "")}</span> ${escapeHtml(matchup(r))} · ${escapeHtml(fmtWhen(r.commence_time))}</div>
          <div class="script">${scriptLine(r)}${r.broadcasts ? ` · ${escapeHtml(r.broadcasts)}` : ""}</div>
        </td>
        <td>${escapeHtml(r.stat)}</td>
        <td class="line-cell"><div class="line-stack"><span class="tag ${sideClass}">${escapeHtml(r.side)}</span><div class="line-num">${lineTxt ?? "—"}</div>${fantasyNote(r)}</div></td>
        <td>${tierBadge(r.pp_tier)}</td>
        <td><span class="${pctClass(r.pct_to_hit)}">${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</span></td>
        <td class="${edge >= 0 ? "" : "muted"}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}${r.dfs?.prizepicks ? `<button type="button" class="slip-add" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">+ slip</button>` : ""}</td>
        ${bestCell(r)}
        ${cols.map((b) => bookCell(r, b.key)).join("")}
      </tr>`;
  }).join("");
}

document.querySelectorAll(".tab[data-view]").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.view = btn.dataset.view;
    if (state.section === "preview") {
      state.section = "props";
      if ($("section")) $("section").value = "props";
    }
    render();
  });
});
document.querySelectorAll(".tab[data-section]").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.section = btn.dataset.section;
    if ($("section")) $("section").value = state.section;
    render();
  });
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
$("minBooks")?.addEventListener("change", () => {
  state.minBooks = !!$("minBooks").checked;
  render();
});
["game", "stat", "side", "tier", "picks", "q", "minPct", "when"].forEach((id) => {
  $(id).addEventListener("input", render);
  $(id).addEventListener("change", render);
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
  rows.push(`<p><b>The bet:</b> ${escapeHtml(focus.player)} ${escapeHtml(focus.side || "")} ${focus.line ?? ""} ${escapeHtml(focus.stat)} · ${escapeHtml(matchup(focus) || "this game")}.</p>`);
  if (focus.pct_to_hit != null) {
    rows.push(`<p><b>Why it screens ${good ? "good" : "soft"}:</b> ${focus.pct_to_hit.toFixed(1)}% to hit vs ${be}% needed on a ${pickSize()}-pick${edge == null ? "" : ` (${edge > 0 ? "+" : ""}${edge} edge)`}.</p>`);
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

function openPlayerPopup(player, eventId, market, side) {
  const all = state.data?.props || [];
  const mine = all.filter((r) => r.player === player);
  let focus = mine.find((r) => r.event_id === eventId && r.market === market && r.side === side) || mine[0];
  if (!focus) {
    const meta = intelPlayer(player);
    const inj = (state.intel?.injuries || []).find((i) => i.name === player || i.gsis_id === meta?.gsis_id);
    if (!meta && !inj) return;
    focus = {
      player,
      headshot: meta?.headshot || inj?.headshot,
      gsis_id: meta?.gsis_id || inj?.gsis_id,
      game: meta ? `${meta.team} ${meta.pos}` : "",
      injury: inj ? { status: inj.report_status, injury: inj.report_injury, week: inj.week, season: inj.season } : null,
      books: {}, dfs: {},
    };
  }
  const edge = rowEdge(focus);
  const oppSide = focus.side === "Over" ? "Under" : focus.side === "Under" ? "Over" : focus.side === "Yes" ? "No" : focus.side === "No" ? "Yes" : "";
  const oppRow = oppSide ? (mine.find((r) => r.stat === focus.stat && r.game === focus.game && r.side === oppSide)
    || mine.find((r) => r.stat === focus.stat && r.side === oppSide)) : null;
  focus = { ...focus, books: mergeBooks(focus.books) };
  if (oppRow) oppRow = { ...oppRow, books: mergeBooks(oppRow.books) };
  const bookKeys = unique([...Object.keys(focus.books || {}), ...Object.keys(oppRow?.books || {})]).sort();
  const dfs = Object.entries(focus.dfs || {});
  const oppDfs = Object.entries(oppRow?.dfs || {});
  const others = mine
    .filter((r) => !(r.event_id === focus.event_id && r.market === focus.market && r.side === focus.side))
    .sort((a, b) => String(a.stat).localeCompare(String(b.stat)));
  const meta = intelPlayer(player);
  const gsis = focus.gsis_id || meta?.gsis_id;
  const recs = intelLogs(gsis);
  const relatedNews = (state.intel?.news || []).filter((n) => (n.players || []).includes(gsis) || (n.headline || "").toLowerCase().includes(String(player).toLowerCase()));
  const logBlock = recs.length ? `<h4 style="margin:16px 0 8px">Recent games ${state.intel?.has_2026_logs ? "" : "(2025 until Week 1)"}</h4>
    <table class="popup-table popup-logs">
      <thead><tr><th>Wk</th><th>Opp</th><th>Pass</th><th>Rush</th><th>Rec</th><th>PPR</th></tr></thead>
      <tbody>${[...recs].reverse().map((g) => `<tr>
        <td>${g.season} w${g.week}${g.st === "POST" ? " P" : ""}</td>
        <td>${escapeHtml(g.opp || "")}</td>
        <td>${g.att ? `${g.cmp}/${g.att}, ${g.pass_yds}y ${g.pass_td}TD` : "—"}</td>
        <td>${g.car ? `${g.car}-${g.rush_yds}` : "—"}</td>
        <td>${g.tgt || g.rec ? `${g.rec}/${g.tgt}, ${g.rec_yds}y` : "—"}</td>
        <td>${g.ppr ?? "—"}</td>
      </tr>`).join("")}</tbody>
    </table>` : "";
  const newsBlock = relatedNews.length ? `<h4 style="margin:16px 0 8px">News</h4>
    ${relatedNews.slice(0, 6).map((n) => `<div class="popup-stat" style="margin-bottom:8px"><b>${escapeHtml(n.source || "")} · ${escapeHtml(n.published || "")}</b>
      <a href="${escapeHtml(n.url || "#")}" target="_blank" rel="noopener">${escapeHtml(n.headline || "")}</a></div>`).join("")}` : "";

  $("popupCard").innerHTML = `
    <div class="popup-top">
      <div>
        <div class="popup-name">${headshotTag(focus.headshot)} ${escapeHtml(focus.player)}</div>
        <div class="popup-sub">${escapeHtml(matchup(focus))} · ${escapeHtml(fmtWhen(focus.commence_time))}<br>${escapeHtml(scriptLine(focus))}</div>
      </div>
      <button type="button" class="popup-x" id="popupClose">✕</button>
    </div>
    <div class="popup-grid">
      <div class="popup-stat"><b>Stat</b>${escapeHtml(focus.stat)} ${escapeHtml(focus.side)} ${focus.line ?? ""}</div>
      <div class="popup-stat"><b>Tier</b>${escapeHtml(focus.pp_tier || "—")}</div>
      <div class="popup-stat"><b>% to hit</b>${focus.pct_to_hit != null ? focus.pct_to_hit.toFixed(1) + "%" : "—"}</div>
      <div class="popup-stat"><b>Edge</b>${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}</div>
    </div>
    <div class="popup-stat sum-card" style="margin-bottom:12px"><b>Bet write-up</b>${betSummary(focus, recs, oppRow)}</div>
    ${focus.injury ? `<div class="popup-stat" style="margin-bottom:12px"><b>Injury</b>${injPill(focus.injury)} ${escapeHtml(focus.injury.injury || "")} · ${focus.injury.season || ""}w${focus.injury.week || ""}</div>` : ""}
    ${logBlock}
    ${renderSplitChart(focus, recs)}
    ${newsBlock}
    <div class="popup-stat" style="margin-bottom:12px">
      <b>DFS lines</b>
      <div class="game">${escapeHtml(focus.side || "")} ${focus.line ?? ""}${oppRow ? ` · opposite ${escapeHtml(oppRow.side)} ${oppRow.line ?? ""}` : ""}</div>
      ${dfs.length ? dfs.map(([k, v]) => {
        const meta = BOOK_BY_KEY[k];
        const ov = oppRow?.dfs?.[k];
        const px = k === "prizepicks" ? -117 : v.price;
        const opx = k === "prizepicks" ? -117 : ov?.price;
        return `${meta ? bookMark(meta, "sm") : k} ${escapeHtml(focus.side || "")} ${v.line ?? "—"} ${american(px)}${ov ? ` · ${escapeHtml(oppSide)} ${ov.line ?? "—"} ${american(opx)}` : ""}`;
      }).join("<br>") : "—"}
      ${focus.fantasy_cmp ? `<div class="corr-why" style="margin-top:6px">
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
    </div>
    ${(() => {
      const bestThisExact = bestPayoutKey(focus.books, focus.line);
      const bestThisAny = bestPayoutKey(focus.books);
      const bestOppExact = bestPayoutKey(oppRow?.books, oppRow?.line);
      const bestOppAny = bestPayoutKey(oppRow?.books);
      const bestThis = bestThisExact || bestThisAny;
      const bestOpp = bestOppExact || bestOppAny;
      const labelBook = (k, map) => {
        if (!k || !map?.[k]) return "—";
        const m = BOOK_BY_KEY[k];
        return `${m?.name || k} ${map[k].line ?? ""} ${american(map[k].price)}`;
      };
      return `<div class="popup-stat" style="margin-bottom:10px">
        <b>Best payout</b>
        ${escapeHtml(focus.side || "This side")} ${focus.line ?? ""}: ${escapeHtml(labelBook(bestThisExact, focus.books))}${bestThisAny && bestThisAny !== bestThisExact ? ` · any line ${labelBook(bestThisAny, focus.books)}` : ""}
        ${oppRow ? `<div class="corr-why">${escapeHtml(oppSide)} ${oppRow.line ?? ""}: ${escapeHtml(labelBook(bestOppExact, oppRow.books))}${bestOppAny && bestOppAny !== bestOppExact ? ` · any line ${labelBook(bestOppAny, oppRow.books)}` : ""}</div>` : ""}
      </div>
      <table class="popup-table">
        <thead><tr>
          <th>Book</th>
          <th>${escapeHtml(focus.side || "Line")}</th>
          <th>Price</th>
          <th>${escapeHtml(oppSide || "Opp")}</th>
          <th>Opp price</th>
          <th>Same line</th>
        </tr></thead>
        <tbody>
          ${bookKeys.map((k) => {
            const meta = BOOK_BY_KEY[k];
            const v = focus.books?.[k] || {};
            const o = oppRow?.books?.[k] || {};
            return `<tr>
              <td>${meta ? bookMark(meta, "sm") + " " + escapeHtml(meta.name) : escapeHtml(k)}</td>
              <td>${v.line ?? "—"}</td>
              <td class="${k === bestThis ? "best-pay" : ""}">${american(v.price)}</td>
              <td>${o.line ?? "—"}</td>
              <td class="${k === bestOpp ? "best-pay" : ""}">${american(o.price)}</td>
              <td>${v.same_line ? "Yes" : "No"}</td>
            </tr>`;
          }).join("") || `<tr><td colspan="6" class="muted">No sportsbook prices</td></tr>`}
        </tbody>
      </table>`;
    })()}
    <div style="margin:12px 0 8px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="tab on" id="popupSlip">Add to PP slip</button>
      <a class="tab" href="${ppSlipLink(focus)}" target="_blank" rel="noopener">Open this pick in PrizePicks</a>
    </div>
    ${others.length ? `<h4 style="margin:16px 0 8px">Other ${escapeHtml(player)} props</h4>
    <table class="popup-table">
      <thead><tr><th>Stat</th><th>Side</th><th>Line</th><th>% to hit</th></tr></thead>
      <tbody>
        ${others.slice(0, 24).map((r) => `<tr>
          <td>${escapeHtml(r.stat)}</td><td>${escapeHtml(r.side)}</td>
          <td>${r.line ?? "—"}</td><td>${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</td>
        </tr>`).join("")}
      </tbody>
    </table>` : ""}
  `;
  $("popup").hidden = false;
  $("popupClose").onclick = closePopup;
  const slipBtn = $("popupSlip");
  if (slipBtn) slipBtn.onclick = () => addToSlip(focus);
}

document.addEventListener("click", (e) => {
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
    const row = all.find((r) => r.player === add.dataset.player && r.event_id === add.dataset.eid && r.market === add.dataset.market && r.side === add.dataset.side);
    if (row) addToSlip(row);
    return;
  }
  const btn = e.target.closest(".player-btn");
  if (!btn) return;
  openPlayerPopup(btn.dataset.player, btn.dataset.eid, btn.dataset.market, btn.dataset.side);
});
$("slipPicks")?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-slip]");
  if (!btn) return;
  state.slip.splice(Number(btn.dataset.slip), 1);
  renderSlip();
});
$("slipClear")?.addEventListener("click", () => { state.slip = []; renderSlip(); });
$("popup")?.addEventListener("click", (e) => {
  if (e.target.id === "popup") closePopup();
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

function setLoader(msg) {
  const el = $("loaderText");
  if (el && msg) el.textContent = msg;
}
function hideLoader() {
  const el = $("loader");
  if (!el) return;
  el.classList.add("out");
  setTimeout(() => el.remove(), 500);
}

let lineIdx = 0;
const lineTimer = setInterval(() => {
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

async function loadData() {
  try {
    setLoader("Checking the books…");
    let version = "";
    try {
      const meta = await fetch("./data/meta.json", { cache: "no-cache" }).then((r) => r.ok ? r.json() : null);
      version = meta?.updated || "";
    } catch (_) {}
    setLoader("Hiking the props…");
    try {
      state.intel = await fetchBoard(INTEL_URL, version);
    } catch (_) {
      state.intel = null;
    }
    const sport = $("sport")?.value || state.sport || "all";
    state.sport = sport;
    if (sport === "all") {
      const keys = Object.keys(DATA_URLS);
      const results = await Promise.allSettled(keys.map((k) => fetchBoard(DATA_URLS[k], version)));
      const boards = results.map((res, i) => res.status === "fulfilled"
        ? tagSport(res.value, SPORT_LABEL[keys[i]])
        : { props: [], games: [], kalshi: {} });
      state.data = {
        updated: boards.find((b) => b.updated)?.updated,
        sport: "ALL",
        props: boards.flatMap((b) => b.props || []),
        games: boards.flatMap((b) => b.games || []),
        kalshi: {
          ml: boards.flatMap((b) => b.kalshi?.ml || []),
          spread: boards.flatMap((b) => b.kalshi?.spread || []),
          total: boards.flatMap((b) => b.kalshi?.total || []),
        },
      };
    } else {
      const label = SPORT_LABEL[sport] || sport.toUpperCase();
      const data = await fetchBoard(DATA_URLS[sport] || DATA_URLS.nfl, version);
      state.data = tagSport(data, label);
    }
    render();
  } catch (err) {
    $("updated").textContent = "Could not load props JSON";
    $("empty").style.display = "block";
    $("empty").textContent = "No data yet. Run the GitHub Action.";
    console.error(err);
  } finally {
    clearInterval(lineTimer);
    hideLoader();
  }
}

loadData();
