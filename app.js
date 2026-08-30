const DATA_URL = "./data/nfl-props.json";
const BOOK_COLS = [
  ["prizepicks", "PP"],
  ["underdog", "UD"],
  ["draftkings", "DK"],
  ["fanduel", "FD"],
  ["williamhill_us", "CZR"],
  ["novig", "NOV"],
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
const state = { data: null, sortKey: "pct_to_hit", sortDir: "desc", view: "all" };
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
  const away = abbr(row.away_team), home = abbr(row.home_team);
  return (away || home) ? `${away} @ ${home}` : (row.game || "");
}
function unique(arr) { return [...new Set(arr.filter(Boolean))].sort(); }
function escapeHtml(s) {
  return String(s ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
}
function hasDfs(row) { return !!(row.dfs && (row.dfs.prizepicks || row.dfs.underdog)); }

function applyFilters(rows) {
  const game = $("game").value, stat = $("stat").value, side = $("side").value;
  const minPct = Number($("minPct").value || 0);
  const q = $("q").value.trim().toLowerCase();
  return rows.filter((r) => {
    if (state.view === "ev" && !(r.pct_to_hit >= 54)) return false;
    if (state.view === "dfs" && !hasDfs(r)) return false;
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
    const va = a[state.sortKey], vb = b[state.sortKey];
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
}
function bookCell(row, key) {
  const src = (key === "prizepicks" || key === "underdog") ? row.dfs?.[key] : row.books?.[key];
  if (!src) return `<td class="muted">—</td>`;
  const same = src.line == null || Number(src.line) === Number(row.line);
  const note = same ? "" : `<div class="line-note">${src.line}</div>`;
  return `<td class="price">${american(src.price)}${note}</td>`;
}
function fillSelect(sel, values, allLabel) {
  const current = sel.value;
  sel.innerHTML = `<option value="">${allLabel}</option>` + values.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
  if ([...sel.options].some((o) => o.value === current)) sel.value = current;
}

function render() {
  if (!state.data) return;
  const all = state.data.props || [];
  $("updated").textContent = `Updated ${fmtWhen(state.data.updated)}`;
  fillSelect($("game"), unique(all.map((r) => r.game)), "All games");
  fillSelect($("stat"), unique(all.map((r) => r.stat)), "All props");
  const rows = sortRows(applyFilters(all));
  $("count").textContent = `${rows.length.toLocaleString()} shown`;
  if (!rows.length) {
    $("tbody").innerHTML = "";
    $("empty").style.display = "block";
    return;
  }
  $("empty").style.display = "none";
  $("tbody").innerHTML = rows.map((r) => {
    const sideClass = (r.side === "Over" || r.side === "Yes") ? "over" : "under";
    return `<tr>
      <td><div class="player">${escapeHtml(r.player)}</div><div class="game">${escapeHtml(matchup(r))} · ${escapeHtml(fmtWhen(r.commence_time))}</div></td>
      <td>${escapeHtml(r.stat)}</td>
      <td><span class="tag ${sideClass}">${escapeHtml(r.side)}</span>${r.line ?? ""}</td>
      <td><span class="${pctClass(r.pct_to_hit)}">${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</span></td>
      <td class="${r.ev >= 0 ? "" : "muted"}">${r.ev == null ? "—" : (r.ev > 0 ? "+" : "") + r.ev.toFixed(1)}</td>
      ${BOOK_COLS.map(([k]) => bookCell(r, k)).join("")}
    </tr>`;
  }).join("");
}

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    state.view = btn.dataset.view;
    render();
  });
});
["game","stat","side","q","minPct"].forEach((id) => {
  $(id).addEventListener("input", render);
  $(id).addEventListener("change", render);
});
document.querySelectorAll("th[data-key]").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;
    if (state.sortKey === key) state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
    else { state.sortKey = key; state.sortDir = (key === "player" || key === "stat") ? "asc" : "desc"; }
    render();
  });
});
fetch(DATA_URL + "?t=" + Date.now())
  .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
  .then((data) => { state.data = data; render(); })
  .catch(() => {
    $("updated").textContent = "Could not load data/nfl-props.json";
    $("empty").style.display = "block";
  });
