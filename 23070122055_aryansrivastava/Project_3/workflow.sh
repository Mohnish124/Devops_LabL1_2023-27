git init
git checkout -b main
echo 'Initial' > readme.md
git add .
git commit -m 'Initial commit'
git checkout -b feature/login
echo 'Login' > login.js
git add .
git commit -m 'Add login'
git checkout main
git merge feature/login