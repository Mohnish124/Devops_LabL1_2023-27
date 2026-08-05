from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({
        "status": "success",
        "app_name": "Flask CI/CD Pipeline App",
        "version": "2.0.0",
        "pipeline_stage": "Production Containerized Build",
        "author": "Mohammad Ahmad (23070122140)"
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "HEALTHY",
        "service": "flask-pipeline-api",
        "container_id": os.uname().nodename if hasattr(os, 'uname') else "container-host"
    }), 200

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
