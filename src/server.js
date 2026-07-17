'use strict';
// coinflip — sıfır bağımlılık Node HTTP servisi. / sayfa, /flip JSON, /health.
const http = require('node:http');

function flip() {
  return Math.random() < 0.5 ? 'Yazı' : 'Tura';
}

const PAGE = `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Yazı Tura</title><style>
  body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#0f1420;color:#e6ebf5}
  .card{text-align:center}
  #r{font-size:64px;margin:20px;min-height:72px}
  button{font-size:20px;padding:12px 28px;border-radius:10px;border:1px solid #7aa2ff;background:#1d2639;color:#e6ebf5;cursor:pointer}
  button:hover{border-color:#9db8ff}
  .m{color:#8b96ab;margin-top:12px}
</style></head><body>
<div class="card">
  <h1>🪙 Yazı Tura</h1>
  <div id="r">—</div>
  <button onclick="go()">At</button>
  <p class="m">AutoForge ile üretildi & deploy edildi</p>
</div>
<script>
async function go(){const e=document.getElementById('r');e.textContent='…';
  const j=await (await fetch('/flip')).json();e.textContent=j.result==='Yazı'?'📜 Yazı':'👑 Tura';}
</script></body></html>`;

function handler(req, res) {
  if (req.url === '/health') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('ok'); }
  if (req.url === '/flip') { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ result: flip() })); }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(PAGE);
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  http.createServer(handler).listen(port, () => console.log(`coinflip on :${port}`));
}

module.exports = { flip, handler };
