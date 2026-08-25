const express = require('express');
const app = express();

const API_KEY = process.env.API_KEY;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

function checkAuth(req, res, next) {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/health', (req, res) => res.send('order-service healthy'));

app.get('/orders', checkAuth, async (req, res) => {
  try {
    const [usersRes, productsRes] = await Promise.all([
      fetch(`${USER_SERVICE_URL}/users`, { headers: { 'x-api-key': API_KEY } }),
      fetch(`${PRODUCT_SERVICE_URL}/products`, { headers: { 'x-api-key': API_KEY } })
    ]);
    const users = await usersRes.json();
    const products = await productsRes.json();

    res.json({
      order_id: 5001,
      buyer: users[0],
      item: products[0],
      status: 'confirmed'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to build order', details: err.message });
  }
});

app.listen(4003, () => console.log('order-service listening on 4003'));
