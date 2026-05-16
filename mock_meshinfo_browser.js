
(function(){
  const cfg = window.MockMeshInfoConfig || {};
  const basePath = cfg.basePath || '/mock_api_data';
  const speed = Math.max(1, Number(cfg.speed || 90));
  const realFetch = window.fetch.bind(window);
  const cache = new Map();

  async function getJson(path){
    if (!cache.has(path)) {
      const r = await realFetch(basePath + path, {cache:'no-store'});
      if (!r.ok) throw new Error('Mock file not found: ' + path);
      cache.set(path, await r.json());
    }
    return structuredClone(cache.get(path));
  }

  function tick(){ return Math.floor(Date.now() / (60000 / speed)); }
  function nowSec(){ return Math.floor(Date.now()/1000); }
  function pseudo(seed, min, max){
    const x = Math.sin(seed) * 10000;
    const frac = x - Math.floor(x);
    return min + frac * (max - min);
  }
  function jsonResponse(obj){
    return new Response(JSON.stringify(obj), {status:200, headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
  }

  function freshTime(offsetSecs){ return nowSec() - Math.max(0, Math.floor(offsetSecs)); }
  function isoFromSec(s){ return new Date(s*1000).toISOString(); }

  async function buildStats(){
    const out = await getJson('/stats.json');
    const t = tick();
    out.stats.active_nodes = Math.max(1, out.stats.active_nodes + (t % 7) - 3);
    out.stats.total_chat = out.stats.total_chat + (t % 13);
    out.stats.total_messages = out.stats.total_messages + (t % 23);
    out.stats.total_mqtt_messages = out.stats.total_mqtt_messages + (t % 17);
    out.stats.total_telemetry = out.stats.total_telemetry + (t % 11);
    out.stats.total_traceroutes = out.stats.total_traceroutes + (t % 5);
    return out;
  }

  async function buildNodes(){
    const out = await getJson('/nodes.json');
    const t = tick();
    const entries = Object.entries(out.nodes || {});
    entries.sort((a,b)=> String(a[0]).localeCompare(String(b[0])));
    const visibleCount = Math.min(entries.length, 120 + (t % 20));
    const selected = entries.slice(0, visibleCount);
    const mutated = {};
    selected.forEach(([id, n], idx) => {
      const m = structuredClone(n);
      const activitySeed = t + idx * 3;
      const active = (activitySeed % 5) !== 0;
      const ago = active ? (activitySeed % 55) : (60 + (activitySeed % 720));
      m.active = active;
      m.last_seen = isoFromSec(freshTime(ago));
      if (typeof m.snr === 'number') m.snr = Math.round((m.snr + pseudo(activitySeed, -1.8, 1.8)) * 100) / 100;
      if (typeof m.rssi === 'number') m.rssi = Math.round(m.rssi + pseudo(activitySeed+7, -4, 4));
      if (typeof m.battery_level === 'number') m.battery_level = Math.max(8, Math.min(100, Math.round(m.battery_level + pseudo(activitySeed+11, -2, 2))));
      mutated[id] = m;
    });
    return {count: Object.keys(mutated).length, nodes: mutated};
  }

  async function buildTraceroutes(){
    const base = await getJson('/traceroutes.json');
    const t = tick();
    const nonzero = base.filter(r => Array.isArray(r.route) && r.route.length > 0)
      .sort((a,b)=> (b.route.length||0) - (a.route.length||0));
    const zero = base.filter(r => !Array.isArray(r.route) || r.route.length === 0);

    const rotate = (arr) => {
      if (!arr.length) return [];
      const off = t % arr.length;
      return arr.slice(off).concat(arr.slice(0, off));
    };

    const primary = rotate(nonzero).slice(0, 10);
    const filler = rotate(zero).slice(0, Math.max(0, 20 - primary.length));
    return primary.concat(filler).map((r, idx) => ({...r, ts: freshTime((idx+1)*37)}));
  }

  async function buildChat(){
    const base = await getJson('/chat.json');
    const msgs = ((base.channels||{})['0']||{}).messages || [];
    const t = tick();
    const start = Math.max(0, msgs.length - 30 - (t % 20));
    const selected = msgs.slice(start, start + 30).map((m, idx) => ({
      ...m,
      timestamp: freshTime(idx * 47 + (t % 30)),
    })).reverse();
    return {channels: {'0': {messages: selected}}};
  }

  async function buildMqtt(){
    const arr = await getJson('/mqtt_messages.json');
    const t = tick();
    const start = Math.max(0, arr.length - 30 - (t % 25));
    return arr.slice(start, start + 30).map((m, idx) => ({...m, timestamp: freshTime(idx*35 + (t % 15))})).reverse();
  }

  async function buildTelemetry(){
    const arr = await getJson('/telemetry.json');
    const t = tick();
    const start = Math.max(0, arr.length - 60 - (t % 40));
    return arr.slice(start, start + 60).map((m, idx) => {
      const x = structuredClone(m);
      x.timestamp = freshTime(idx*53 + (t % 20));
      if (x.device_metrics) {
        if (typeof x.device_metrics.battery_level === 'number') x.device_metrics.battery_level = Math.max(8, Math.min(100, Math.round(x.device_metrics.battery_level + pseudo(t+idx, -2, 2))));
        if (typeof x.device_metrics.voltage === 'number') x.device_metrics.voltage = Math.round((x.device_metrics.voltage + pseudo(t+idx+9, -0.03, 0.03))*1000)/1000;
        if (typeof x.device_metrics.channel_utilization === 'number') x.device_metrics.channel_utilization = Math.max(0, Math.round((x.device_metrics.channel_utilization + pseudo(t+idx+19, -1.5, 1.5))*10)/10);
      }
      if (x.environment_metrics) {
        if (typeof x.environment_metrics.temperature === 'number') x.environment_metrics.temperature = Math.round((x.environment_metrics.temperature + pseudo(t+idx+5, -0.8, 0.8))*10)/10;
        if (typeof x.environment_metrics.relative_humidity === 'number') x.environment_metrics.relative_humidity = Math.max(0, Math.min(100, Math.round((x.environment_metrics.relative_humidity + pseudo(t+idx+13, -3, 3))*10)/10));
      }
      return x;
    }).reverse();
  }

  async function buildMessages(){
    const arr = await getJson('/messages.json');
    const t = tick();
    const start = Math.max(0, arr.length - 40 - (t % 20));
    return arr.slice(start, start + 40).map((m, idx)=>({...m, timestamp: freshTime(idx*29)})).reverse();
  }

  async function buildNodeDetail(id){
    const all = await buildNodes();
    return all.nodes[id] || all.nodes['!'+id.replace(/^!/, '')] || null;
  }
  async function buildNodeTelem(id){
    try {
      const arr = await getJson('/nodes/' + id.replace(/^!/, '') + '.telemetry.json');
      return arr.map((m, idx)=>({...m, timestamp: freshTime(idx*71)})).reverse();
    } catch { return []; }
  }
  async function buildNodeText(id){
    try {
      const arr = await getJson('/nodes/' + id.replace(/^!/, '') + '.text.json');
      return arr.map((m, idx)=>({...m, timestamp: freshTime(idx*83)})).reverse();
    } catch { return []; }
  }

  window.fetch = async function(input, init){
    const url = typeof input === 'string' ? input : input.url;
    const u = new URL(url, location.origin);
    const path = u.pathname;

    if (path === '/v1/stats') return jsonResponse(await buildStats());
    if (path === '/v1/nodes') return jsonResponse(await buildNodes());
    if (path === '/v1/traceroutes') return jsonResponse(await buildTraceroutes());
    if (path === '/v1/chat') return jsonResponse(await buildChat());
    if (path === '/v1/messages') return jsonResponse(await buildMessages());
    if (path === '/v1/mqtt_messages') return jsonResponse(await buildMqtt());
    if (path === '/v1/telemetry') return jsonResponse(await buildTelemetry());
    if (path === '/v1/server/config') return jsonResponse(await getJson('/server_config.json'));

    let m = path.match(/^\/v1\/nodes\/([^/]+)$/);
    if (m) {
      const node = await buildNodeDetail(m[1].startsWith('!') ? m[1] : '!'+m[1]);
      return node ? jsonResponse(node) : new Response('Not found',{status:404});
    }
    m = path.match(/^\/v1\/nodes\/([^/]+)\/telemetry$/);
    if (m) return jsonResponse(await buildNodeTelem(m[1]));
    m = path.match(/^\/v1\/nodes\/([^/]+)\/text$/);
    if (m) return jsonResponse(await buildNodeText(m[1]));

    return realFetch(input, init);
  };
})();
