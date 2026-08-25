import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def run(*args):
    print("$", " ".join(args))
    subprocess.run(args, cwd=ROOT, check=True)

def main():
    if (ROOT / ".git").exists():
        print("Git repository already initialized.")
        return

    run("git", "init", "-b", "main")
    run("git", "config", "user.name", "DevOps Student")
    run("git", "config", "user.email", "student@example.com")
    run("git", "add", ".")
    run("git", "commit", "-m", "chore: initial project setup")

    run("git", "switch", "-c", "develop")

    run("git", "switch", "-c", "feature/add-task-api")
    run("git", "add", "app.py", "test_app.py")
    run("git", "commit", "-m", "feat: add task API")
    run("git", "switch", "develop")
    run("git", "merge", "--no-ff", "feature/add-task-api", "-m", "merge feature/add-task-api")
    run("git", "branch", "-d", "feature/add-task-api")

    run("git", "switch", "-c", "release/1.0.0")
    run("git", "add", "README.md", "branching-model.md", "docs/journal-writeup.md")
    run("git", "commit", "-m", "chore: prepare release 1.0.0")
    run("git", "switch", "main")
    run("git", "merge", "--no-ff", "release/1.0.0", "-m", "release: 1.0.0")
    run("git", "tag", "-a", "v1.0.0", "-m", "Release 1.0.0")
    run("git", "switch", "develop")
    run("git", "merge", "--no-ff", "release/1.0.0", "-m", "merge release/1.0.0 back to develop")
    run("git", "branch", "-d", "release/1.0.0")

    run("git", "switch", "main")
    run("git", "switch", "-c", "hotfix/1.0.1")
    run("git", "add", ".")
    run("git", "commit", "-m", "fix: correct production validation")
    run("git", "switch", "main")
    run("git", "merge", "--no-ff", "hotfix/1.0.1", "-m", "hotfix: 1.0.1")
    run("git", "tag", "-a", "v1.0.1", "-m", "Hotfix 1.0.1")
    run("git", "switch", "develop")
    run("git", "merge", "--no-ff", "hotfix/1.0.1", "-m", "merge hotfix/1.0.1 back to develop")
    run("git", "branch", "-d", "hotfix/1.0.1")

    print("\nFinal branches:")
    run("git", "branch")
    print("\nCommit graph:")
    run("git", "log", "--oneline", "--graph", "--decorate", "--all")

if __name__ == "__main__":
    main()
