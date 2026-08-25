const express = require('express');
const app = express();

const API_KEY = process.env.API_KEY;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

app.get('/', (req, res) => {
  res.send('Frontend Gateway is running. Try /order');
});

app.get('/order', async (req, res) => {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
      headers: { 'x-api-key': API_KEY }
    });
    const data = await response.json();
    res.json({ message: 'Order fetched via microservices chain', data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach order-service', details: err.message });
  }
});

app.listen(4000, () => console.log('frontend-gateway listening on 4000'));
