# Jenkins Freestyle Project

## Objective

To automate the build process of the Flask application using Jenkins Freestyle Project.

## Repository Details

**GitHub Repository**

https://github.com/pritikakurup/HelloWorld-Flask.git

**Branch**

main

## Execute Shell Build Step

```bash
echo ""

echo "BUILDING: ${JOB_NAME}, BUILD #${BUILD_NUMBER}"

echo "Workspace: ${WORKSPACE}"

echo ""

echo "Listing files:"

ls -la

echo ""

echo "Hello Jenkins!"
```

## Note

The following command was removed because the repository initially did not contain a README.md file.

```bash
cat README.md
```

## Learning Outcome

- Connected Jenkins with GitHub.
- Configured a Jenkins Freestyle Project.
- Executed shell build steps.
- Successfully completed the build process.