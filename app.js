const DATA_URLS = { nfl: "./data/nfl-props.json", cfb: "./data/cfb-props.json", mlb: "./data/mlb-props.json" };

const BOOKS = [
  { key: "prizepicks", label: "PP", name: "PrizePicks", color: "#6D28FF", dfs: true, on: true, tile: "#6D28FF", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBa_IfAC9uxHYxj3nRDqyo09hGsSkT4crW1duodUEJTw&s=10" },
  { key: "underdog", label: "UD", name: "Underdog", color: "#FFE500", dfs: true, on: true, tile: "#FFE500", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT72uOdgpjWIynJRaFuKdRKhojBxPd54jbqPeLErnwYRg&s" },
  { key: "pick6", label: "P6", name: "Pick6", color: "#FF6A00", dfs: true, on: true, tile: "#FF6A00", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqxkzAMYVivcvVOqljmDRMjW0xq78Wu_YksmtYFcaPg&s=10" },
  { key: "draftkings", label: "DK", name: "DraftKings", color: "#53D337", dfs: false, on: true, logo: "https://play-lh.googleusercontent.com/Aqu9BtAN0cgtogg7AJErJ0RT82ivWsA2EiBI4iloW6kPfnBMZ-gmoj8Iy8_Z1nmxYkgOSQatDI57zdhq4an0Rg=s0-br30" },
  { key: "fanduel", label: "FD", name: "FanDuel", color: "#1493FF", dfs: false, on: true, logo: "https://play-lh.googleusercontent.com/dg5hlupv1IDaHY2ibnZH1OJNCsw4dEac6jfeFxcVPpxs8rViIRgycCzduFTfiRS9HSNCJRVEBJMZ8YJAJw_T6vk" },
  { key: "williamhill_us", label: "CZR", name: "Caesars", color: "#C4A35A", dfs: false, on: true, logo: "https://www.liblogo.com/img-logo/wi5810wdec-william-hill-logo-william-hill-deposit-bonus-amp-review--com.png" },
  { key: "novig", label: "NOV", name: "Novig", color: "#9B7DFF", dfs: false, on: true, exchange: true, logo: "https://mma.prnewswire.com/media/2189555/Novig_WhiteBackground_BlackWordmark_Logo.jpg?p=facebook" },
  { key: "betrivers", label: "RIV", name: "BetRivers", color: "#E23B3B", dfs: false, on: false, logo: "" },
  { key: "espnbet", label: "ESPN", name: "theScore Bet", color: "#1B4FA3", dfs: false, on: false, logo: "https://elitesportsny.com/app/uploads/2023/11/cgen-partner-icon-thescorebet-300x300-1.png" },
  { key: "betparx", label: "PARX", name: "BetParx", color: "#2BB0A6", dfs: false, on: false, logo: "https://mma.prnewswire.com/media/1952755/betPARX_logo.jpg?p=facebook" },
  { key: "ballybet", label: "BAL", name: "Bally Bet", color: "#E6C200", dfs: false, on: false, logo: "https://assets.actionnetwork.com/261589_BallyBet.png" },
  { key: "betonlineag", label: "BOL", name: "BetOnline", color: "#3D7BFF", dfs: false, on: false, logo: "https://mma.prnewswire.com/media/2323695/betonline_logo.jpg?p=facebook" },
  { key: "prophetx", label: "PX", name: "ProphetX", color: "#4CC9F0", dfs: false, on: true, exchange: true, logo: "https://sportsbooksonline-com.imgix.net/assets/local/Company/logos/prophetx-logo-transparent.png" },
  { key: "betmgm", label: "MGM", name: "BetMGM", color: "#C4A35A", dfs: false, on: false, logo: "https://logos-world.net/wp-content/uploads/2024/10/BetMGM-Logo.jpg" },
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

const CORE_STATS = new Set([
  "Pass Yds", "Rush Yds", "Receptions", "Rec Yds", "Rush+Rec Yds",
  "Pass TDs", "Anytime TD", "Fantasy Score", "Pass+Rush Yds",
]);
const FALLBACK_HEAD = "https://www.freeiconspng.com/uploads/--tie-user-users-work-worker-working-icon--icon-search-engine-6.png";

const DEFAULT_ON = new Set(BOOKS.filter((b) => b.on).map((b) => b.key));
const BOOK_BY_KEY = Object.fromEntries(BOOKS.map((b) => [b.key, b]));

const state = {
  data: null,
  sortKey: "ev",
  sortDir: "desc",
  view: "pp", sport: "all", section: "props",
  booksOn: new Set(DEFAULT_ON),
  slip: [],
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
  if (meta?.dfs) return row.dfs?.[key] || null;
  return row.books?.[key] || null;
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
      if (tier === "standard" && r.pp_tier && r.pp_tier !== "Standard") return false;
      if (tier === "demon" && r.pp_tier !== "Demon") return false;
      if (tier === "goblin" && r.pp_tier !== "Goblin") return false;
    }
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

function bookCell(row, key) {
  const src = bookOffer(row, key);
  if (!src) return `<td class="muted">—</td>`;
  const shown = displayLine(row);
  const same = src.line == null || shown == null || Number(src.line) === Number(shown);
  const note = same ? "" : `<div class="line-note">${src.line}</div>`;
  return `<td class="price">${american(src.price)}${note}</td>`;
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
  const cls = tier === "Demon" ? "tier demon" : tier === "Goblin" ? "tier goblin" : "tier std";
  return `<span class="${cls}">${tier}</span>`;
}

function bestCell(row) {
  const b = row.best;
  if (!b) return `<td class="muted">—</td>`;
  const meta = BOOK_BY_KEY[b.book];
  const mark = meta ? bookMark(meta, "sm") : `<span class="muted">${escapeHtml(b.book)}</span>`;
  return `<td class="price">${mark} ${american(b.price)}</td>`;
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
  const propsWrap = document.querySelector(".table-wrap:not(#gamesWrap)");
  if (!wrap) return;
  const showGames = state.section === "games";
  wrap.style.display = showGames ? "block" : "none";
  if (propsWrap) propsWrap.style.display = showGames ? "none" : "block";
  const filt = document.querySelector(".filters");
  const books = document.querySelector(".books-bar");
  if (filt) [...filt.querySelectorAll("select, label, input")].forEach((el) => {
    if (el.id === "sport" || el.id === "section") return;
    el.style.display = showGames ? "none" : "";
  });
  if (books) books.style.display = showGames ? "none" : "flex";
  if (!showGames) return;
  const games = state.data.games || [];
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

function render() {
  if (!state.data) return;
  renderGames();
  if (state.section === "games") return;
  const all = state.data.props || [];
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
          <div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">${escapeHtml(r.player)}</button></div>
          <div class="game"><span class="sport-tag">${escapeHtml(r.sport || "")}</span> ${escapeHtml(matchup(r))} · ${escapeHtml(fmtWhen(r.commence_time))}</div>
          <div class="script">${scriptLine(r)}</div>
        </td>
        <td>${escapeHtml(r.stat)}</td>
        <td class="line-cell"><div class="line-stack"><span class="tag ${sideClass}">${escapeHtml(r.side)}</span><div class="line-num">${lineTxt ?? "—"}</div></div></td>
        <td>${tierBadge(r.pp_tier)}</td>
        <td><span class="${pctClass(r.pct_to_hit)}">${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</span></td>
        <td class="${edge >= 0 ? "" : "muted"}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}${r.dfs?.prizepicks ? `<button type="button" class="slip-add" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">+ slip</button>` : ""}</td>
        ${bestCell(Starting with `scripts/fetch_board.py`. Reply with the next filename when you want it (`app.js`, `index.html`, `scripts/fetch_nfl_props.py`, or `styles.css`).**File 1 of 4 — `scripts/fetch_board.py`**

Replace the whole file with this:

```python
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
    "hitter fantasy score": "Hitter Fantasy Score", "pitcher fantasy score": "Pitcher Fantasy Score",
    "hits + runs + rbis": "Hits+Runs+RBIs", "hits+runs+rbis": "Hits+Runs+RBIs",
    "hitter strikeouts": "Hitter Ks", "batter strikeouts": "Hitter Ks",
    "pitcher strikeouts": "Pitcher Ks", "pitches seen": "Pitches Seen",
    "total bases": "Total Bases", "stolen bases": "Stolen Bases",
    "home runs": "Home Runs", "hits": "Hits", "runs": "Runs", "rbis": "RBIs",
    "singles": "Singles", "doubles": "Doubles", "walks": "Walks", "batter walks": "Walks",
    "pitcher outs": "Outs", "earned runs": "ER", "hits allowed": "Hits Allowed",
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
    rows = (
        base.parse_csv_text(text, "Source,Sport,Player ID")
        or base.parse_csv_text(text, "Date,Start Time,Player Name")
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
            "dfs": {"prizepicks": {"line": p.get("line"), "price": -137, "multiplier": None, "id": p.get("pp_id") or ""}},
            "books": {}, "headshot": p.get("headshot"), "projection": p.get("projection"),
            "pp_sheet_edge": p.get("pp_edge"), "true_point": p.get("true_point"),
            "proj_vs_line": p.get("proj_vs_line"),
            "correlates": p.get("correlates"), "pp_id": p.get("pp_id"),
            "sheet_only": True,
        })
    print(f"Added {extra} extra PP stat rows (combo/fantasy/etc)")
    fill_player_context(rows)
    for row in rows:
        stat = str(row.get("stat") or "")
        if "fantasy" in stat.lower():
            edge = sane_pct(row.get("pp_sheet_edge"))
            if edge is not None:
                row["pct_to_hit"] = edge
        hit = row.get("pct_to_hit")
        if hit is not None and (hit > 99 or hit < 1):
            row["pct_to_hit"] = sane_pct(row.get("pp_sheet_edge"))
    return rows


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
    }.get(sport, {"ml": "KXNFLGAME", "spread": "KXNFLSPREAD", "total": "KXNFLTOTAL"})
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
        avg = base.to_float(r.get("Average Line"))
        proj = base.to_float(r.get("Projection"))
        point = base.to_float(r.get("point"))
        price = base.to_float(r.get("price"))
        label = (r.get("label") or "")
        line = avg if avg is not None else point
        if market == "spreads" and rec["spread"] is None and line is not None and home.lower() in label.lower():
            rec["spread"], rec["spread_proj"] = line, proj
        if market == "spreads" and rec["spread"] is None and line is not None and not label:
            rec["spread"], rec["spread_proj"] = line, proj
        if market == "totals" and rec["total"] is None and line is not None:
            rec["total"], rec["total_proj"] = line, proj
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
    cfb = build_sport("CFB", CFB_SHEET_CSV, CFB_GAME_CSV, CFB_PP_CSV, CFB_UD_CSV, "cfb-props.json")
    mlb = build_sport("MLB", MLB_SHEET_CSV, MLB_GAME_CSV, MLB_PP_CSV, MLB_UD_CSV, "mlb-props.json")
    (base.DATA_DIR / "meta.json").write_text(json.dumps({
        "updated": nfl["updated"],
        "source": "google_sheet_csv+kalshi",
        "row_count": nfl["row_count"],
        "cfb_rows": cfb["row_count"],
        "mlb_rows": mlb["row_count"],
        "sheet_rows": nfl["sheet_rows"],
        "raw_count": nfl["raw_count"],
        "game_count": nfl["game_count"],
        "books_seen": nfl["books_seen"],
        "markets_seen": nfl["markets_seen"],
    }, indent=2))
    print("Done.")


if __name__ == "__main__":
    main()
