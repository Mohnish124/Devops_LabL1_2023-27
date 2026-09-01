const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_local_dev';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Accept any username and password for smooth lab testing
    if (username && password) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    return res.status(401).json({ error: 'Please enter a username and password' });
});

app.get('/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.json({ valid: true, user: decoded });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`);
});
