\# Project 6 – Social Media Infrastructure Using Kubernetes



\## Objective



To develop a simple social media application and demonstrate application scalability using Kubernetes autoscaling.



The application provides REST APIs for creating and viewing social media posts. A CPU-intensive endpoint is also included to generate workload for demonstrating Kubernetes Horizontal Pod Autoscaling (HPA).



\## Technologies Used



\* Python

\* Flask

\* REST API

\* Docker

\* Kubernetes

\* Kubernetes Horizontal Pod Autoscaler (HPA)



\## Application Features



The application provides the following endpoints:



| Method | Endpoint  | Description                      |

| ------ | --------- | -------------------------------- |

| GET    | `/`       | Returns application status       |

| GET    | `/health` | Health check                     |

| GET    | `/posts`  | Returns all posts                |

| POST   | `/posts`  | Creates a new post               |

| GET    | `/load`   | Generates CPU-intensive workload |



\## Running the Application Locally



Install the required Python dependencies:



```bash

pip install -r requirements.txt

```



Start the Flask application:



```bash

python app.py

```



The application runs on:



```text

http://localhost:5000

```



\## Testing



The application was tested locally using PowerShell.



\### Application Status



```text

GET / → 200 OK

```



\### Health Check



```text

GET /health → 200 OK

{

&#x20;   "status": "UP"

}

```



\### Get Posts



The `/posts` endpoint successfully returned the existing social media posts.



\### Create Post



A POST request was successfully used to create a new post:



```json

{

&#x20;   "username": "student",

&#x20;   "content": "Testing our scalable social media application!"

}

```



The application returned the newly created post with ID `3`.



\### Generate Load



The `/load` endpoint successfully generated CPU-intensive workload and returned:



```json

{

&#x20;   "message": "Load generated successfully"

}

```



\## Scalability



The application will later be containerized and deployed as a Kubernetes Deployment.



Kubernetes Horizontal Pod Autoscaling will be used to automatically increase or decrease the number of application pods based on CPU utilization.



The `/load` endpoint will be used to generate workload during the autoscaling demonstration.



\## Project Structure



```text

Project6/

│

├── app.py

├── requirements.txt

├── README.md

└── Dockerfile

```



The Dockerfile and Kubernetes configuration files will be added in the next stages of the project.



