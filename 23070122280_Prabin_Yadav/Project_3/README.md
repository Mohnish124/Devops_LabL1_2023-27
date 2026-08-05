# Project 3: Architecting Jenkins Pipeline for Scale

## Objective
This project sets up a **distributed Jenkins pipeline** for a Maven-based portfolio application. Instead of running every stage on a single machine, the pipeline is split across two separate Jenkins agent nodes — so source checkout and cleanup happen on one agent, while compilation, testing, and packaging happen on a second agent.

---

## Distributed Jenkins Architecture
A distributed Jenkins setup consists of one **controller** and one or more **agents**.

### Jenkins Controller (Master)
The controller manages job scheduling, pipeline orchestration, credentials, node management, and build history. It does not necessarily run the actual build steps itself.

### Jenkins Agent
An agent is a worker node that connects to the controller and executes the stages assigned to it. In this project, two agents (`agent1` and `agent2`) were created so different pipeline stages could run on different workers.

### Why Distributed Builds?
Splitting work across agents is useful when:
- a single machine would be overloaded running every stage
- different stages need different environments or tooling
- builds need to run in parallel or on isolated workers
- the project is large enough that scalability matters

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Jenkins | CI/CD controller and pipeline orchestration |
| Docker | Running the Jenkins controller and inbound agents |
| Maven | Build tool for the Java project (clean, compile, test, package) |
| Java | Application language |
| JUnit 5 | Unit testing framework |

---

## Step 1 — Create a Shared Docker Network
So the Jenkins controller and the agent containers could communicate with each other, they were all connected to the same Docker network:

```bash
docker network create jenkins-network
```

## Step 2 — Create the Agent Containers
Two Jenkins **inbound agent** containers were started on that network — one for each agent:

```bash
docker run -d ^
  --name agent1 ^
  --network jenkins-network ^
  jenkins/inbound-agent

docker run -d ^
  --name agent2 ^
  --network jenkins-network ^
  jenkins/inbound-agent
```

