# Task 1.3 - Merge Conflict Resolution

## Switch to Main Branch

```bash
git checkout main
```

## Modify app.py

```python
return "Hello World Main Branch"
```

## Stage Changes

```bash
git add app.py
```

## Commit

```bash
git commit -m "Updated homepage"
```

## Merge Feature Branch

```bash
git merge feature/user-auth
```

## Resolve Merge Conflict

```python
return "Hello World Main Branch - User Authentication Feature"
```

## Stage File

```bash
git add app.py
```

## Commit

```bash
git commit -m "Resolved merge conflict"
```

## Push

```bash
git push origin main
```