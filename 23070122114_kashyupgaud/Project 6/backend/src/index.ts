import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/socialsphere'
});

// Setup database tables if they don't exist
const setupDB = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(50),
      user_name VARCHAR(50),
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS likes (
      id SERIAL PRIMARY KEY,
      post_id INT REFERENCES posts(id),
      user_id VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      post_id INT REFERENCES posts(id),
      user_name VARCHAR(50),
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('Database tables verified.');
  } catch (err) {
    console.error('Error setting up DB:', err);
  }
};
setupDB();

// Health/Readiness
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});
app.get('/ready', (req: Request, res: Response) => {
  res.status(200).send('Ready');
});

// GET /api/posts
app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id, p.user_id, p.user_name, p.content, p.created_at,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count
      FROM posts p
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST /api/posts
app.post('/api/posts', async (req: Request, res: Response) => {
  const { content, user_id, user_name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (user_id, user_name, content) VALUES ($1, $2, $3) RETURNING *',
      [user_id || 'u1', user_name || 'Alex Morgan', content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// POST /api/posts/:id/like
app.post('/api/posts/:id/like', async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.body.user_id || 'u1';
  try {
    await pool.query('INSERT INTO likes (post_id, user_id) VALUES ($1, $2)', [postId, userId]);
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// DELETE /api/posts/:id/like
app.delete('/api/posts/:id/like', async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.body.user_id || 'u1';
  try {
    await pool.query('DELETE FROM likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unlike post' });
  }
});

// GET /api/posts/:id/comments
app.get('/api/posts/:id/comments', async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [postId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/posts/:id/comments
app.post('/api/posts/:id/comments', async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { content, user_name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO comments (post_id, user_name, content) VALUES ($1, $2, $3) RETURNING *',
      [postId, user_name || 'Alex Morgan', content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
