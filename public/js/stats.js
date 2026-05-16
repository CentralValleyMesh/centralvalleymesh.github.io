/* Central Valley Mesh — stats.js
 *
 * Uses the real MeshAddicts/meshinfo FastAPI endpoints:
 *   GET /v1/stats        → { stats: { active_nodes, total_nodes, total_chat, total_messages, total_traceroutes, ... } }
 *   GET /v1/nodes        → { nodes: { "!abcd1234": { longname, shortname, active, last_seen, ... }, ... }, count: N }
 *                          params: days=N, status=online|offline, long_name=..., short_name=..., ids=...
 *   GET /v1/traceroutes  → [ { from, to, route: [...], ... }, ... ] (up to 1000)
 *   GET /v1/chat         → params: channel=0, range=1h|24h|7d|all
 *
 * CORS note: ALLOW_ORIGINS env var on the server controls access.
 * Will be blocked from localhost but should work from the deployed domain.
 */

(function () {

  // Node name cache — populated by fetchNodes, used by other renderers
  let _nodeNames = {};
  const BASE = window.MESHINFO_BASE || 'https://meshinfo.cvme.sh';
  const TIMEOUT = 8000;

  function sig() {
    if (typeof AbortSignal.timeout === 'function') {
      return { mode: 'cors', signal: AbortSignal.timeout(TIMEOUT) };
    }
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), TIMEOUT);
    return { mode: 'cors', signal: ctrl.signal };
  }

  function fmt(n) {
    if (n == null) return '—';
    return Number(n).toLocaleString();
  }

  function timeAgo(ts) {
    if (!ts) return '—';
    // ts may be an ISO string or unix timestamp
    let secs;
    if (typeof ts === 'string') {
      secs = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
    } else {
      secs = Math.floor(Date.now() / 1000) - ts;
    }
    if (secs < 0)    return 'just now';
    if (secs < 60)   return secs + 's ago';
    if (secs < 3600) return Math.floor(secs / 60) + 'm ago';
    if (secs < 86400)return Math.floor(secs / 3600) + 'h ago';
    return Math.floor(secs / 86400) + 'd ago';
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) { el.textContent = val; el.classList.remove('loading'); }
  }

  /* ── /v1/stats ─────────────────────────────────────── */
  async function fetchStats() {
    try {
      const r = await fetch(BASE + '/v1/stats', sig());
      if (!r.ok) return false;
      const d = await r.json();
      const s = d.stats || d; // handle both { stats: {...} } and flat
      setVal('stat-nodes',    fmt(s.total_nodes));
      setVal('stat-online',   fmt(s.active_nodes));
      setVal('stat-messages', fmt(s.total_chat ?? s.total_messages));
      return true;
    } catch (_) {
      return false;
    }
  }

  /* ── /v1/nodes ─────────────────────────────────────── */
  async function fetchNodes() {
    const el = document.getElementById('nodes-widget');
    if (!el) return null;

    try {
      // Get nodes seen in last 1 day, sorted by last_seen
      const r = await fetch(BASE + '/v1/nodes?days=1', sig());
      if (!r.ok) throw new Error('not ok');
      const d = await r.json();

      // nodes is a dict keyed by node ID string (e.g. "!abcd1234")
      const nodesDict = d.nodes || {};
      const count = d.count || Object.keys(nodesDict).length;

      // Cache node names for use by other renderers
      Object.entries(nodesDict).forEach(([id, n]) => {
        _nodeNames[id] = n.longname || n.shortname || null;
        // also index without ! prefix
        _nodeNames[id.replace(/^!/, '')] = n.longname || n.shortname || null;
      });

      // If stats didn't load, fill from node data
      if (document.getElementById('stat-nodes')?.textContent === '—') {
        setVal('stat-nodes', fmt(count));
        const online = Object.values(nodesDict).filter(n => n.active).length;
        setVal('stat-online', fmt(online));
      }

      renderNodeList(nodesDict);
      return nodesDict;
    } catch (e) {
      el.innerHTML = '<div class="widget-empty">Could not load nodes — <a href="https://meshinfo.cvme.sh" target="_blank">view on MeshInfo <svg style="display:inline;vertical-align:middle;margin-left:3px" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a></div>';
      return null;
    }
  }

  function renderNodeList(nodesDict) {
    const el = document.getElementById('nodes-widget');
    if (!el) return;

    // Convert dict to array and sort by last_seen descending
    const nodes = Object.entries(nodesDict).map(([id, n]) => ({ id, ...n }));

    nodes.sort((a, b) => {
      const ta = a.last_seen ? new Date(a.last_seen).getTime() : 0;
      const tb = b.last_seen ? new Date(b.last_seen).getTime() : 0;
      return tb - ta;
    });

    const top = nodes.slice(0, 8);

    if (!top.length) {
      el.innerHTML = '<div class="widget-empty">No nodes seen recently.</div>';
      return;
    }

    el.classList.remove('widget-loading');
    el.innerHTML = top.map(n => {
      const name    = n.longname || n.shortname || n.id || 'Unknown';
      const hw      = (n.hardware || n.hardware_model || '').replace(/_/g, ' ');
      const online  = !!n.active;
      const battery = n.battery_level != null ? n.battery_level + '%' : '';
      const snr     = n.snr != null ? Number(n.snr).toFixed(1) + ' dB' : '';
      const seen    = n.last_seen ? timeAgo(n.last_seen) : '—';

      return `<div class="node-row">
        <div class="node-status-dot ${online ? 'online' : ''}"></div>
        <div class="node-info">
          <span class="node-name">${escHtml(name)}</span>
          ${hw ? `<span class="node-hw">${escHtml(hw)}</span>` : ''}
        </div>
        <div class="node-meta">
          ${battery ? `<span class="node-stat">${battery}</span>` : ''}
          ${snr     ? `<span class="node-stat">${snr}</span>`    : ''}
          <span class="node-time">${seen}</span>
        </div>
      </div>`;
    }).join('');
  }

  /* ── /v1/traceroutes ───────────────────────────────── */
  async function fetchTraceroutes() {
    const el = document.getElementById('traceroute-widget');
    if (!el) return;

    try {
      const r = await fetch(BASE + '/v1/traceroutes', sig());
      if (!r.ok) throw new Error('not ok');
      const data = await r.json();

      // Response is an array of traceroute objects
      const arr = Array.isArray(data) ? data : (data.traceroutes ?? []);
      renderTraceroutes(arr);
    } catch (_) {
      el.innerHTML = '<div class="widget-empty">Traceroute data unavailable — <a href="https://meshinfo.cvme.sh" target="_blank">view on MeshInfo <svg style="display:inline;vertical-align:middle;margin-left:3px" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a></div>';
    }
  }

  function renderTraceroutes(routes) {
    const el = document.getElementById('traceroute-widget');
    if (!el) return;

    if (!routes.length) {
      el.innerHTML = '<div class="widget-empty">No traceroute data yet.</div>';
      return;
    }

    // Sort by route length descending (longest hops = furthest reach)
    const sorted = [...routes]
      .filter(r => r.route && Array.isArray(r.route))
      .sort((a, b) => (b.route.length) - (a.route.length))
      .slice(0, 8);

    if (!sorted.length) {
      el.innerHTML = '<div class="widget-empty">No multi-hop routes recorded yet.</div>';
      return;
    }

    el.classList.remove('widget-loading');
    el.innerHTML = sorted.map((r, i) => {
      const from  = nodeName(r.from) || r.from || '?';
      const to    = nodeName(r.to)   || r.to   || '?';
      const hops  = r.route.length;
      const when  = r.ts || r.timestamp || r.created_at;
      return `<div class="trace-row">
        <span class="trace-rank">#${i + 1}</span>
        <div class="trace-path">
          <span class="trace-from" title="${escHtml(from)}">${escHtml(truncId(from))}</span>
          <span class="trace-arrow">⟶</span>
          <span class="trace-to" title="${escHtml(to)}">${escHtml(truncId(to))}</span>
        </div>
        <span class="trace-hops">${hops} hop${hops !== 1 ? 's' : ''}</span>
      </div>`;
    }).join('');
  }

  /* ── Helpers ───────────────────────────────────────── */
  function escHtml(s) {
    return String(s)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  // Shorten a node ID like "!abcd1234" to "!abcd12" for display
  function nodeName(id) {
    if (!id) return '?';
    const name = _nodeNames[id] || _nodeNames[id.replace(/^!/, '')];
    return name || truncId(id);
  }

  function truncId(id) {
    if (!id || id.length <= 9) return id;
    return id.slice(0, 9) + '…';
  }

  /* ── Init ──────────────────────────────────────────── */
  async function init() {
    await fetchStats();
    await fetchNodes();
    await fetchTraceroutes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
