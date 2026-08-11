import React, { useState } from 'react'

export default function App() {
  const [metrics, setMetrics] = useState({
    containers: 4,
    builds: 28,
    uptime: "99.98%",
    lastDeployment: "Just now"
  });

  return (
    <div className="container">
      <header className="header">
        <div className="logo-badge">DevOps Lab Project 2</div>
        <div>
          <strong>Student:</strong> Mohammad Ahmad | <strong>PNR:</strong> 23070122140
        </div>
      </header>

      <section className="hero">
        <div className="status-tag">
          <span style={{ height: 8, width: 8, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
          Production Container Active (Nginx Alpine)
        </div>
        <h1>React Application Containerized via Docker</h1>
        <p>
          A high-performance Single Page Application compiled using Vite multi-stage build optimization and served via Nginx reverse proxy server.
        </p>
      </section>

      <main className="grid">
        <div className="card">
          <h3>🚀 Multi-Stage Docker Build</h3>
          <p>
            Uses <code>node:18-alpine</code> to compile production JS assets, then transfers lightweight static artifacts to <code>nginx:alpine</code> runtime image.
          </p>
          <div className="tech-stack">
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">Multi-Stage</span>
          </div>
        </div>

        <div className="card">
          <h3>⚡ Nginx Reverse Proxy</h3>
          <p>
            Custom Nginx configuration handling SPA client-side routing fallback (<code>try_files $uri /index.html</code>) and static asset caching.
          </p>
          <div className="tech-stack">
            <span className="tech-tag">Nginx</span>
            <span className="tech-tag">HTTP Server</span>
            <span className="tech-tag">Port 80</span>
          </div>
        </div>

        <div className="card">
          <h3>🐳 Docker Compose Integration</h3>
          <p>
            Orchestrated application startup with single-command deployment using <code>docker-compose up -d --build</code>.
          </p>
          <div className="tech-stack">
            <span className="tech-tag">Docker Compose</span>
            <span className="tech-tag">YAML</span>
            <span className="tech-tag">Port Mapping</span>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>DevOps Lab Submission | Mohammad Ahmad (23070122140) | Batch 2023-27</p>
      </footer>
    </div>
  );
}
