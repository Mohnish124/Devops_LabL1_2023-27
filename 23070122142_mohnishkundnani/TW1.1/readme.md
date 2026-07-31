# Assignment TW1.1 - Git Workflow & Collaboration

## Name- Mohnish KUNDNANI
## PRN-23070122142
## Objective

To understand Git basics including repository creation, branching, committing changes, merging, resolving conflicts, and working with GitHub.

---

## Task 1.1 - Initialize Git Repository

### Commands

```bash
git init
git add .
git commit -m "Initial Commit"
```

### Result

- Git repository initialized successfully.
- Flask application committed to the main branch.

![alt text](image-1.png)

---

## Task 1.2 - Create Feature Branch

### Commands

```bash
git checkout -b feature/user-auth
git add .
git commit -m "Added authentication feature"
git push -u origin feature/user-auth
```

### Result

- Created a new feature branch.
- Added authentication feature and pushed it to GitHub.

![Feature Branch](create-branch.png)

---

## Task 1.3 - Merge Conflict

The same line was modified in both branches to create a merge conflict.

### Commands

```bash
git checkout main
git commit -m "Updated welcome message"
git merge feature/user-auth
```

After resolving the conflict:

```bash
git add .
git commit -m "Resolved merge conflict"
git push origin main
```

### Merge Conflict

![Merge Conflict](merging-1.png)

### Merge Resolved

![Merge Resolved](merging-2.png)

---

## Git Commands Used

```bash
git init
git add .
git commit
git checkout
git branch
git merge
git push
```

---

## Learning Outcomes

- Initialized a Git repository.
- Created and managed branches.
- Committed and pushed changes.
- Learned merge conflict resolution.
- Worked with a remote GitHub repository.

---

## Conclusion

This assignment provided hands-on experience with Git version control, feature branching, merge conflict resolution, and GitHub collaboration.