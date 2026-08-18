const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || os.hostname();
const START_TIME = new Date();

let requestCount = 0;

// Mock Social Media Posts
const posts = [
    {
        id: "post-101",
        author: "@devops_ninja",
        authorName: "Mohammad Ahmad",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ahmad",
        content: "🚀 Scaled our Kubernetes cluster using Horizontal Pod Autoscaler (HPA)! Handling 10x traffic spikes effortlessly.",
        tags: ["#Kubernetes", "#DevOps", "#Autoscaling", "#CloudNative"],
        likes: 1240,
        shares: 312,
        timestamp: "10 mins ago"
    },
    {
        id: "post-102",
        author: "@k8s_architect",
        authorName: "Cloud Infrastructure",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Cloud",
        content: "Underlying social media infra challenges: Microservices decoupling, CPU-based horizontal auto-scaling, and zero-downtime rolling updates.",
        tags: ["#Microservices", "#HPA", "#Docker", "#SRE"],
        likes: 856,
        shares: 194,
        timestamp: "25 mins ago"
    },
    {
        id: "post-103",
        author: "@symbiosis_tech",
        authorName: "SIT DevOps Hub",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SIT",
        content: "DevOps Lab Project 6: Demonstrating Kubernetes HPA cluster auto-scaling under synthetic load.",
        tags: ["#DevOpsLab", "#Symbiosis", "#Kubernetes"],
        likes: 2150,
        shares: 640,
        timestamp: "1 hour ago"
    }
];

// Utility CPU intensive function to simulate real-world compute workload (e.g. content ranking/indexing)
function performComputeWorkload(iterations = 500000) {
    let x = 0.0001;
    for (let i = 0; i <= iterations; i++) {
        x += Math.sqrt(i) * Math.sin(i);
    }
    return x;
}

// Middleware: Count requests
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Serve static frontend dashboard if available
app.use(express.static(path.join(__dirname, 'public')));

// 1. Health Probe Endpoint for Kubernetes (Liveness / Readiness)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: "healthy",
        service: "social-media-app",
        hostname: HOSTNAME,
        uptimeSeconds: Math.floor((new Date() - START_TIME) / 1000),
        totalRequestsHandled: requestCount,
        timestamp: new Date().toISOString()
    });
});

// 2. Social Media Posts Feed API
app.get('/api/posts', (req, res) => {
    // Optional light compute to simulate recommendation filtering
    if (req.query.load === 'true') {
        performComputeWorkload(300000);
    }

    res.status(200).json({
        success: true,
        service: "social-media-app",
        servedByPod: HOSTNAME,
        hostArchitecture: os.arch(),
        systemCpus: os.cpus().length,
        totalRequestsHandled: requestCount,
        timestamp: new Date().toISOString(),
        feedCount: posts.length,
        posts: posts
    });
});

// 3. Dedicated CPU Load Endpoint for Autoscaler Testing
app.get('/api/load', (req, res) => {
    const iterations = parseInt(req.query.iterations) || 600000;
    const computeResult = performComputeWorkload(iterations);

    res.status(200).json({
        message: "Simulated social media indexing / recommendation compute load complete",
        servedByPod: HOSTNAME,
        computeIterations: iterations,
        resultChecksum: computeResult.toFixed(4),
        totalRequestsHandled: requestCount,
        timestamp: new Date().toISOString()
    });
});

// 4. Root Endpoint (Provides JSON overview or falls back to public dashboard)
app.get('/api/info', (req, res) => {
    res.status(200).json({
        application: "Social Media Platform Backend",
        version: "1.0.0",
        environment: "Kubernetes Cluster (HPA Enabled)",
        podIdentity: HOSTNAME,
        uptimeSeconds: Math.floor((new Date() - START_TIME) / 1000),
        systemPlatform: os.platform(),
        memoryUsage: process.memoryUsage(),
        endpoints: [
            { path: "/", description: "Web Application UI" },
            { path: "/health", description: "Kubernetes Health Check & Probes" },
            { path: "/api/posts", description: "Social Media Feed Data" },
            { path: "/api/load", description: "CPU Load Generation for HPA" },
            { path: "/api/info", description: "Pod & System Metrics" }
        ]
    });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`🚀 Social Media Backend Service Started`);
    console.log(`   Port:       ${PORT}`);
    console.log(`   Pod Host:   ${HOSTNAME}`);
    console.log(`   Start Time: ${START_TIME.toISOString()}`);
    console.log(`====================================================`);
});
