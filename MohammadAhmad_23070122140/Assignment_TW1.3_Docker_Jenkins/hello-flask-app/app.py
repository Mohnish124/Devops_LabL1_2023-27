from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "message": "Hello World from Containerized Flask Application (TW1.3)",
        "environment": os.getenv("FLASK_ENV", "production"),
        "author": "Mohammad Ahmad (23070122140)"
    })

@app.route('/health')
def health():
    return jsonify({"status": "UP", "container": "hello-flask-tw1.3"})

if __name__ == '__main__':
    print("Starting Dockerized Flask Application on port 5000...")
    app.run(host='0.0.0.0', port=5000)
