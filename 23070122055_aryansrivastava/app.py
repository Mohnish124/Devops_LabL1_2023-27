from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    print("User authenticated successfully!")
    print("Hello world accessed!")
    return 'Hello World!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
