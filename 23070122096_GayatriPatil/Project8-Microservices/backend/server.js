const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        service: "Backend Microservice",
        status: "running"
    });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from Backend API"
    });
});

app.listen(PORT, () => {
    console.log(`Backend service running on port ${PORT}`);
});