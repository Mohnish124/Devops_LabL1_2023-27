# Project 7: MongoDB and Mongo Express Deployment

## 1. Objective

The goal of this experiment is to successfully orchestrate and deploy a stateful database alongside a web-based graphical user interface (GUI) within a Kubernetes cluster. This architecture separates configuration data and sensitive credentials from the application pods, adhering to containerization best practices.

* **MongoDB:** A popular NoSQL database deployed here to securely store data.
* **Mongo Express:** A web-based administrative interface that allows users to interact with MongoDB databases easily.
* **Kubernetes Resources:** The deployment utilizes standard Kubernetes objects, including Deployments (for managing pod replicas), Services (for networking), Secrets (for secure credential storage), and ConfigMaps (for standard configuration variables).

## 2. Architecture and Components

### Configuration and Security

To ensure the applications remain secure and environment-agnostic, configuration is decoupled from the pod specifications.

* **Secret (`mongodb-secret`):** An Opaque Kubernetes Secret is utilized to store the database's root credentials securely. The `mongo-root-username` and `mongo-root-password` are Base64 encoded within this file.
* **ConfigMap (`mongodb-configmap`):** A ConfigMap is used to store the `database_url`. This URL points to `mongodb-service`, ensuring that the Mongo Express frontend knows exactly where to route internal traffic to reach the database.

### MongoDB Backend Deployment

The database instance is established using specific deployment and service mappings.

* **Deployment (`mongodb-deployment`):** Deploys a single replica utilizing the standard `mongo` container image. The container listens on port `27017`. It initializes the root user by pulling `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` environment variables directly from the `mongodb-secret`.
* **Service (`mongodb-service`):** An internal ClusterIP service that exposes the MongoDB pod to the rest of the cluster on TCP port `27017`.

### Mongo Express Frontend Deployment

The administrative interface is deployed to connect to the backend and expose a UI to the user.

* **Deployment (`mongo-express-deployment`):** Deploys a single replica utilizing the `mongo-express` container image. The application container listens on port `8081`. It establishes its connection to the database by injecting `ME_CONFIG_MONGODB_ADMINUSERNAME` and `ME_CONFIG_MONGODB_ADMINPASSWORD` from the Secret, and it locates the database server by injecting `ME_CONFIG_MONGODB_SERVER` from the ConfigMap.
* **Service (`mongo-express-service`):** A NodePort service designed to expose the Mongo Express UI outside of the Kubernetes cluster. It maps external traffic from the node's port `30000` to the container's target port `8081` via TCP.

## 3. Implementation Steps

Based on the provided manifest files, the deployment followed these exact phases:

1. **Applied the Secret:** Executed `mongo-secret.yaml` to securely load the database root username and password into the cluster.
2. **Applied the ConfigMap:** Executed `mongo-configmap.yaml` to establish the internal DNS routing name (`mongodb-service`) for the database.
3. **Deployed the Database:** Executed `mongo.yaml` to spin up the MongoDB pod and its internal networking service.
4. **Deployed the Frontend:** Executed `mongo-express.yaml` to spin up the web GUI, link it to the backend via the Secret and ConfigMap, and expose it externally on NodePort `30000`.

## 4. Verification and Results

To verify that the deployment was successful, the application was accessed through the exposed NodePort.

! [screenshots/Screenshot 2026-08-17 104623.png]

The deployment successfully demonstrates the integration of MongoDB and Mongo Express within a Kubernetes cluster using Deployments, Services, Secrets, ConfigMaps, and NodePort networking.
