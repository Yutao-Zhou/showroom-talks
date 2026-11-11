'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..', 'site');
const port = Number(process.env.PORT || 4175);
const base = '/showroom-talks';
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.ttf':'font/ttf'};
http.createServer((req,res) => {
  let requestPath;
  try {requestPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);} catch {res.writeHead(400).end();return;}
  if (requestPath === '/' || requestPath === base) {res.writeHead(302, {Location:base+'/'}).end();return;}
  if (!requestPath.startsWith(base+'/')) {res.writeHead(404).end('Not found');return;}
  const relative = requestPath.slice(base.length+1) || 'index.html';
  const file = path.resolve(root, relative);
  if (!file.startsWith(root+path.sep)) {res.writeHead(403).end();return;}
  fs.readFile(file, (error, data) => {
    if (error) {res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});res.end(fs.readFileSync(path.join(root,'404.html')));return;}
    res.writeHead(200, {'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}${base}/`));
