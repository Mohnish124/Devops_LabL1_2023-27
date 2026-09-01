const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || process.env.FRONTEND_PORT || 8080;
const HOSTNAME = os.hostname();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://product-service:3000';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3000';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://order-service:3000';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3000';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Frontend health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'frontend',
    hostname: HOSTNAME,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.APP_ENV || 'development',
    version: '1.0.0'
  });
});

// Aggregate system health across all microservices
app.get('/api/system/health', async (req, res) => {
  const checkService = async (name, url) => {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch(`${url}/health`, { signal: controller.signal });
      clearTimeout(timeoutId);
      const latency = Date.now() - start;
      if (response.ok) {
        const data = await response.json();
        return {
          service: name,
          url,
          status: 'ONLINE',
          pod: data.hostname || 'unknown',
          uptime: data.uptime || 0,
          latencyMs: latency,
          details: data
        };
      }
      return { service: name, url, status: 'ERROR', pod: 'none', latencyMs: latency, error: `HTTP ${response.status}` };
    } catch (err) {
      return { service: name, url, status: 'OFFLINE', pod: 'unreachable', latencyMs: Date.now() - start, error: err.message };
    }
  };

  const [productHealth, userHealth, orderHealth, notifHealth] = await Promise.all([
    checkService('Product Service', PRODUCT_SERVICE_URL),
    checkService('User Service', USER_SERVICE_URL),
    checkService('Order Service', ORDER_SERVICE_URL),
    checkService('Notification Service', NOTIFICATION_SERVICE_URL)
  ]);

  res.status(200).json({
    timestamp: new Date().toISOString(),
    frontendPod: HOSTNAME,
    services: {
      product: productHealth,
      user: userHealth,
      order: orderHealth,
      notification: notifHealth
    }
  });
});

// Proxy route: Products
app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/api/products`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: `Failed to fetch products: ${err.message}` });
  }
});

// Proxy route: Users
app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/api/users`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: `Failed to fetch users: ${err.message}` });
  }
});

// Proxy route: Orders (GET & POST)
app.get('/api/orders', async (req, res) => {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: `Failed to fetch orders: ${err.message}` });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: `Failed to submit order: ${err.message}` });
  }
});

// Proxy route: Notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const response = await fetch(`${NOTIFICATION_SERVICE_URL}/api/notifications`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, error: `Failed to fetch notifications: ${err.message}` });
  }
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Frontend] ShopSphere UI running on http://0.0.0.0:${PORT} (Pod: ${HOSTNAME})`);
});
