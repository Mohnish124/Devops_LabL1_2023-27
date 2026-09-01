\# Project 5 – Spring Boot Retail Application with Docker and DTR



\## 📌 Project Overview



This project demonstrates the development, packaging, containerization, and security analysis of a simple Retail Company Web Application using Spring Boot and Docker.



The application is developed using Java and Spring Boot with Maven as the build tool. The generated Spring Boot application is packaged into a JAR file and then containerized using Docker.



Docker Scout is also used to analyze the Docker image and identify security vulnerabilities in the application dependencies and base image.



\---



\## 🚀 Technologies Used



\- \*\*Programming Language:\*\* Java 21

\- \*\*Framework:\*\* Spring Boot

\- \*\*Build Tool:\*\* Apache Maven

\- \*\*Java Runtime:\*\* Eclipse Temurin

\- \*\*Containerization:\*\* Docker

\- \*\*Container Base Image:\*\* Eclipse Temurin 21 JRE

\- \*\*Security Analysis:\*\* Docker Scout

\- \*\*Operating System:\*\* Windows 11

\- \*\*Development Environment:\*\* Visual Studio Code



\---



\## 📂 Project Structure



```text

Project5\_SpringBoot\_DTR/

│

├── .mvn/

├── src/

│   ├── main/

│   │   ├── java/

│   │   │   └── com/

│   │   │       └── retail/

│   │   │           └── retail\_app/

│   │   │               ├── RetailAppApplication.java

│   │   │               └── controller/

│   │   │                   └── RetailController.java

│   │   │

│   │   └── resources/

│   │       └── application.properties

│   │

│   └── test/

│       └── java/

│           └── com/

│               └── retail/

│                   └── retail\_app/

│                       └── RetailAppApplicationTests.java

│

├── target/

├── Dockerfile

├── pom.xml

├── mvnw

├── mvnw.cmd

├── .gitignore

└── README.md



⚙️ Application Configuration



The application is configured to run on port 8081.



server.port=8081

spring.application.name=retail-app



The application provides a simple endpoint that displays:



Welcome to Retail Company Web Application

🏗️ Step 1 – Build the Spring Boot Application



The Maven wrapper is used to build the application.



.\\mvnw.cmd clean package



A successful build generates the application JAR file inside the target directory.



Example:



target/

└── retail-app-0.0.1-SNAPSHOT.jar



The build was successfully completed before containerization.



▶️ Step 2 – Run the Application Locally



The application can be started using:



.\\mvnw.cmd spring-boot:run



Since port 8080 was already occupied on the system, the application was configured to use port 8081.



The application can then be accessed using:



http://localhost:8081



Expected response:



Welcome to Retail Company Web Application

🐳 Step 3 – Dockerfile



The application is containerized using the following Dockerfile:



FROM eclipse-temurin:21-jre





WORKDIR /app





COPY target/retail-app-0.0.1-SNAPSHOT.jar app.jar





EXPOSE 8081





ENTRYPOINT \["java", "-jar", "app.jar"]

Dockerfile Explanation

Instruction	Purpose

FROM	Uses Eclipse Temurin Java 21 JRE as the base image

WORKDIR	Sets /app as the working directory

COPY	Copies the generated Spring Boot JAR into the container

EXPOSE	Documents port 8081 used by the application

ENTRYPOINT	Starts the Spring Boot application

🔨 Step 4 – Build Docker Image



The Docker image was created using:



docker build -t retail-app:project5 .



The image was successfully built.



Image name:



retail-app:project5

🔍 Step 5 – Verify Docker Image



The created image can be verified using:



docker images



The resulting image includes:



retail-app:project5

▶️ Step 6 – Run Docker Container



The Docker container was started using port mapping:



docker run -d -p 8081:8081 --name retail-app-project5 retail-app:project5



The container can be checked using:



docker ps



Expected container:



retail-app-project5



Port mapping:



0.0.0.0:8081 -> 8081/tcp

🧪 Step 7 – Test the Dockerized Application



The running container was tested using PowerShell:



Invoke-WebRequest http://localhost:8081 -UseBasicParsing



Expected response:



StatusCode : 200



Application response:



Welcome to Retail Company Web Application



This confirms that the Spring Boot application is successfully running inside the Docker container.



🛡️ Step 8 – Docker Scout Security Analysis



Docker Scout was used to analyze the Docker image:



docker scout cves retail-app:project5



Docker Scout successfully indexed the image and analyzed its packages.



Scan Summary

Target            : retail-app:project5

Platform          : linux/amd64

Image Size        : 133 MB

Packages          : 256





Vulnerabilities:

Critical : 1

High     : 5

Medium   : 4

Low      : 0



A total of:



10 vulnerabilities found in 3 packages



were reported by the Docker Scout scan.



The identified packages included:



Go standard library

Apache Log4j API

Jackson Databind



Docker Scout also provided fixed versions for the affected packages.



📊 Docker Scout Findings



The security scan demonstrated that even though the application was successfully containerized and functional, the underlying image and dependencies may contain known vulnerabilities.



The scan therefore provides an important DevSecOps step for identifying vulnerable dependencies before deployment.



The reported vulnerabilities can be addressed in future iterations by updating the relevant dependencies and/or using updated base images.



🧪 Verification Summary



The following stages were successfully completed:



Stage	Status

Spring Boot project creation	✅ Completed

Maven build	✅ Successful

JAR generation	✅ Successful

Local application execution	✅ Successful

Dockerfile creation	✅ Completed

Docker image build	✅ Successful

Docker container execution	✅ Successful

Application endpoint testing	✅ HTTP 200

Docker Scout security scan	✅ Completed

🎯 Learning Outcomes



Through this project, the following concepts were demonstrated:



Creating a Spring Boot application.

Building a Java application using Maven.

Generating an executable Spring Boot JAR.

Creating a Dockerfile for a Java application.

Building Docker images.

Running applications inside Docker containers.

Mapping host and container ports.

Testing a containerized web application.

Performing Docker image security analysis using Docker Scout.

Identifying vulnerabilities in application dependencies and container images.

Understanding the role of container security in DevSecOps.



📝 Conclusion



Project 5 successfully demonstrates the complete workflow of developing a Spring Boot application, building it with Maven, packaging it as a JAR, containerizing it using Docker, running and testing the containerized application, and performing security vulnerability analysis using Docker Scout.



The project provides a practical introduction to application containerization and DevSecOps security practices.

