const http = require('http');
const os = require('os');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 3000);
const workMs = Number(process.env.CPU_WORK_MS || 20);
function burnCpu(milliseconds) {
  const end = Date.now() + milliseconds;
  let value = 'kubernetes-autoscale';
  while (Date.now() < end) value = crypto.createHash('sha256').update(value).digest('hex');
  return value.slice(0, 12);
}

const server = http.createServer((request, response) => {
  if (request.url === '/healthz') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ status: 'ok' }));
  }

  if (request.url === '/') {
    return serveStatic('index.html', response);
  }

  if (request.url === '/style.css' || request.url === '/app.js') {
    return serveStatic(request.url.slice(1), response);
  }

  if (request.url === '/feed') {
    const work = burnCpu(workMs);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({
      pod: os.hostname(),
      posts: ['Kubernetes is running', 'Autoscaling demo'],
      work
    }));
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ error: 'Not found' }));
});

function serveStatic(file, response) {
  const filePath = path.join(__dirname, 'public', file);
  const types = { 'index.html': 'text/html; charset=utf-8', 'style.css': 'text/css', 'app.js': 'application/javascript' };
  fs.readFile(filePath, (error, contents) => {
    if (error) { response.writeHead(404); return response.end('Not found'); }
    response.writeHead(200, { 'Content-Type': types[file] || 'text/plain' });
    response.end(contents);
  });
}

server.listen(port, '0.0.0.0', () => console.log(`social-feed listening on ${port}`));
