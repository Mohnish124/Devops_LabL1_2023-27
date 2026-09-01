from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    print("Main branch update")
    print("User Authentication Feature Started")
    return "Hello World"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)