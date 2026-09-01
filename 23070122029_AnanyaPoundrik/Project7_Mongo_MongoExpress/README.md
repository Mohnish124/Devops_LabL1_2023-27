\# Project 7 – MongoDB and Mongo Express on Kubernetes



\*\*Name:\*\* Ananya Poundrik  

\*\*Roll No.:\*\* 23070122029



\## Objective



To deploy MongoDB and Mongo Express on Kubernetes using Deployments, Services, ConfigMap, and Secret.



\## Technologies Used



\- Kubernetes

\- Docker Desktop Kubernetes

\- MongoDB

\- Mongo Express

\- kubectl

\- ConfigMap

\- Secret



\## Components



\### MongoDB



MongoDB was deployed using a Kubernetes Deployment with one replica.



MongoDB credentials were stored securely using a Kubernetes Secret.



\### Mongo Express



Mongo Express was deployed as a web-based interface for MongoDB.



It was connected to MongoDB using the Kubernetes Service and credentials stored in the Secret.



\## ConfigMap



A ConfigMap named `mongo-config` was created to store the MongoDB service hostname:



```text

mongo-host: mongo-service

