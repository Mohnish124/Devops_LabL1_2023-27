# Assignment TW1.2: Jira Project Setup, Issue Types & Agile Workflow Management

**Student Name:** Mohammad Ahmad  
**PNR:** 23070122140  
**Subject:** DevOps Lab  
**Batch:** 2023-27  

---

## 1. Introduction

Agile project management and issue tracking are essential to modern DevOps pipelines. Tools like Atlassian Jira provide visibility, traceability, and cross-functional team coordination across software development lifecycles. 

This assignment documents the setup of a Jira Scrum project named **Hello World Flask** (Project Key: `HWF`), the definition of distinct issue types (Story, Task, Bug), and the lifecycle movement of work items across the Scrum board (`To Do` → `In Progress` → `Done`).

---

## 2. Objectives

- Set up a Jira Software Cloud/Server project using the **Scrum** framework.
- Configure project metadata (Project Name: `Hello World Flask`, Project Key: `HWF`).
- Create and categorize work items using standardized Agile issue types:
  - **Story**: *Implement User Authentication Feature*
  - **Task**: *Setup Flask Environment*
  - **Bug**: *Login Page Displays Error*
- Manage sprint backlog planning and issue estimation.
- Simulate workflow status transitions by moving tasks from `To Do` to `In Progress` and `Done`.
- Document project structure, URL placeholders, and screenshots checklist.

---

## 3. Folder Structure

```
Assignment_TW1.2_Jira_Project/
├── README.md               # Jira Scrum project documentation & workflow guide
└── screenshots/            # Verification screenshot requirements
    └── SCREENSHOTS_REQUIRED.md
```

---

## 4. Prerequisites

- **Jira Software Account** (Cloud or Server access)
- **Web Browser** (Chrome, Firefox, Edge)
- Basic understanding of Agile/Scrum concepts (Sprint, Backlog, Story, Task, Bug)

---

## 5. Installation

1. Log into your Atlassian Jira instance: `https://mohammad-ahmad-devops.atlassian.net`.
2. Click **Projects** -> **Create Project**.
3. Select template: **Scrum** software development template.
4. Set project details:
   - **Project Name:** Hello World Flask
   - **Project Key:** `HWF`
   - **Project Lead:** Mohammad Ahmad (`23070122140`)

---

## 6. Commands

Although Jira is primarily managed through an interactive UI/REST API, integration with Git/GitHub is maintained using Jira smart commits in commit messages:

| Action | Git Commit Message Pattern | Jira Effect |
| :--- | :--- | :--- |
| **Reference Issue** | `git commit -m "HWF-2: Setup base Flask app structure"` | Links commit directly to Jira issue `HWF-2`. |
| **Transition Issue** | `git commit -m "HWF-2 #in-progress: Start Flask env setup"` | Automatically moves `HWF-2` to `In Progress`. |
| **Close Issue** | `git commit -m "HWF-2 #done: Complete Flask environment setup"` | Automatically moves `HWF-2` to `Done`. |

---

## 7. Expected Output

At the conclusion of the sprint transition exercise, the Jira Scrum board displays:
- **TO DO Column**: `HWF-1` (Story: Implement User Authentication Feature), `HWF-3` (Bug: Login Page Displays Error).
- **IN PROGRESS Column**: None (or active task undergoing review).
- **DONE Column**: `HWF-2` (Task: Setup Flask Environment).

---

## 8. Explanation

### Agile Issue Types Created:

1. **User Story (`HWF-1`)**:
   - **Summary:** Implement User Authentication Feature
   - **Type:** Story 📗
   - **Description:** As a user, I want an `/auth` endpoint so I can safely log into the Flask web app.

2. **Engineering Task (`HWF-2`)**:
   - **Summary:** Setup Flask Environment
   - **Type:** Task 📘
   - **Description:** Initialize Python 3.11 environment, create `app.py`, configure `requirements.txt`, and test port 5000.

3. **Bug Defect (`HWF-3`)**:
   - **Summary:** Login Page Displays Error
   - **Type:** Bug 🔴
   - **Description:** Resolves intermittent 500 error during authentication endpoint login.

### Workflow Transition Path:
```
+---------------+      Drag & Drop      +-----------------+      Drag & Drop      +--------------+
|     TO DO     | -------------------> |   IN PROGRESS   | -------------------> |     DONE     |
+---------------+                       +-----------------+                       +--------------+
  (HWF-1, HWF-3)                             (HWF-2)                                (Completed)
```

---

## 9. Screenshots Section

All required visual proofs are detailed in [SCREENSHOTS_REQUIRED.md](./screenshots/SCREENSHOTS_REQUIRED.md).

Screenshots to be placed in `screenshots/`:
- `TW1.2_SS_01_jira_project_creation.png`
- `TW1.2_SS_02_jira_backlog.png`
- `TW1.2_SS_06_board_todo.png`
- `TW1.2_SS_07_board_in_progress.png`
- `TW1.2_SS_08_board_done.png`

---

## 10. Conclusion

This assignment highlights the role of Jira in structured Agile software development. By configuring a Scrum board, creating distinct Stories, Tasks, and Bugs with Project Key `HWF`, and managing transitions from `To Do` to `In Progress`, key DevOps traceability and team workflow competencies are demonstrated.
