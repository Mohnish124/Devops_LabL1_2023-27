const http = require('http');
function json(res, status, body) { res.writeHead(status, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}); res.end(JSON.stringify(body)); }
function body(req) { return new Promise((resolve,reject)=>{ let raw=''; req.on('data',c=>raw+=c); req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{})}catch(e){reject(e)}}); }); }
function start(port, handler) { http.createServer(async (req,res)=>{ if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type'});return res.end()} if(req.url==='/health'){return json(res,200,{status:'ok'})} try { await handler(req,res) } catch(e) { console.error(e); json(res,500,{error:'Internal server error'}) } }).listen(port,()=>console.log(`listening on ${port}`)); }
module.exports = { json, body, start };

