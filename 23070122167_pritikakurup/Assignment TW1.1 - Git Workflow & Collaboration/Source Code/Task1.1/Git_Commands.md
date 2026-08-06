# Git Workflow & Collaboration - Commands Used

## Create Project

```bash
mkdir HelloWorld-Flask
cd HelloWorld-Flask
```

## Create Flask Application

```bash
touch app.py
```

## Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

## Install Flask

```bash
pip install flask
```

## Generate Requirements File

```bash
pip freeze > requirements.txt
```

## Initialize Git Repository

```bash
git init
```

## Rename Default Branch

```bash
git branch -M main
```

## Stage Files

```bash
git add .
```

## Commit Changes

```bash
git commit -m "Initial Flask application"
```

## Connect Remote Repository

```bash
git remote add origin https://github.com/pritikakurup/HelloWorld-Flask.git
```

## Push to GitHub

```bash
git push -u origin main
```