**Screenshot — Creating Agent 1 and Agent 2**
Shows both `docker run` commands executing: Docker pulling the `jenkins/inbound-agent` image (since it wasn't available locally) and successfully creating both `agent1` and `agent2` containers on the `jenkins-network`.

![Creating agent1 and agent2 containers](<screenshots/Screenshot 2026-08-01 151207.png>)

## Step 3 — Register the Agent as a Node in Jenkins
Each agent container also needs to be registered as a **Node** inside Jenkins so the controller knows it exists and can assign work to it.

**Screenshot — New node creation**
Shows Jenkins' **Manage Jenkins → Nodes → New Node** page, with the node name `agent1` entered and **Permanent Agent** selected as the node type.

![Creating a new Jenkins node for agent1](<screenshots/Screenshot 2026-08-01 151343.png>)

## Step 4 — Configure the Agent Node
Each node was configured with a remote working directory and a label used to target it from the Jenkinsfile.

- **Remote root directory:** `/home/jenkins/agent`
- **Labels:** `agent1` (the same pattern was repeated for `agent2`, labelled `agent2`)
- **Launch method:** Launch agent by connecting it to the controller
- **Availability:** Keep this agent online as much as possible

**Screenshot — Agent node configuration**
Shows the node configuration page with the remote root directory (`/home/jenkins/agent`), the `agent1` label, and the launch/availability settings used to let the agent connect inbound to the controller.

![Agent node configuration](<screenshots/Screenshot 2026-08-01 151413.png>)

## Step 5 — Verify the Agent Connects Successfully
After starting the container with the correct connection secret, the agent's logs were checked to confirm it connected to the controller.

**Screenshot — Agent connection logs**
Shows the Docker logs for the `agent2` container: `hudson.remoting.Launcher` setting up the agent, opening a WebSocket connection to the controller, and finally logging **`INFO: Connected`** — confirming the agent successfully joined the Jenkins cluster.

![Agent2 connection logs](<screenshots/Screenshot 2026-08-01 152245.png>)

## Step 6 — Confirm Both Agents Are Online
With both agents connected, the Jenkins **Nodes** page was checked to confirm they were available for scheduling.

**Screenshot — Nodes page**
Shows the Jenkins Nodes list with `agent1`, `agent2`, and the `Built-In Node` (the controller itself), all reporting architecture `Linux (amd64)`, clock **In sync**, and healthy free disk/swap/temp space — confirming both agents are online and ready to run pipeline stages.

![Jenkins nodes page showing both agents online](<screenshots/Screenshot 2026-08-01 152309.png>)

---

## Step 7 — The Maven Project
The Maven project lives in `maven-portfolio` and contains:

- `pom.xml` — build configuration
- `src/main/java/com/example/App.java` — application entry point
- `src/test/java/com/example/AppTest.java` — unit test

### `pom.xml` highlights
- `groupId`: `com.example`
- `artifactId`: `maven-portfolio`
- `version`: `1.0-SNAPSHOT`
- `maven.compiler.release`: `17`
- JUnit 5 dependencies for testing

## Step 8 — Test the Maven Build Locally
Before wiring Maven into the Jenkins pipeline, the project was built locally with `mvn package` to make sure it compiled, tested, and packaged correctly on its own.

**Screenshot — Local Maven build success**
Shows Maven downloading dependencies, building `maven-portfolio-1.0-SNAPSHOT.jar` into the local `target/` folder, and printing **`BUILD SUCCESS`** with a total build time of 21.997s — confirming the project itself is valid before automating it through Jenkins.

![Local Maven build success](<screenshots/Screenshot 2026-08-01 154332.png>)

## Step 9 — Configure the Maven Tool in Jenkins
In **Manage Jenkins → Tools**, a Maven installation named `Maven-3.9` was configured. This lets the Jenkinsfile reference Maven by name (`tools { maven 'Maven-3.9' }`) instead of hardcoding a path, and Jenkins automatically makes `mvn` available on whichever agent runs each stage.

---

## Step 10 — Create the Distributed Pipeline Job
A new Jenkins item named `Maven-Distributed-Pipeline` was created as a **Pipeline** project.

**Screenshot — New Pipeline item**
Shows the **New Item** screen with the name `Maven-Distributed-Pipeline` entered and **Pipeline** selected as the job type.

![Creating the Maven-Distributed-Pipeline job](<screenshots/Screenshot 2026-08-01 154527.png>)

## Step 11 — The Jenkinsfile
The pipeline explicitly assigns different stages to different agents using `agent { label '...' }` on each stage, with the top-level `agent none` so no stage runs on the controller by default.

```groovy
pipeline {
    agent none

    tools {
        maven 'Maven-3.9'
    }

    stages {
        stage('Checkout') {
            agent { label 'agent1' }
            steps {
                checkout scm
            }
        }

        stage('Clean') {
            agent { label 'agent1' }
            steps {
                dir('23070122280_Prabin_Yadav/Project_3/maven-portfolio') {
                    sh 'mvn clean'
                }
            }
        }

        stage('Compile') {
            agent { label 'agent2' }
            steps {
                dir('23070122280_Prabin_Yadav/Project_3/maven-portfolio') {
                    sh 'mvn compile'
                }
            }
        }

        stage('Test') {
            agent { label 'agent2' }
            steps {
                dir('23070122280_Prabin_Yadav/Project_3/maven-portfolio') {
                    sh 'mvn test'
                }
            }
        }

        stage('Package') {
            agent { label 'agent2' }
            steps {
                dir('23070122280_Prabin_Yadav/Project_3/maven-portfolio') {
                    sh 'mvn package'
                }
            }
        }
    }
}
```

**Stage breakdown:**

- **Checkout** — runs on `agent1`; pulls the latest source code from the configured Git repository.
- **Clean** — runs on `agent1`; runs `mvn clean` to remove any previous build artifacts.
- **Compile** — runs on `agent2`; compiles the Java source with `mvn compile`.
- **Test** — runs on `agent2`; executes the JUnit 5 test suite with `mvn test`.
- **Package** — runs on `agent2`; packages the compiled classes into a runnable JAR with `mvn package`.

Splitting checkout/clean onto `agent1` and compile/test/package onto `agent2` demonstrates that a single pipeline can hand different stages to different machines, rather than running everything in one place.

---

## Step 12 — Trigger the Pipeline and Review Build History
The pipeline was run multiple times while getting the agent labels, Maven tool name, and workspace path correct.

**Screenshot — Pipeline status and build history**
Shows the `Maven-Distributed-Pipeline` status page. The build history reveals builds **#1 through #6 failed** (red ✕) before build **#7 succeeded** (green ✓) — an honest record of the trial-and-error involved in getting a distributed pipeline correctly configured (see Troubleshooting below).

![Pipeline status page showing build history](<screenshots/Screenshot 2026-08-01 155908.png>)

## Step 13 — Console Output: Dependency Resolution
Once the pipeline reached the `agent2` stages, Maven downloaded the required dependencies from Maven Central.

**Screenshot — Console output downloading dependencies**
Shows the console log for build #7 downloading dependencies such as `junit-bom`, `plexus-interpolation`, `plexus-utils`, `maven-filtering`, and others from `repo.maven.apache.org`, as part of the `Compile`/`Test`/`Package` stages running on `agent2`.

![Console output downloading Maven dependencies](<screenshots/Screenshot 2026-08-01 155921.png>)

## Step 14 — Console Output: Build Success
**Screenshot — Final console output**
Shows the pipeline finishing: Maven building the jar at `/home/jenkins/agent/workspace/Maven-Distributed-Pipeline/23070122280_Prabin_Yadav/Project_3/maven-portfolio/target/...`, printing **`BUILD SUCCESS`** (total time 9.843s), followed by the pipeline's Post Actions stage echoing **`Distributed Maven Pipeline completed successfully!`**, and ending with **`Finished: SUCCESS`**.

![Console output confirming BUILD SUCCESS](<screenshots/Screenshot 2026-08-01 155931.png>)

---

## Troubleshooting
Getting a distributed pipeline running correctly took several failed builds (#1–#6) before success on #7. The main issues encountered were:

- **Incorrect or missing agent secret** — an inbound agent container must be started with the exact connection secret Jenkins generates for that node; a mismatch prevents the agent from ever showing as online.
- **Docker network misconfiguration** — the controller and both agent containers had to be on the same Docker network (`jenkins-network`) to reach each other at all.
- **Maven tool name mismatch** — the `tools { maven 'Maven-3.9' }` block in the Jenkinsfile must exactly match the name configured in **Manage Jenkins → Tools**, or the `mvn` command isn't found on the agent.
- **Incorrect project path** — since the Jenkinsfile changes into `23070122280_Prabin_Yadav/Project_3/maven-portfolio` before running Maven, an incorrect path here causes `mvn` to fail because it can't find `pom.xml`.

---

## Pipeline Execution Flow

```
Docker Network Created
        │
        ▼
Agent1 & Agent2 Containers Started
        │
        ▼
Agents Registered as Jenkins Nodes
        │
        ▼
Pipeline Triggered
        │
        ▼
Checkout (agent1) → Clean (agent1)
        │
        ▼
Compile (agent2) → Test (agent2) → Package (agent2)
        │
        ▼
BUILD SUCCESS
```

---

## Learning Outcomes
After completing this project, the following concepts were understood:

- Designing and running a distributed Jenkins pipeline across multiple agents
- Creating Jenkins inbound agents as Docker containers on a shared network
- Registering and configuring agent nodes (remote root directory, labels, launch method)
- Verifying agent connectivity through container logs and the Jenkins Nodes page
- Assigning specific pipeline stages to specific agents using `agent { label '...' }`
- Configuring a named Maven tool in Jenkins and referencing it from a Jenkinsfile
- Diagnosing real distributed-build failures: agent secrets, network connectivity, tool naming, and workspace paths

## Author
Prabin Yadav