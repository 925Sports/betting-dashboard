const DATA_URL = "./data/nfl-props.json";
const BOOK_COLS = [
  ["prizepicks", "PP"],
  ["underdog", "UD"],
  ["draftkings", "DK"],
  ["fanduel", "FD"],
  ["betmgm", "MGM"],
  ["williamhill_us", "CZR"],
];
const state = { data: null, sortKey: "pct_to_hit", sortDir: "desc" };
const $ = (id) => document.getElementById(id);

function american(price) {
  if (price == null || price === "") return "—";
  const n = Number(price);
  if (Number.isNaN(n)) return "—";
  return n > 0 ? `+${n}` : String(n);
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
    weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
  });
}
function unique(arr) { return [...new Set(arr.filter(Boolean))].sort(); }

function applyFilters(rows) {
  const game = $("game").value;
  const stat = $("stat").value;
  const side = $("side").value;
  const evOnly = $("evOnly").checked;
  const minPct = Number($("minPct").value || 0);
  const q = $("q").value.trim().toLowerCase();
  return rows.filter((r) => {
    if (game && r.game !== game) return false;
    if (stat && r.stat !== stat) return false;
    if (side && r.side !== side) return false;
    if (evOnly && !(r.pct_to_hit >= 54)) return false;
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
  if (key === "prizepicks" || key === "underdog") {
    const d = row.dfs?.[key];
    if (!d) return `<td class="muted">—</td>`;
    const lineNote = d.line != null && d.line !== row.line ? `<div class="muted">${d.line}</div>` : "";
    return `<td class="price">${american(d.price)}${lineNote}</td>`;
  }
  const b = row.books?.[key];
  if (!b) return `<td class="muted">—</td>`;
  const warn = b.same_line ? "" : `<div class="muted">${b.line ?? ""}</div>`;
  return `<td class="price">${american(b.price)}${warn}</td>`;
}

function escapeHtml(s) {
  return String(s ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
}

function fillSelect(sel, values, allLabel) {
  const current = sel.value;
  sel.innerHTML = `<option value="">${allLabel}</option>` + values.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
  sel.value = ["", ...values].includes(current) ? current : "";
}

function render() {
  if (!state.data) return;
  const all = state.data.props || [];
  $("updated").textContent = `Updated ${fmtWhen(state.data.updated)} · ${state.data.row_count || all.length} raw rows`;
  fillSelect($("game"), unique(all.map((r) => r.game)), "All games");
  fillSelect($("stat"), unique(all.map((r) => r.stat)), "All props");
  const rows = sortRows(applyFilters(all));
  $("count").textContent = `${rows.length} shown`;
  if (!rows.length) {
    $("tbody").innerHTML = "";
    $("empty").style.display = "block";
    return;
  }
  $("empty").style.display = "none";
  $("tbody").innerHTML = rows.map((r) => `
    <tr>
      <td><div class="player">${escapeHtml(r.player)}</div><div class="game">${escapeHtml(r.game)}</div></td>
      <td>${escapeHtml(r.stat)}</td>
      <td><span class="tag">${escapeHtml(r.side)}</span> ${r.line ?? ""}</td>
      <td><span class="${pctClass(r.pct_to_hit)}">${r.pct_to_hit != null ? r.pct_to_hit.toFixed(1) + "%" : "—"}</span></td>
      <td class="${r.ev >= 0 ? "" : "muted"}">${r.ev == null ? "—" : (r.ev > 0 ? "+" : "") + r.ev.toFixed(1)}</td>
      ${BOOK_COLS.map(([k]) => bookCell(r, k)).join("")}
    </tr>
  `).join("");
}

["game","stat","side","q","minPct","evOnly"].forEach((id) => {
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

fetch(`${DATA_URL}?t=${Date.now()}`)
  .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
  .then((data) => { state.data = data; render(); })
  .catch(() => {
    $("updated").textContent = "Could not load data/nfl-props.json";
    $("empty").style.display = "block";
    $("empty").textContent = "No data yet. Run the GitHub Action after adding ODDS_API_KEY.";
  });
