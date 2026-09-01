from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "service": "User Service",
        "status": "running"
    })

@app.route("/users")
def users():
    return jsonify([
        {"id": 1, "name": "Aarohi"},
        {"id": 2, "name": "Rahul"},
        {"id": 3, "name": "Priya"}
    ])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
