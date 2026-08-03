# Assignment TW1.1 - Git Workflow & Collaboration

## Student Details

- **Name:** Harsh Rajput
- **PNR:** 23070122102
- **Course:** DevOps Lab

---

# Objective

The objective of this assignment is to understand Git version control, branching, collaboration, merge conflicts, and remote repository management using GitHub.

---

# Task 1.1 - Initialize Git Repository

### Commands Used

```bash
mkdir flask-app
cd flask-app
git init
git add .
git commit -m "Initial commit"
```

### Output

- Git repository initialized.
- Flask Hello World application committed to the main branch.

**Screenshot:** `screenshots/01_git_init.png`

---

# Task 1.2 - Create Feature Branch

### Commands Used

```bash
git checkout -b feature/user-auth
```

Modified the project by adding a new print statement.

```bash
git add .
git commit -m "Added authentication feature"
git push origin feature/user-auth
```

**Screenshot:** `screenshots/02_feature_branch.png`

---

# Task 1.3 - Merge Conflict

Modified the same line in the main branch and the feature branch.

Merged both branches.

```bash
git checkout main
git merge feature/user-auth
```

Git generated a merge conflict.

Resolved the conflict manually.

```bash
git add .
git commit -m "Resolved merge conflict"
git push origin main
```

**Screenshot:** `screenshots/03_merge_conflict.png`

---

# Git Commands Used

```bash
git init
git status
git add .
git commit -m ""
git checkout -b feature/user-auth
git branch
git merge
git push
git pull
```

---

# Learning Outcomes

- Learned Git repository initialization.
- Learned staging and committing changes.
- Learned branch creation.
- Learned merging branches.
- Learned merge conflict resolution.
- Learned pushing code to GitHub.
- Learned collaborative development using Git.

---

# Conclusion

Successfully implemented Git workflow using feature branches, commits, merging, merge conflict resolution, and GitHub remote repository.![alt text](image.png)