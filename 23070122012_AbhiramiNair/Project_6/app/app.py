from flask import Flask, jsonify
import time

app = Flask(__name__)


@app.get("/")
def home():
    return jsonify({
        "application": "Social Media Demo",
        "project": "TE7950 DevOps Lab - Project 6",
        "status": "running"
    })


@app.get("/health")
def health():
    return jsonify({"status": "healthy"})


@app.get("/api/feed")
def feed():
    return jsonify({
        "posts": [
            {"id": 1, "user": "alice", "text": "Learning Kubernetes!"},
            {"id": 2, "user": "bob", "text": "Scaling is working."},
            {"id": 3, "user": "carol", "text": "DevOps lab project 6."}
        ]
    })


@app.get("/api/work")
def work():
    # Small CPU workload for demonstration/testing.
    start = time.time()
    total = 0
    while time.time() - start < 0.08:
        total += sum(i * i for i in range(2000))
    return jsonify({"status": "completed", "result": total})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
