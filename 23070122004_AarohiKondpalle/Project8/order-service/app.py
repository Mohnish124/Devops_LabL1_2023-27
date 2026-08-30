from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "service": "Order Service",
        "status": "running"
    })

@app.route("/orders")
def orders():
    return jsonify([
        {"id": 1, "user": "Aarohi", "product": "Laptop", "status": "Confirmed"},
        {"id": 2, "user": "Rahul", "product": "Smartphone", "status": "Shipped"},
        {"id": 3, "user": "Priya", "product": "Headphones", "status": "Delivered"}
    ])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003)