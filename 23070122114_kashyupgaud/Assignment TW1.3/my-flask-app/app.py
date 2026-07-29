from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    print("Main branch update!")
    print("User Auth feature is active!")
    return 'Hello, Docker!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')