const DATA_URL = "./data/nfl-props.json";

const BOOKS = [
  { key: "prizepicks", label: "PP", name: "PrizePicks", color: "#7C5CFF", dfs: true, on: true },
  { key: "underdog", label: "UD", name: "Underdog", color: "#FF7A1A", dfs: true, on: true },
  { key: "draftkings", label: "DK", name: "DraftKings", color: "#53D337", dfs: false, on: true },
  { key: "fanduel", label: "FD", name: "FanDuel", color: "#1493FF", dfs: false, on: true },
  { key: "williamhill_us", label: "CZR", name: "Caesars", color: "#C4A35A", dfs: false, on: true },
  { key: "novig", label: "NOV", name: "Novig", color: "#9B7DFF", dfs: false, on: false },
  { key: "betrivers", label: "RIV", name: "BetRivers", color: "#E23B3B", dfs: false, on: false },
  { key: "espnbet", label: "ESPN", name: "ESPN BET", color: "#D00", dfs: false, on: false },
  { key: "betparx", label: "PARX", name: "BetParx", color: "#2BB0A6", dfs: false, on: false },
  { key: "ballybet", label: "BAL", name: "Bally Bet", color: "#E6C200", dfs: false, on: false },
  { key: "betonlineag", label: "BOL", name: "BetOnline", color: "#3D7BFF", dfs: false, on: false },
  { key: "prophetx", label: "PX", name: "ProphetX", color: "#4CC9F0", dfs: false, on: false },
];

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

const state = {
  data: null,
  sortKey: "pct_to_hit",
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

function pctClass(pct) {
  if (pct == null) return "pct";
  if (pct >= 54) return "pct good";
  if (pct >= 52) return "pct ok";
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
  const cls = size === "sm" ? "book-mark sm" : "book-mark";
  return `<span class="${cls}" style="--c:${book.color}" title="${escapeHtml(book.name)}">${escapeHtml(book.label)}</span>`;
}

function bookOffer(row, key) {
  const meta = BOOKS.find((b) => b.key === key);
  if (meta?.dfs) return row.dfs?.[key] || null;
  return row.books?.[key] || null;
}

function applyFilters(rows) {
  const game = $("game").value;
  const stat = $("stat").value;
  const side = $("side").value;
  const minPct = Number($("minPct").value || 0);
  const q = $("q").value.trim().toLowerCase();

  return rows.filter((r) => {
    if (state.view === "pp" && !r.dfs?.prizepicks) return false;
    if (state.view === "ud" && !r.dfs?.underdog) return false;
    if (state.view === "ev" && !(r.pct_to_hit >= 54)) return false;
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
    const va = a[state.sortKey];
    const vb = b[state.sortKey];
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
    return `<button type="button" class="book-pick ${on}" data-book="${b.key}">
      ${bookMark(b, "sm")}<span>${escapeHtml(b.name)}</span>
    </button>`;
  }).join("");
}

function renderHead() {
  const fixed = `
    <th data-key="player">Player</th>
    <th data-key="stat">Stat</th>
    <th data-key="line">Line</th>
    <th data-key="pct_to_hit">% to Hit</th>
    <th data-key="ev">Edge</th>`;
  const books = visibleBooks().map((b) =>
    `<th data-book="${b.key}">${bookMark(b)} ${escapeHtml(b.label)}</th>`
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

function render() {
  if (!state.data) return;
  const all = state.data.props || [];
  $("updated").textContent = `Updated ${fmtWhen(state.data.updated)}`;
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
    return `
      <tr>
        <td>
          <div class="player">${escapeHtml(r.player)}</div>
          <div class="game">${escapeHtml(matchup(r))} · ${escapeHtml(fmtWhen(r.commence_time))}</div>
        </td>
        <td>${escapeHtml(r.stat)}</td>
        <td><span class="tag ${sideClass}">${escapeHtml(r.side)}</span>${lineTxt ?? ""}</td>
        <td><span class="${pctClass(r.pct_to_hit)}">${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</span></td>
        <td class="${r.ev >= 0 ? "" : "muted"}">${r.ev == null ? "—" : (r.ev > 0 ? "+" : "") + r.ev.toFixed(1)}</td>
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

["game", "stat", "side", "q", "minPct"].forEach((id) => {
  $(id).addEventListener("input", render);
  $(id).addEventListener("change", render);
});

fetch(`${DATA_URL}?t=${Date.now()}`)
  .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
  .then((data) => { state.data = data; render(); })
  .catch((err) => {
    $("updated").textContent = "Could not load data/nfl-props.json";
    $("empty").style.display = "block";
    $("empty").textContent = "No data yet. Run the GitHub Action.";
    console.error(err);
  });
