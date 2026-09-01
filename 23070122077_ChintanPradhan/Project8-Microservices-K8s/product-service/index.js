const express = require('express');
const app = express();
const API_KEY = process.env.API_KEY;

function checkAuth(req, res, next) {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/health', (req, res) => res.send('product-service healthy'));

app.get('/products', checkAuth, (req, res) => {
  res.json([
    { id: 101, name: 'Wireless Mouse', price: 799 },
    { id: 102, name: 'Mechanical Keyboard', price: 3499 }
  ]);
});

app.listen(4002, () => console.log('product-service listening on 4002'));
