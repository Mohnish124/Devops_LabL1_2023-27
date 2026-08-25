const express = require('express');
const app = express();

// Simulates loading a "feed" with some CPU-bound work,
// so load testing can visibly drive CPU usage up.
function buildFeed() {
  let total = 0;
  for (let i = 0; i < 5000000; i++) {
    total += Math.sqrt(i);
  }
  return total;
}

app.get('/', (req, res) => {
  res.send('Social Feed Service is running');
});

app.get('/feed', (req, res) => {
  const result = buildFeed();
  res.json({ message: 'Feed loaded', posts: 20, computeCheck: result });
});

app.listen(3000, () => console.log('Social feed app listening on port 3000'));
