from flask import Flask, jsonify, request
import time

app = Flask(__name__)

posts = [
    {
        "id": 1,
        "username": "dhruv",
        "content": "Welcome to our scalable social media application!"
    },
    {
        "id": 2,
        "username": "admin",
        "content": "This application will later be deployed on Kubernetes."
    }
]


@app.route("/")
def home():
    return jsonify({
        "message": "Social Media API is running",
        "project": "Kubernetes Autoscaling",
        "status": "healthy"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "UP"
    })


@app.route("/posts", methods=["GET"])
def get_posts():
    return jsonify(posts)


@app.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()

    if not data or "username" not in data or "content" not in data:
        return jsonify({
            "error": "username and content are required"
        }), 400

    new_post = {
        "id": len(posts) + 1,
        "username": data["username"],
        "content": data["content"]
    }

    posts.append(new_post)

    return jsonify(new_post), 201


@app.route("/load")
def generate_load():
    # CPU-intensive operation used later for autoscaling demonstration
    result = 0

    for i in range(1000000):
        result += i * i

    return jsonify({
        "message": "Load generated successfully",
        "result": result
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)