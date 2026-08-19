const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || process.env.SERVICE_PORT || 3000;
const HOSTNAME = os.hostname();

app.use(cors());
app.use(express.json());

const notifications = [
  {
    id: 'ntf-501',
    type: 'SYSTEM_STARTUP',
    recipient: 'System Admin',
    message: 'ShopSphere Notification Service cluster node initialized successfully.',
    timestamp: '2026-08-19T10:00:00Z',
    status: 'DELIVERED'
  },
  {
    id: 'ntf-502',
    type: 'ORDER_PLACED',
    recipient: 'Mohammad Ahmad',
    message: 'Order #ord-9001 confirmed for QuantumX Pro Smartphone.',
    timestamp: '2026-08-19T10:15:35Z',
    status: 'DELIVERED'
  },
  {
    id: 'ntf-503',
    type: 'ORDER_PLACED',
    recipient: 'Sarah Connor',
    message: 'Order #ord-9002 confirmed for 2x AcousticPure Headphones.',
    timestamp: '2026-08-19T11:42:05Z',
    status: 'DELIVERED'
  },
  {
    id: 'ntf-504',
    type: 'INVENTORY_ALERT',
    recipient: 'Vikram Mehta',
    message: 'UltraVision 34" Curved 4K Monitor stock replenished.',
    timestamp: '2026-08-19T12:00:00Z',
    status: 'DELIVERED'
  }
];

// Health probe endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'notification-service',
    hostname: HOSTNAME,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.APP_ENV || 'development',
    totalNotifications: notifications.length,
    version: '1.0.0'
  });
});

// List notifications endpoint
app.get('/api/notifications', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'notification-service',
    hostname: HOSTNAME,
    total: notifications.length,
    notifications: notifications
  });
});

// Dispatch new notification
app.post('/api/notifications', (req, res) => {
  const { type = 'GENERAL_ALERT', recipient = 'All Users', message, orderId } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      service: 'notification-service',
      hostname: HOSTNAME,
      error: 'Message is required'
    });
  }

  const newNotification = {
    id: `ntf-${Date.now().toString().slice(-4)}`,
    type,
    recipient,
    message,
    orderId: orderId || null,
    timestamp: new Date().toISOString(),
    status: 'DELIVERED'
  };

  notifications.unshift(newNotification);

  console.log(`[Notification Service] Dispatched: [${type}] to ${recipient}: "${message}"`);

  res.status(201).json({
    success: true,
    service: 'notification-service',
    hostname: HOSTNAME,
    notification: newNotification
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Notification Service] Running on http://0.0.0.0:${PORT} (Pod: ${HOSTNAME})`);
});
