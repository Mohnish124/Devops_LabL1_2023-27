const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        service: "Auth Microservice",
        status: "running"
    });
});

app.get("/auth", (req, res) => {
    res.json({
        authenticated: true,
        message: "Authentication service is working"
    });
});

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});