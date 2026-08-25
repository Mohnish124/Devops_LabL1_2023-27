\# Project 6: Kubernetes Horizontal Pod Autoscaling



\*\*Name:\*\* Anushka Desai  

\*\*PRN:\*\* 23070122035



This project demonstrates application scalability using \*\*Kubernetes Horizontal Pod Autoscaling (HPA)\*\*.



A Social Media application is deployed on a local Kubernetes cluster using \*\*Minikube\*\*. The application is managed using a Kubernetes Deployment, exposed using a NodePort Service, and monitored using the Kubernetes Metrics Server.



The Horizontal Pod Autoscaler automatically increases the number of application Pods when CPU utilization increases.



\## Project Flow



```text

&#x20;                   User

&#x20;                     |

&#x20;                     v

&#x20;            Kubernetes Service

&#x20;                     |

&#x20;                     v

&#x20;               Deployment

&#x20;                     |

&#x20;                     v

&#x20;                  Pods

&#x20;                     |

&#x20;                     v

&#x20;             Metrics Server

&#x20;                     |

&#x20;                     v

&#x20;                 HPA

&#x20;                     |

&#x20;         CPU utilization increases

&#x20;                     |

&#x20;                     v

&#x20;            More Pods created

&#x20;                     |

&#x20;                     v

&#x20;             Application scales

Files

deployment.yaml  - Creates the Social Media application Deployment

service.yaml     - Exposes the application using a NodePort Service

hpa.yaml         - Configures Horizontal Pod Autoscaling

README.md        - Project documentation

Prerequisites



The following tools were used for this project:



Docker Desktop

Minikube

Kubernetes

kubectl

Metrics Server

PowerShell



Verify kubectl:



kubectl version --client



Verify Minikube:



minikube version



Start the Minikube cluster:



minikube start



Check the cluster:



kubectl get nodes



The Kubernetes node should be in the Ready state.



Check Minikube:



minikube status

Kubernetes Cluster



The Kubernetes cluster was created using Minikube.



The cluster was verified using:



kubectl get nodes



Example:



NAME       STATUS   ROLES           VERSION

minikube   Ready    control-plane   v1.35.1



The active Minikube profile was also verified using:



minikube profile list

Metrics Server



The Metrics Server is required by the Horizontal Pod Autoscaler to monitor CPU and memory utilization.



The Metrics Server was enabled and verified using:



kubectl get pods -n kube-system



Resource utilization can be checked using:



kubectl top pods



Example:



NAME                                CPU(cores)   MEMORY(bytes)

social-media-app-...                0m           10Mi

social-media-app-...                0m           10Mi

Deploy the Application



The Social Media application was deployed using a Kubernetes Deployment.



Apply the Deployment:



kubectl apply -f deployment.yaml



Check the Deployment:



kubectl get deployments



Check the Pods:



kubectl get pods



The application initially runs with 2 Pods.



Example:



social-media-app-...    1/1    Running

social-media-app-...    1/1    Running

Expose the Application



A Kubernetes NodePort Service was created to expose the Social Media application.



Apply the Service:



kubectl apply -f service.yaml



Check the Service:



kubectl get services



Example:



NAME                   TYPE       PORT(S)

social-media-service   NodePort   80:31975/TCP



The NodePort Service provides access to the application from outside the Kubernetes cluster.



Configure Horizontal Pod Autoscaling



The Horizontal Pod Autoscaler was configured for the Social Media application.



Apply the HPA:



kubectl apply -f hpa.yaml



Check the HPA:



kubectl get hpa



The HPA configuration uses:



Minimum replicas: 2

Maximum replicas: 5

Target CPU utilization: 50%



Example initial HPA state:



NAME               REFERENCE                     TARGETS       MINPODS   MAXPODS   REPLICAS

social-media-hpa   Deployment/social-media-app   cpu: 0%/50%   2         5         2

Monitor Application Resources



CPU and memory usage of the application Pods can be monitored using:



kubectl top pods



This allows the Metrics Server to provide the resource utilization information required by the HPA.



The HPA can be monitored using:



kubectl get hpa

Autoscaling Demonstration



To demonstrate autoscaling, CPU load was generated for the application.



The HPA detected increased CPU utilization and automatically increased the number of application Pods.



During the test, the HPA showed:



NAME               REFERENCE                     TARGETS         MINPODS   MAXPODS   REPLICAS

social-media-hpa   Deployment/social-media-app   cpu: 218%/50%   2         5         4



This demonstrates that the HPA detected CPU utilization significantly above the configured target of 50%.



As a result, Kubernetes automatically increased the number of replicas from 2 to 4.



The scaled Pods were verified using:



kubectl get pods



The application successfully reached 4 running replicas during the autoscaling demonstration.



Autoscaling Flow

Initial Application

&#x20;      |

&#x20;      v

&#x20;  2 Pods Running

&#x20;      |

&#x20;      v

&#x20;  CPU Load Increases

&#x20;      |

&#x20;      v

&#x20;Metrics Server

&#x20;      |

&#x20;      v

&#x20;HPA Detects CPU > 50%

&#x20;      |

&#x20;      v

&#x20;Kubernetes Scales Deployment

&#x20;      |

&#x20;      v

&#x20;  4 Pods Running

Result



The project successfully demonstrated Kubernetes-based application scalability.



The Social Media application initially ran with 2 Pods. When CPU utilization increased, the Horizontal Pod Autoscaler automatically increased the number of Pods.



The demonstrated scaling behavior was:



2 Pods

&#x20; |

&#x20; | CPU utilization increases

&#x20; v

HPA detects high CPU usage

&#x20; |

&#x20; v

4 Pods



Therefore, Kubernetes successfully provided automatic horizontal scaling of the application based on CPU utilization.



Key Learning Outcomes



This project provided practical understanding of:



Kubernetes cluster creation using Minikube.

Kubernetes Deployments.

Kubernetes Pods.

Kubernetes Services.

NodePort networking.

Kubernetes Metrics Server.

CPU and memory monitoring.

Horizontal Pod Autoscaling.

Automatic scaling of application replicas.

Application scalability using Kubernetes.

Cleanup



The Kubernetes resources can be removed using:



kubectl delete -f hpa.yaml

kubectl delete -f service.yaml

kubectl delete -f deployment.yaml



The Minikube cluster can be stopped using:



minikube stop

Project Details



Project: Project 6 – Kubernetes Horizontal Pod Autoscaling

Application: Social Media Application

Platform: Kubernetes + Minikube

Service: NodePort

Autoscaling: Horizontal Pod Autoscaler (HPA)

CPU Target: 50%

Minimum Replicas: 2

Maximum Replicas: 5

Demonstrated Scaling: 2 → 4 Pods



