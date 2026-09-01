const express = require('express');
const app = express();
const API_KEY = process.env.API_KEY;

function checkAuth(req, res, next) {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/health', (req, res) => res.send('user-service healthy'));

app.get('/users', checkAuth, (req, res) => {
  res.json([
    { id: 1, name: 'Chintan Pradhan' },
    { id: 2, name: 'Aditi Sharma' }
  ]);
});

app.listen(4001, () => console.log('user-service listening on 4001'));
