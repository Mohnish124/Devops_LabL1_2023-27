const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || process.env.SERVICE_PORT || 3000;
const HOSTNAME = os.hostname();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 'usr-001',
    name: 'Mohammad Ahmad',
    email: 'mohammad.ahmad@example.com',
    role: 'Lead Architect',
    location: 'Pune, India',
    joined: '2023-08-15',
    avatar: 'MA'
  },
  {
    id: 'usr-002',
    name: 'Sarah Connor',
    email: 'sarah.c@example.com',
    role: 'DevOps Engineer',
    location: 'San Francisco, USA',
    joined: '2024-01-10',
    avatar: 'SC'
  },
  {
    id: 'usr-003',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@example.com',
    role: 'Product Manager',
    location: 'Bengaluru, India',
    joined: '2023-11-20',
    avatar: 'VM'
  },
  {
    id: 'usr-004',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    role: 'Security Specialist',
    location: 'Berlin, Germany',
    joined: '2024-03-05',
    avatar: 'ER'
  }
];

// Health probe endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'user-service',
    hostname: HOSTNAME,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.APP_ENV || 'development',
    version: '1.0.0'
  });
});

// Users list endpoint
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'user-service',
    hostname: HOSTNAME,
    total: users.length,
    users: users
  });
});

// Single user lookup
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      service: 'user-service',
      hostname: HOSTNAME,
      error: `User with ID ${req.params.id} not found`
    });
  }
  res.status(200).json({
    success: true,
    service: 'user-service',
    hostname: HOSTNAME,
    user: user
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[User Service] Running on http://0.0.0.0:${PORT} (Pod: ${HOSTNAME})`);
});
