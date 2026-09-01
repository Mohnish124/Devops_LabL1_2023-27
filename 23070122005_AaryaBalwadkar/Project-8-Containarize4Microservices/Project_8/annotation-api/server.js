const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || 'local-dev-secret-key';
const PORT = process.env.PORT || 5002;

// Middleware: Verify JWT Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Mock In-Memory Store
let datasets = [
    {
        id: 1,
        title: 'Customer Feedback Sample',
        text: 'Please contact support at support@example.com or call +1-555-0199 for billing issues.',
        annotations: []
    }
];

// Rule-Based Engine to auto-flag confidential patterns
const detectConfidentialPatterns = (text) => {
    const rules = [
        { type: 'EMAIL', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g },
        { type: 'PHONE', regex: /\b\+?[0-9]{1,3}?[-. ]?\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b/g }
    ];

    let detected = [];
    rules.forEach((rule) => {
        let match;
        while ((match = rule.regex.exec(text)) !== null) {
            detected.push({
                type: rule.type,
                value: match[0],
                index: match.index
            });
        }
    });
    return detected;
};

// Route: Get Datasets (Protected)
app.get('/api/datasets', authenticateToken, (req, res) => {
    res.json(datasets);
});

// Route: Auto-Scan Text for Confidential Data (Protected)
app.post('/api/datasets/:id/scan', authenticateToken, (req, res) => {
    const dataset = datasets.find(d => d.id === parseInt(req.params.id));
    if (!dataset) return res.status(404).json({ error: 'Dataset not found' });

    const findings = detectConfidentialPatterns(dataset.text);
    dataset.annotations = findings;
    res.json({ message: 'Scan complete', findings, dataset });
});

// Health check route for Kubernetes Readiness Probes
app.get('/health', (req, res) => res.status(200).json({ status: 'Annotation API is healthy' }));

app.listen(PORT, () => {
    console.log(`⚙️ Annotation Engine Microservice active on port ${PORT}`);
});