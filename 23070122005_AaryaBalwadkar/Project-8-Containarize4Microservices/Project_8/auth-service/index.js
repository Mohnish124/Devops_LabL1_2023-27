const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// In production, Kubernetes will inject this via a Secret
const SECRET_KEY = process.env.JWT_SECRET || 'local-dev-secret-key';

// The single responsibility route: Login and issue a token
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded annotator credentials for Phase 1 testing
    if (username === 'annotator' && password === 'secure123') {
        
        // Issue a token embedding their specific role
        const token = jwt.sign(
            { username: username, role: 'annotation-editor' }, 
            SECRET_KEY, 
            { expiresIn: '2h' }
        );
        
        return res.json({ 
            message: 'Authentication successful',
            token: token 
        });
    }

    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
});

// Health check route for Kubernetes Readiness Probes
app.get('/health', (req, res) => res.status(200).json({ status: 'Auth API is healthy' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🔒 Auth Microservice active on port ${PORT}`);
});