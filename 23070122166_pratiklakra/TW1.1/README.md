# Assignment TW1.1 - Git Workflow & Collaboration

## Objective

The objective of this assignment is to understand the fundamentals of Git version control by creating a Flask application, initializing a Git repository, working with branches, resolving merge conflicts, and pushing the project to GitHub.

---

## Tools Used

- Python
- Flask
- Git
- GitHub
- Visual Studio Code

---

## Prerequisites

The following software was installed and configured before starting the assignment:

- Python
- Git
- Visual Studio Code
- GitHub Account

---

# Task 1.1 - Initialize Git Repository

## Step 1 - Project Structure

![Project Structure](screenshots/01_project_structure.png)

---

## Step 2 - Flask Application (app.py)

![App.py](screenshots/02_app_py.png)

---

## Step 3 - Create and Activate Virtual Environment

The virtual environment was activated and all required packages were installed using the requirements file.

![Virtual Environment](screenshots/03_virtual_environment.png)

---

## Step 4 - Run Flask Application

The Flask application was executed successfully.

![Running Flask](screenshots/04_running_app_py.png)

---

## Step 5 - Verify Application in Browser

The application was verified by opening it in the browser at:

http://127.0.0.1:5000

The application displayed the expected output:

**Hello World!**

![Browser Output](screenshots/05_flask_browser_output.png)

---

# Task 1.2 - Git Workflow

## Step 6 - Initialize Git Repository

```bash
git init
```

![Git Init](screenshots/06_git_init.png)

---

## Step 7 - Rename Default Branch to Main

```bash
git branch -M main
```

![Main Branch](screenshots/07_main_branch.png)

---

## Step 8 - Verify Current Branch

```bash
git branch
```

![Git Branch](screenshots/08_git_branch.png)

---

## Step 9 - Add Remote Repository

```bash
git remote add origin <repository-url>
```

![Remote Added](screenshots/09_remote_added.png)

---

## Step 10 - Verify Remote Repository

```bash
git remote -v
```

![Remote Verify](screenshots/10_remote_verify.png)

---

## Step 11 - Push Initial Commit

```bash
git push -u origin main
```

![First Push](screenshots/11_first_push.png)

---

## Step 12 - Verify GitHub Repository

The repository was successfully pushed to GitHub.

![GitHub Repository](screenshots/12_github_repository.png)

---

# Task 1.3 - Branching and Merge Conflict

## Step 13 - Create Feature Branch

```bash
git checkout -b feature/user-auth
```

![Feature Branch](screenshots/13_feature_branch_created.png)

---

## Step 14 - Run Application after Feature Changes

The Flask application was executed again to verify the changes made in the feature branch.

![Run Feature Branch](screenshots/13_5_running_app_feature.png)

---

## Step 15 - Commit Changes in Feature Branch

```bash
git add .
git commit -m "Added user authentication feature"
```

![Feature Commit](screenshots/14_feature_branch_commit.png)

---

## Step 16 - Verify Git Log

```bash
git log --oneline --graph --all
```

![Git Log](screenshots/14_5_git_log_oneline.png)

---

## Step 17 - Push Feature Branch

```bash
git push origin feature/user-auth
```

![Feature Push](screenshots/14_6_git_push_feature.png)

---

## Step 18 - Modify Application

The application was modified on the main branch to intentionally create a merge conflict.

![Application Changes](screenshots/14_7_feature_changes_app_py.png)

---

## Step 19 - Merge Conflict

While merging the feature branch into the main branch, Git detected a merge conflict.

![Merge Conflict](screenshots/16_merge_conflict.png)

---

## Step 20 - Resolve Merge Conflict

The conflict was manually resolved in Visual Studio Code.

![Conflict Resolution](screenshots/17_conflict_resolution.png)

---

## Step 21 - Commit Merge Resolution

After resolving the conflict, the merge commit was completed successfully.

![Merge Commit](screenshots/18_merge_commit.png)

---

## Step 22 - Confirm Successful Merge

The merge was verified successfully.

![Confirm Merge](screenshots/19_confirm_merge.png)

---

## Step 23 - Verify Branches

```bash
git branch -a
```

![Branch List](screenshots/20_branch_list.png)

---

## Step 24 - Final GitHub Repository

The final repository contains all commits after resolving the merge conflict.

![Final Repository](screenshots/21_final_repository_commits.png)

---

# Learning Outcomes

Through this assignment, the following Git concepts were successfully implemented:

- Repository initialization
- Git branching
- Feature branch workflow
- GitHub remote repository
- Commit history
- Merge conflict simulation
- Manual conflict resolution
- Final merge verification

---

# Conclusion

This assignment successfully demonstrated a complete Git workflow using a Python Flask application. A feature branch was created, changes were committed, a merge conflict was intentionally generated and manually resolved, and the final project was pushed to GitHub. The assignment helped in understanding collaborative development workflows using Git and GitHub.