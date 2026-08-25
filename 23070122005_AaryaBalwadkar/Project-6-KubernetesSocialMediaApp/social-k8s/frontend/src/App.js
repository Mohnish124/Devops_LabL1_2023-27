import React, { useState, useEffect } from 'react';

// In Kubernetes, the frontend nginx proxies /api to the backend service.
// For local dev without k8s, set REACT_APP_API_URL to http://localhost:5000
const API_BASE = process.env.REACT_APP_API_URL || '';

function App() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [servedBy, setServedBy] = useState('');
  const [stressStatus, setStressStatus] = useState('');

  const fetchPosts = () => {
    fetch(`${API_BASE}/api/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setServedBy(data.servedBy);
      })
      .catch(() => setServedBy('unreachable'));
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !text) return;
    fetch(`${API_BASE}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text })
    }).then(() => {
      setText('');
      fetchPosts();
    });
  };

  const handleLike = (id) => {
    fetch(`${API_BASE}/api/posts/${id}/like`, { method: 'POST' })
      .then(() => fetchPosts());
  };

  // Fires a burst of requests to the CPU-intensive endpoint,
  // useful for triggering the HPA during a live demo.
  const runStressTest = async () => {
    setStressStatus('Sending 200 requests to /api/stress ...');
    const requests = [];
    for (let i = 0; i < 200; i++) {
      requests.push(fetch(`${API_BASE}/api/stress`).catch(() => {}));
    }
    await Promise.all(requests);
    setStressStatus('Done! Check: kubectl get hpa -w');
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>📱 K8s Social</h1>
        <p style={styles.subtitle}>A tiny social feed for demonstrating Kubernetes autoscaling</p>
      </header>

      <div style={styles.podBanner}>
        Currently served by pod: <strong>{servedBy || 'loading...'}</strong>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Your name"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="What's happening?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button style={styles.button} type="submit">Post</button>
      </form>

      <div style={styles.stressBox}>
        <button style={styles.stressButton} onClick={runStressTest}>
          🔥 Run Load Test (trigger autoscaling)
        </button>
        {stressStatus && <p style={styles.stressStatus}>{stressStatus}</p>}
      </div>

      <div style={styles.feed}>
        {posts.map(post => (
          <div key={post.id} style={styles.post}>
            <div style={styles.postHeader}>
              <strong>{post.author}</strong>
            </div>
            <p style={styles.postText}>{post.text}</p>
            <button style={styles.likeButton} onClick={() => handleLike(post.id)}>
              ❤️ {post.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif', background: '#f0f2f5', minHeight: '100vh' },
  header: { textAlign: 'center', marginBottom: 10 },
  title: { margin: 0, color: '#1877f2' },
  subtitle: { color: '#65676b', fontSize: 14 },
  podBanner: { background: '#e7f3ff', padding: 10, borderRadius: 8, textAlign: 'center', marginBottom: 15, fontSize: 13, color: '#1877f2' },
  form: { display: 'flex', gap: 8, marginBottom: 15 },
  input: { flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccd0d5' },
  button: { padding: '10px 16px', background: '#1877f2', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' },
  stressBox: { textAlign: 'center', marginBottom: 20, background: '#fff', padding: 12, borderRadius: 8 },
  stressButton: { padding: '10px 16px', background: '#fa383e', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' },
  stressStatus: { fontSize: 13, color: '#65676b', marginTop: 8 },
  feed: { display: 'flex', flexDirection: 'column', gap: 10 },
  post: { background: 'white', padding: 15, borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' },
  postHeader: { marginBottom: 5 },
  postText: { margin: '5px 0 10px 0' },
  likeButton: { background: 'none', border: '1px solid #ccd0d5', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }
};

export default App;
