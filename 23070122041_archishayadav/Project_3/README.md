# Devops Lab 2023-27



\# Project 3: Branching Development Model



\## Overview

This document outlines our team's Git branching workflow to ensure faster work integration.



\## Git Branching \& Merging Workflow

Based on standard practices, we use the following step-by-step workflow for new features:



1\. \*\*Verify Current State:\*\* Always ensure your working tree is clean before branching using `git status`.

2\. \*\*Create and Switch to a New Branch:\*\* Use `git checkout -b <branch-name>` to create an isolated environment for your feature.

3\. \*\*Develop and Commit:\*\* Stage your changes with `git add` and commit them with a descriptive message using `git commit -m`.

4\. \*\*Switch Back to Main Branch:\*\* Return to the primary branch using `git checkout <main-branch>`.

5\. \*\*Merge the Feature Branch:\*\* Integrate your work using `git merge <branch-name>`.

6\. \*\*Push the Updated Branch:\*\* Share the integrated work with the remote repository using `git push`.



\*Note: If merge conflicts occur during step 5, manually edit the files to remove conflict markers, stage the resolved files, and commit the result.\*



\## Execution Screenshot

!\[Branching Execution](screenshot1.png)



