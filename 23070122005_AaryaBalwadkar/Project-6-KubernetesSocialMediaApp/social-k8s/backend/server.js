const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "database" of posts
let posts = [
  { id: 1, author: 'Asha', text: 'Just deployed my first Kubernetes cluster! 🚀', likes: 3 },
  { id: 2, author: 'Rohan', text: 'Autoscaling is magic. Pods appearing out of nowhere.', likes: 5 },
  { id: 3, author: 'Meera', text: 'DevOps lab going well so far.', likes: 2 }
];
let nextId = 4;

// Health check (used by k8s probes)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', pod: os.hostname() });
});

// Get all posts — also returns which pod served the request (great for demo)
app.get('/api/posts', (req, res) => {
  res.json({ posts, servedBy: os.hostname() });
});

// Create a post
app.post('/api/posts', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'author and text are required' });
  }
  const post = { id: nextId++, author, text, likes: 0 };
  posts.unshift(post);
  res.status(201).json(post);
});

// Like a post
app.post('/api/posts/:id/like', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'not found' });
  post.likes += 1;
  res.json(post);
});

// CPU-intensive endpoint used to demonstrate autoscaling under load
app.get('/api/stress', (req, res) => {
  const start = Date.now();
  let x = 0;
  // Busy loop for ~200ms to burn CPU (simulates heavy request processing)
  while (Date.now() - start < 200) {
    x += Math.sqrt(Math.random());
  }
  res.json({ result: x, pod: os.hostname() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT} (pod: ${os.hostname()})`);
});
