from flask import Flask

app = Flask(__name__)

@app.route('/')
def run():
    print("User Authentication Feature Added")
    return "Hello World from Main Branch"

app.run(host="0.0.0.0", port=5000)