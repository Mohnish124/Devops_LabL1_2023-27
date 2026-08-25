\# Project 3 – Branching Development Model



\*\*Name:\*\* Ananya Poundrik

\*\*Roll No.:\*\* 23070122029



\## Objective



To demonstrate a Git branching development model that enables parallel development, organized feature integration, and faster collaboration within a development team.



\## Branching Model



The project follows a feature-based branching workflow:



```text

main

&#x20; │

&#x20; └── develop

&#x20;      │

&#x20;      ├── feature/user-auth

&#x20;      ├── feature/payment

&#x20;      └── feature/dashboard

```



\## Workflow



1\. `main` contains stable and production-ready code.

2\. `develop` is used for integrating ongoing development work.

3\. Developers create separate `feature/\*` branches from `develop`.

4\. Changes are committed independently on feature branches.

5\. Completed features are merged into `develop` after testing and review.

6\. Stable changes are eventually merged into `main`.



\## Example Feature Workflow



```bash

git checkout develop

git checkout -b feature/user-auth



\# Make changes



git add .

git commit -m "Add user authentication"



git checkout develop

git merge feature/user-auth

```



\## Advantages



\* Supports parallel development.

\* Reduces conflicts between developers.

\* Makes feature development isolated and organized.

\* Allows code review and testing before integration.

\* Keeps the main branch stable.

\* Enables faster integration of completed features.



\## Evidence



`01\_branching\_model.png` shows the proposed Git branching development model.



\## Result



A structured Git branching model was designed to demonstrate how teams can work on multiple features in parallel and integrate completed work efficiently while maintaining a stable main branch.



