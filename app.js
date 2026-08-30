const DATA_URL = "./data/nfl-props.json";

const BOOKS = [
  { key: "prizepicks", label: "PP", name: "PrizePicks", color: "#6D28FF", dfs: true, on: true, tile: "#6D28FF", logo: "./logos/prizepicks.png" },
  { key: "underdog", label: "UD", name: "Underdog", color: "#FFE500", dfs: true, on: true, tile: "#FFE500", logo: "./logos/underdog.png" },
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

const CORE_STATS = new Set([
  "Pass Yds", "Rush Yds", "Receptions", "Rec Yds", "Rush+Rec Yds",
  "Pass TDs", "Anytime TD",
]);

const DEFAULT_ON = new Set(BOOKS.filter((b) => b.on).map((b) => b.key));
const BOOK_BY_KEY = Object.fromEntries(BOOKS.map((b) => [b.key, b]));

const state = {
  data: null,
  sortKey: "ev",
  sortDir: "desc",
  view: "pp",
  booksOn: new Set(DEFAULT_ON),
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
    return `<img class="${cls}"${tile} src="${book.logo}" alt="${escapeHtml(book.label)}" title="${escapeHtml(book.name)}" onerror="this.classList.add('hide');this.nextElementSibling?.classList.remove('hide');" /><span class="book-mark ${size === "sm" ? "sm" : ""} hide" style="--c:${book.color}">${escapeHtml(book.label)}</span>`;
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
    if (state.view === "ev" && !(r.pct_to_hit >= be)) return false;
    if (state.view === "pp" || state.view === "ev") {
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

function render() {
  if (!state.data) return;
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
          <div class="player">${escapeHtml(r.player)}</div>
          <div class="game">${escapeHtml(matchup(r))} · ${escapeHtml(fmtWhen(r.commence_time))}</div>
          <div class="script">${scriptLine(r)}</div>
        </td>
        <td>${escapeHtml(r.stat)}</td>
        <td class="line-stack"><span class="tag ${sideClass}">${escapeHtml(r.side)}</span><div class="line-num">${lineTxt ?? "—"}</div></td>
        <td>${tierBadge(r.pp_tier)}</td>
        <td><span class="${pctClass(r.pct_to_hit)}">${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</span></td>
        <td class="${edge >= 0 ? "" : "muted"}">${edge == null ? "—" : (edge > 0 ? "+" : "") + edge.toFixed(1)}</td>
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

["game", "stat", "side", "tier", "picks", "q", "minPct"].forEach((id) => {
  $(id).addEventListener("input", render);
  $(id).addEventListener("change", render);
});

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

async function loadData() {
  try {
    setLoader("Checking the books…");
    let version = "";
    try {
      const meta = await fetch("./data/meta.json", { cache: "no-cache" }).then((r) => r.ok ? r.json() : null);
      version = meta?.updated || "";
    } catch (_) {}
    setLoader("Hiking the props…");
    const url = version ? `${DATA_URL}?v=${encodeURIComponent(version)}` : DATA_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    state.data = data;
    render();
  } catch (err) {
    $("updated").textContent = "Could not load data/nfl-props.json";
    $("empty").style.display = "block";
    $("empty").textContent = "No data yet. Run the GitHub Action.";
    console.error(err);
  } finally {
    clearInterval(lineTimer);
    hideLoader();
  }
}

loadData();
