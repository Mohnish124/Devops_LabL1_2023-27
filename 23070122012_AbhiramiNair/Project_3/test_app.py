import json
import threading
import time
from urllib.request import Request, urlopen
from urllib.error import HTTPError

from app import HTTPServer, TaskHandler, TASKS


def request(method, path, data=None):
    body = None if data is None else json.dumps(data).encode()
    req = Request(
        f"http://127.0.0.1:8765{path}",
        data=body,
        method=method,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urlopen(req, timeout=3) as r:
            return r.status, json.loads(r.read())
    except HTTPError as e:
        return e.code, json.loads(e.read())


def run_tests():
    original = list(TASKS)

    server = HTTPServer(("127.0.0.1", 8765), TaskHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    time.sleep(0.1)

    try:
        status, body = request("GET", "/health")
        assert status == 200
        assert body["status"] == "healthy"

        status, body = request("GET", "/tasks")
        assert status == 200
        assert isinstance(body, list)

        status, body = request("POST", "/tasks", {"title": "Test branch workflow"})
        assert status == 201
        assert body["title"] == "Test branch workflow"

        status, body = request("POST", "/tasks", {})
        assert status == 400
        assert "required" in body["error"]

        print("All tests passed.")
    finally:
        TASKS[:] = original
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    run_tests()
