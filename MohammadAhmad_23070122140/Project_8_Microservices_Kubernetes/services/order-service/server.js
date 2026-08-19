const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || process.env.SERVICE_PORT || 3000;
const HOSTNAME = os.hostname();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://product-service:3000';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3000';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3000';

const DB_USERNAME = process.env.DB_USERNAME || 'not_configured';
const API_SECRET_SET = !!process.env.API_SECRET;

app.use(cors());
app.use(express.json());

const orders = [
  {
    id: 'ord-9001',
    userId: 'usr-001',
    userName: 'Mohammad Ahmad',
    productId: 'prod-101',
    productName: 'QuantumX Pro Smartphone',
    quantity: 1,
    totalAmount: 899.99,
    status: 'COMPLETED',
    createdAt: '2026-08-19T10:15:30Z'
  },
  {
    id: 'ord-9002',
    userId: 'usr-002',
    userName: 'Sarah Connor',
    productId: 'prod-102',
    productName: 'AcousticPure Noise-Cancelling Headphones',
    quantity: 2,
    totalAmount: 499.98,
    status: 'PROCESSING',
    createdAt: '2026-08-19T11:42:00Z'
  },
  {
    id: 'ord-9003',
    userId: 'usr-003',
    userName: 'Vikram Mehta',
    productId: 'prod-103',
    productName: 'UltraVision 34" Curved 4K Monitor',
    quantity: 1,
    totalAmount: 629.50,
    status: 'SHIPPED',
    createdAt: '2026-08-19T12:05:15Z'
  }
];

// Health probe endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'order-service',
    hostname: HOSTNAME,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.APP_ENV || 'development',
    databaseUser: DB_USERNAME,
    secretConfigured: API_SECRET_SET,
    connectedServices: {
      productService: PRODUCT_SERVICE_URL,
      userService: USER_SERVICE_URL,
      notificationService: NOTIFICATION_SERVICE_URL
    },
    version: '1.0.0'
  });
});

// Orders list endpoint
app.get('/api/orders', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'order-service',
    hostname: HOSTNAME,
    total: orders.length,
    orders: orders
  });
});

// Create new order (with inter-service validation and notification)
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        service: 'order-service',
        hostname: HOSTNAME,
        error: 'Missing required fields: userId and productId are required'
      });
    }

    let userName = 'Unknown Customer';
    let productName = 'Custom Item';
    let unitPrice = 99.99;

    // 1. Verify User from User Service via K8s DNS
    try {
      const userRes = await fetch(`${USER_SERVICE_URL}/api/users/${userId}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData.user) userName = userData.user.name;
      }
    } catch (err) {
      console.warn(`[Order Service] Warning: Unable to query user-service: ${err.message}`);
    }

    // 2. Verify Product from Product Service via K8s DNS
    try {
      const prodRes = await fetch(`${PRODUCT_SERVICE_URL}/api/products/${productId}`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.product) {
          productName = prodData.product.name;
          unitPrice = prodData.product.price;
        }
      }
    } catch (err) {
      console.warn(`[Order Service] Warning: Unable to query product-service: ${err.message}`);
    }

    const newOrder = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      userId,
      userName,
      productId,
      productName,
      quantity: Number(quantity),
      totalAmount: Number((unitPrice * Number(quantity)).toFixed(2)),
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    orders.unshift(newOrder);

    // 3. Dispatch Event to Notification Service via K8s DNS
    let notificationStatus = 'NOT_DISPATCHED';
    try {
      const notifRes = await fetch(`${NOTIFICATION_SERVICE_URL}/api/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ORDER_PLACED',
          recipient: userName,
          message: `Order #${newOrder.id} confirmed for ${quantity}x ${productName} (Total: $${newOrder.totalAmount})`,
          orderId: newOrder.id
        })
      });
      if (notifRes.ok) {
        notificationStatus = 'DISPATCHED_SUCCESSFULLY';
      }
    } catch (err) {
      console.warn(`[Order Service] Warning: Unable to dispatch notification: ${err.message}`);
    }

    res.status(201).json({
      success: true,
      service: 'order-service',
      hostname: HOSTNAME,
      order: newOrder,
      interServiceCommunication: {
        userService: 'CONNECTED',
        productService: 'CONNECTED',
        notificationService: notificationStatus
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      service: 'order-service',
      hostname: HOSTNAME,
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Order Service] Running on http://0.0.0.0:${PORT} (Pod: ${HOSTNAME})`);
});
