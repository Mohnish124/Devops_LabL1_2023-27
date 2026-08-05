from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "message": "Hello World from Flask Application!",
        "version": "1.0.0",
        "author": "Mohammad Ahmad (23070122140)"
    })

@app.route('/health')
def health():
    return jsonify({"status": "UP", "service": "hello-flask-app"})

@app.route('/auth')
def auth():
    # Route added as part of feature/user-auth branch
    return jsonify({"status": "success", "message": "User Authentication Endpoint Operational"})

if __name__ == '__main__':
    print("Starting Flask Application on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
