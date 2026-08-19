const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || process.env.SERVICE_PORT || 3000;
const HOSTNAME = os.hostname();

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 'prod-101',
    name: 'QuantumX Pro Smartphone',
    category: 'Electronics',
    price: 899.99,
    stock: 45,
    rating: 4.8,
    description: 'Flagship 5G smartphone with 120Hz AMOLED display and AI triple camera system.'
  },
  {
    id: 'prod-102',
    name: 'AcousticPure Noise-Cancelling Headphones',
    category: 'Audio',
    price: 249.99,
    stock: 80,
    rating: 4.9,
    description: 'Over-ear wireless headphones with active noise cancellation and 40-hour battery life.'
  },
  {
    id: 'prod-103',
    name: 'UltraVision 34" Curved 4K Monitor',
    category: 'Displays',
    price: 629.50,
    stock: 22,
    rating: 4.7,
    description: 'Immersive ultrawide curved IPS monitor with HDR600 and 144Hz refresh rate.'
  },
  {
    id: 'prod-104',
    name: 'ApexTactile Wireless Mechanical Keyboard',
    category: 'Peripherals',
    price: 139.00,
    stock: 64,
    rating: 4.6,
    description: 'Hot-swappable mechanical switches, RGB per-key backlighting, and low-latency 2.4GHz connection.'
  },
  {
    id: 'prod-105',
    name: 'SwiftCharge 100W GaN Fast Charger',
    category: 'Accessories',
    price: 59.99,
    stock: 110,
    rating: 4.8,
    description: 'Multi-port USB-C fast charger for laptops, tablets, and mobile devices.'
  }
];

// Health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'product-service',
    hostname: HOSTNAME,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.APP_ENV || 'development',
    version: '1.0.0'
  });
});

// Products catalog endpoint
app.get('/api/products', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'product-service',
    hostname: HOSTNAME,
    total: products.length,
    products: products
  });
});

// Single product lookup
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      service: 'product-service',
      hostname: HOSTNAME,
      error: `Product with ID ${req.params.id} not found`
    });
  }
  res.status(200).json({
    success: true,
    service: 'product-service',
    hostname: HOSTNAME,
    product: product
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Product Service] Running on http://0.0.0.0:${PORT} (Pod: ${HOSTNAME})`);
});
