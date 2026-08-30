const DATA_URLS = { nfl: "./data/nfl-props.json", cfb: "./data/cfb-props.json" };

const BOOKS = [
  { key: "prizepicks", label: "PP", name: "PrizePicks", color: "#6D28FF", dfs: true, on: true, tile: "#6D28FF", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBa_IfAC9uxHYxj3nRDqyo09hGsSkT4crW1duodUEJTw&s=10" },
  { key: "underdog", label: "UD", name: "Underdog", color: "#FFE500", dfs: true, on: true, tile: "#FFE500", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT72uOdgpjWIynJRaFuKdRKhojBxPd54jbqPeLErnwYRg&s" },
  { key: "pick6", label: "P6", name: "Pick6", color: "#FF6A00", dfs: true, on: true, tile: "#FF6A00", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqxkzAMYVivcvVOqljmDRMjW0xq78Wu_YksmtYFcaPg&s=10" },
  { key: "draftkings", label: "DK", name: "DraftKings", color: "#53D337", dfs: false, on: true, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/DraftKings_logo.svg/1200px-DraftKings_logo.svg.png" },
  { key: "fanduel", label: "FD", name: "FanDuel", color: "#1493FF", dfs: false, on: true, logo: "https://www.nicepng.com/png/full/51-519544_detroit-lions-fanduel-logo-png.png" },
  { key: "williamhill_us", label: "CZR", name: "Caesars", color: "#C4A35A", dfs: false, on: true, logo: "https://www.liblogo.com/img-logo/wi5810wdec-william-hill-logo-william-hill-deposit-bonus-amp-review--com.png" },
  { key: "novig", label: "NOV", name: "Novig", color: "#9B7DFF", dfs: false, on: true, exchange: true, logo: "https://mma.prnewswire.com/media/2189555/Novig_WhiteBackground_BlackWordmark_Logo.jpg?p=facebook" },
  { key: "betrivers", label: "RIV", name: "BetRivers", color: "#E23B3B", dfs: false, on: false, logo: "" },
  { key: "espnbet", label: "ESPN", name: "ESPN BET", color: "#D00", dfs: false, on: false, logo: "https://espnpressroom.com/us/files/2023/10/ESPN-BET-Logo-Primary-1352x1080.jpg" },
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
const CORE_STATS = new Set(["Pass Yds", "Rush Yds", "Receptions", "Rec Yds", "Rush+Rec Yds", "Pass TDs", "Anytime TD", "Fantasy Score", "Pass+Rush Yds"]);
const FALLBACK_HEAD = "https://www.freeiconspng.com/uploads/--tie-user-users-work-worker-working-icon--icon-search-engine-6.png";
const DEFAULT_ON = new Set(BOOKS.filter((b) => b.on).map((b) => b.key));
const BOOK_BY_KEY = Object.fromEntries(BOOKS.map((b) => [b.key, b]));
const state = { data: null, sortKey: "ev", sortDir: "desc", view: "pp", sport: "all", section: "props", booksOn: new Set(DEFAULT_ON), slip: [] };
const $ = (id) => document.getElementById(id);

function american(price) {
  if (price == null || price === "") return "—";
  const n = Number(price);
  if (Number.isNaN(n)) return "—";
  return n > 0 ? `+${Math.round(n)}` : String(Math.round(n));
}
function pickSize() { return Number($("picks").value || 5); }
function breakEven() { return PP_BE[pickSize()] || 54.93; }
function rowEdge(row) { return row.pct_to_hit == null ? null : +(row.pct_to_hit - breakEven()).toFixed(1); }
function pctClass(pct) {
  if (pct == null) return "pct";
  if (pct >= breakEven()) return "pct good";
  if (pct >= breakEven() - 2) return "pct ok";
  return "pct bad";
}
function fmtWhen(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
function abbr(team) { return TEAM_ABBR[team] || team || ""; }
function matchup(row) {
  const away = abbr(row.away_team), home = abbr(row.home_team);
  if (!away && !home) return row.game || "";
  return `${away} @ ${home}`;
}
function unique(arr) { return [...new Set(arr.filter(Boolean))]; }
function escapeHtml(s) {
  return String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
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
  const game = $("game").value, stat = $("stat").value, side = $("side").value;
  const tier = $("tier").value, minPct = Number($("minPct").value || 0);
  const q = $("q").value.trim().toLowerCase(), be = breakEven();
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
    let va = a[state.sortKey], vb = b[state.sortKey];
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
  sel.innerHTML = `<option value="">${allLabel}</option>` + values.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
  if ([...sel.options].some((o) => o.value === current)) sel.value = current;
}
function visibleBooks() { return BOOKS.filter((b) => state.booksOn.has(b.key)); }
function renderBookPicks() {
  $("bookPicks").innerHTML = BOOKS.map((b) => {
    const on = state.booksOn.has(b.key) ? "on" : "";
    const ex = b.exchange ? " ex" : "";
    return `<button type="button" class="book-pick ${on}${ex}" data-book="${b.key}">${bookMark(b, "sm")}<span>${escapeHtml(b.name)}${b.exchange ? " · EX" : ""}</span></button>`;
  }).join("");
}
function renderHead() {
  $("headrow").innerHTML = `<th data-key="player">Player</th><th data-key="stat">Stat</th><th data-key="line">Line</th><th data-key="pp_tier">Tier</th><th data-key="pct_to_hit">% to Hit</th><th data-key="ev">Edge</th><th>Best</th>` +
    visibleBooks().map((b) => `<th data-book="${b.key}">${bookMark(b)}</th>`).join("");
  $("headrow").querySelectorAll("th[data-key]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (state.sortKey === key) state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
      else { state.sortKey = key; state.sortDir = (key === "player" || key === "stat") ? "asc" : "desc"; }
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
    const home = abbr(row.home_team), n = Number(row.spread);
    bits.push(n > 0 ? `${home} +${n}` : `${home} ${n}`);
  }
  if (row.total != null) bits.push(`O/U ${Number(row.total)}`);
  return bits.join(" · ") || "—";
}
function kalshiMatch(list, game) {
  const blob = `${game.away_team || ""} ${game.home_team || ""} ${game.game || ""}`.toLowerCase();
  const bits = blob.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  return (list || []).filter((m) => bits.filter((w) => (m.title || "").toLowerCase().includes(w)).length >= 1)[0] || null;
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
  if (kHome && kHome.implied != null && mlHomeImp != null) return +(kHome.implied - mlHomeImp).toFixed(1);
  return null;
}
function headshotTag(url) {
  const src = url || FALLBACK_HEAD;
  return `<img class="headshot" src="${escapeHtml(src)}" alt="" referrerpolicy="no-referrer" onerror="if(this.dataset.fb)return;this.dataset.fb=1;this.src='${FALLBACK_HEAD}'" />`;
}
function ppSlipLink(row) {
  const id = row.pp_id || row.dfs?.prizepicks?.id;
  if (!id) return "https://app.prizepicks.com/";
  const ou = row.side === "Under" || row.side === "No" ? "u" : "o";
  const line = row.dfs?.prizepicks?.line ?? row.line ?? "";
  return `https://app.prizepicks.com/?projections=${encodeURIComponent(`${id}-${ou}-${line}`)}`;
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
    const parts = state.slip.map((r) => {
      const id = r.pp_id || r.dfs?.prizepicks?.id;
      if (!id) return null;
      const ou = r.side === "Under" || r.side === "No" ? "u" : "o";
      return `${id}-${ou}-${r.dfs?.prizepicks?.line ?? r.line ?? ""}`;
    }).filter(Boolean);
    open.href = parts.length ? `https://app.prizepicks.com/?projections=${encodeURIComponent(parts.join(","))}` : "https://app.prizepicks.com/";
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
  const ranked = games.map((g) => ({ ...g, edge: gameBestEdge(g, k) })).sort((a, b) => (b.edge ?? -999) - (a.edge ?? -999));
  $("gamesBody").innerHTML = ranked.map((g) => `<tr>
    <td><div class="player">${escapeHtml(g.game)}</div><div class="game"><span class="sport-tag">${escapeHtml(g.sport || "")}</span> ${escapeHtml(fmtWhen(g.commence_time))}</div></td>
    <td class="line-stack"><div class="line-num">${g.spread ?? "—"}</div>${g.spread_proj != null ? `<div class="line-note">proj ${g.spread_proj}</div>` : ""}</td>
    <td class="line-stack"><div class="line-num">${g.total ?? "—"}</div>${g.total_proj != null ? `<div class="line-note">proj ${g.total_proj}</div>` : ""}</td>
    <td class="price">${american(g.ml_away)}<div class="line-note">${bookImplied(g.ml_away) != null ? bookImplied(g.ml_away).toFixed(1) + "%" : ""}</div></td>
    <td class="price">${american(g.ml_home)}<div class="line-note">${bookImplied(g.ml_home) != null ? bookImplied(g.ml_home).toFixed(1) + "%" : ""}</div></td>
    <td>${kalshiCell(k.ml, g)}</td>
    <td>${kalshiCell(k.spread, g)}</td>
    <td>${kalshiCell(k.total, g)}</td>
    <td class="${g.edge != null && g.edge >= 0 ? "" : "muted"}">${g.edge == null ? "—" : (g.edge > 0 ? "+" : "") + g.edge.toFixed(1)}</td>
  </tr>`).join("");
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
  fillSelect($("stat"), [...stats.filter((s) => CORE_STATS.has(s)).sort(), ...stats.filter((s) => !CORE_STATS.has(s)).sort()], "All props");
  renderBookPicks();
  renderHead();
  const rows = sortRows(applyFilters(all));
  $("count").textContent = `${rows.length.toLocaleString()} shown`;
  if (!rows.length) { $("tbody").innerHTML = ""; $("empty").style.display = "block"; return; }
  $("empty").style.display = "none";
  const cols = visibleBooks();
  $("tbody").innerHTML = rows.map((r) => {
    const sideClass = r.side === "Over" || r.side === "Yes" ? "over" : (r.side === "Under" || r.side === "No" ? "under" : "");
    const edge = rowEdge(r);
    return `<tr>
      <td>
        <div class="player-row">${headshotTag(r.headshot)}<button type="button" class="player-btn" data-player="${escapeHtml(r.player)}" data-eid="${escapeHtml(r.event_id || "")}" data-market="${escapeHtml(r.market || "")}" data-side="${escapeHtml(r.side)}">${escapeHtml(r.player)}</button></div>
        <div class="game"><span class="sport-tag">${escapeHtml(r.sport || "")}</span> ${escapeHtml(matchup(r))} · ${escapeHtml(fmtWhen(r.commence_time))}</div>
        <div class="script">${scriptLine(r)}</div>
      </td>
      <td>${escapeHtml(r.stat)}</td>
      <td class="line-cell"><div class="line-stack"><span class="tag ${sideClass}">${escapeHtml(r.side)}</span><div class="line-num">${displayLine(r) ?? "—"}</div></div></td>
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
    document.querySelectorAll(".tab[data-view]").forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    state.view = btn.dataset.view;
    render();
  });
});
$("bookPicks").addEventListener("click", (e) => {
  const btn = e.target.closest(".book-pick");
  if (!btn) return;
  const key = btn.dataset.book;
  if (state.booksOn.has(key)) { if (state.booksOn.size === 1) return; state.booksOn.delete(key); }
  else state.booksOn.add(key);
  render();
});
$("booksReset").addEventListener("click", () => { state.booksOn = new Set(DEFAULT_ON); render(); });
if ($("sport")) $("sport").addEventListener("change", () => { state.sport = $("sport").value; loadData(); });
if ($("section")) $("section").addEventListener("change", () => { state.section = $("section").value; render(); });
["game", "stat", "side", "tier", "picks", "q", "minPct"].forEach((id) => {
  $(id).addEventListener("input", render);
  $(id).addEventListener("change", render);
});

function closePopup() { const el = $("popup"); if (el) el.hidden = true; }
function openPlayerPopup(player, eventId, market, side) {
  const all = state.data?.props || [];
  const mine = all.filter((r) => r.player === player);
  const focus = mine.find((r) => r.event_id === eventId && r.market === market && r.side === side) || mine[0];
  if (!focus) return;
  const edge = rowEdge(focus);
  const books = Object.entries(focus.books || {}).sort((a, b) => (a[0] > b[0] ? 1 : -1));
  const dfs = Object.entries(focus.dfs || {});
  const others = mine.filter((r) => !(r.event_id === focus.event_id && r.market === focus.market && r.side === focus.side)).sort((a, b) => String(a.stat).localeCompare(String(b.stat)));
  $("popupCard").innerHTML = `
    <div class="popup-top"><div>
      <div class="popup-name">${headshotTag(focus.headshot)} ${escapeHtml(focus.player)}</div>
      <div class="popup-sub">${escapeHtml(matchup(focus))} · ${escapeHtml(fmtWhen(focus.commence_time))}<br>${escapeHtml(scriptLine(focus))}</div>
    </div><button type="button" class="popup-x" id="popupClose">✕</button></div>
    <div class="popup-grid">
      <div class="popup-stat"><b>Stat</b>${escapeHtml(focus.stat)} ${escapeHtml(focus.side)} ${focus.line ?? ""}</div>
      <div class="popup-stat"><b>Tier</b>${escapeHtml(focus.pp_tier || "—")}</div>
      <div class="popup-stat"><b>% to hit</b>${focus.pct_to_hit != null ? focus.pct_to_hit.toFixed(1) + "%" : "—"}</div>
      <div class="popup-stat"><b>Edge</b>${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}</div>
    </div>
    <div class="popup-stat" style="margin-bottom:12px"><b>DFS lines</b>
      ${dfs.length ? dfs.map(([k, v]) => { const meta = BOOK_BY_KEY[k]; return `${meta ? bookMark(meta, "sm") : k} ${v.line ?? "—"} ${american(v.price)}`; }).join("&nbsp;&nbsp;&nbsp;") : "—"}
    </div>
    <table class="popup-table"><thead><tr><th>Book</th><th>Line</th><th>Price</th><th>Same line</th></tr></thead>
    <tbody>${books.map(([k, v]) => { const meta = BOOK_BY_KEY[k]; return `<tr><td>${meta ? bookMark(meta, "sm") + " " + escapeHtml(meta.name) : escapeHtml(k)}</td><td>${v.line ?? "—"}</td><td>${american(v.price)}</td><td>${v.same_line ? "Yes" : "No"}</td></tr>`; }).join("") || `<tr><td colspan="4" class="muted">No sportsbook prices</td></tr>`}</tbody></table>
    <div style="margin:12px 0 8px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="tab on" id="popupSlip">Add to PP slip</button>
      <a class="tab" href="${ppSlipLink(focus)}" target="_blank" rel="noopener">Open this pick in PrizePicks</a>
    </div>
    ${others.length ? `<h4 style="margin:16px 0 8px">Other ${escapeHtml(player)} props</h4>
    <table class="popup-table"><thead><tr><th>Stat</th><th>Side</th><th>Line</th><th>% to hit</th></tr></thead>
    <tbody>${others.slice(0, 24).map((r) => `<tr><td>${escapeHtml(r.stat)}</td><td>${escapeHtml(r.side)}</td><td>${r.line ?? "—"}</td><td>${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</td></tr>`).join("")}</tbody></table>` : ""}`;
  $("popup").hidden = false;
  $("popupClose").onclick = closePopup;
  const slipBtn = $("popupSlip");
  if (slipBtn) slipBtn.onclick = () => addToSlip(focus);
}
$("tbody").addEventListener("click", (e) => {
  const add = e.target.closest(".slip-add");
  if (add) {
    const row = (state.data?.props || []).find((r) => r.player === add.dataset.player && r.event_id === add.dataset.eid && r.market === add.dataset.market && r.side === add.dataset.side);
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
$("popup")?.addEventListener("click", (e) => { if (e.target.id === "popup") closePopup(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopup(); });

const LOAD_LINES = ["Warming up the slate…", "Checking the books…", "Hiking the props…", "Sharpening the edges…", "Two-minute drill…"];
function setLoader(msg) { const el = $("loaderText"); if (el && msg) el.textContent = msg; }
function hideLoader() { const el = $("loader"); if (!el) return; el.classList.add("out"); setTimeout(() => el.remove(), 500); }
let lineIdx = 0;
const lineTimer = setInterval(() => { lineIdx = (lineIdx + 1) % LOAD_LINES.length; setLoader(LOAD_LINES[lineIdx]); }, 700);
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
    const sport = $("sport")?.value || state.sport || "all";
    state.sport = sport;
    if (sport === "all") {
      const results = await Promise.allSettled([fetchBoard(DATA_URLS.nfl, version), fetchBoard(DATA_URLS.cfb, version)]);
      const nfl = results[0].status === "fulfilled" ? tagSport(results[0].value, "NFL") : { props: [], games: [], kalshi: {} };
      const cfb = results[1].status === "fulfilled" ? tagSport(results[1].value, "CFB") : { props: [], games: [], kalshi: {} };
      state.data = {
        updated: nfl.updated || cfb.updated, sport: "ALL",
        props: [...(nfl.props || []), ...(cfb.props || [])],
        games: [...(nfl.games || []), ...(cfb.games || [])],
        kalshi: {
          ml: [...(nfl.kalshi?.ml || []), ...(cfb.kalshi?.ml || [])],
          spread: [...(nfl.kalshi?.spread || []), ...(cfb.kalshi?.spread || [])],
          total: [...(nfl.kalshi?.total || []), ...(cfb.kalshi?.total || [])],
        },
      };
    } else {
      state.data = tagSport(await fetchBoard(DATA_URLS[sport] || DATA_URLS.nfl, version), sport === "cfb" ? "CFB" : "NFL");
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
