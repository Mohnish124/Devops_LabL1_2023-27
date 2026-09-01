# Git Branching Model – Project 3

## Branches

| Branch | Purpose | Example |
|---|---|---|
| main | Production-ready code | `main` |
| develop | Integration of completed features | `develop` |
| feature/* | New functionality | `feature/add-task-api` |
| release/* | Stabilization before release | `release/1.0.0` |
| hotfix/* | Emergency production fixes | `hotfix/1.0.1` |

## Flow

```text
feature/* ───────┐
                 ▼
              develop ───────► release/* ───────► main
                 ▲                                  │
                 │                                  │
                 └──────────── hotfix/* ◄───────────┘
```

## Naming Convention

- `feature/<short-description>`
- `release/<version>`
- `hotfix/<version>`

## Commit Convention

Recommended examples:
- `feat: add task API`
- `test: add API validation tests`
- `docs: update branching workflow`
- `fix: correct task validation`
- `chore: prepare release 1.0.0`

## Pull Request Rules

1. Do not commit directly to `main`.
2. Create a feature branch from `develop`.
3. Run tests before opening a pull request.
4. Review the pull request.
5. Merge into `develop`.
6. Delete the feature branch after merge.
7. Release from a stable `develop`.
8. Tag every production release.
9. Hotfixes must be merged into both `main` and `develop`.
