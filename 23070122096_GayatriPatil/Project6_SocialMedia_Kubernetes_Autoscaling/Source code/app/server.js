const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SocialSphere - Kubernetes</title>

            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .container {
                    background: white;
                    width: 90%;
                    max-width: 650px;
                    padding: 45px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.25);
                }

                h1 {
                    font-size: 42px;
                    margin-bottom: 10px;
                    color: #333;
                }

                .subtitle {
                    color: #666;
                    font-size: 18px;
                    margin-bottom: 30px;
                }

                .status {
                    padding: 15px;
                    background: #e8fff0;
                    color: #16803c;
                    border-radius: 10px;
                    margin: 20px 0;
                    font-weight: bold;
                }

                .features {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    margin-top: 25px;
                }

                .feature {
                    background: #f5f5f5;
                    padding: 20px;
                    border-radius: 12px;
                }

                .icon {
                    font-size: 30px;
                }

                .footer {
                    margin-top: 30px;
                    color: #888;
                    font-size: 14px;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>🌐 SocialSphere</h1>

                <p class="subtitle">
                    Kubernetes-Powered Social Media Platform
                </p>

                <div class="status">
                    🟢 Application is Running
                </div>

                <div class="features">

                    <div class="feature">
                        <div class="icon">👥</div>
                        <b>Users</b>
                        <p>Connect</p>
                    </div>

                    <div class="feature">
                        <div class="icon">💬</div>
                        <b>Posts</b>
                        <p>Share</p>
                    </div>

                    <div class="feature">
                        <div class="icon">⚡</div>
                        <b>Scaling</b>
                        <p>Autoscale</p>
                    </div>

                </div>

                <div class="footer">
                    🚀 Deployed using Docker + Kubernetes + HPA
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get("/health", (req, res) => {
    res.status(200).send("Healthy");
});

app.listen(PORT, () => {
    console.log(`SocialSphere running on port ${PORT}`);
});