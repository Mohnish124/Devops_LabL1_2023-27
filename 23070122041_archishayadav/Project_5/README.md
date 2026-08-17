```markdown

\# Project 5: Containerizing and Scanning a Spring Boot Application



This document outlines the step-by-step process used to complete Project 5, which involved creating a Spring Boot web application for a retail company, containerizing it using Docker, performing a vulnerability scan, and pushing the code to a remote repository.



\---



\## Phase 1: Repository Setup and Branching

1\. \*\*Clone the repository:\*\*

&#x20;  ```bash

&#x20;  git clone \[https://github.com/adroitathena2/Devops-Lab-L1\_2023-27.git](https://github.com/adroitathena2/Devops-Lab-L1\_2023-27.git)



```



2\. \*\*Navigate to the repository:\*\*

```bash

cd Devops-Lab-L1\_2023-27



```





3\. \*\*Create and switch to a dedicated assignment branch:\*\*

```bash

git checkout -b project-submissions



```





4\. \*\*Create the main submission directory:\*\*

```bash

mkdir ArchishaYadav\_23070122041

cd ArchishaYadav\_23070122041



```





5\. \*\*Create the specific project directory:\*\*

```bash

mkdir Project\_5

cd Project\_5



```







\---



\## Phase 2: Application Development



1\. \*\*Generate Spring Boot files:\*\*

Files were generated via \[Spring Initializr](https://start.spring.io/) (Maven, Java 17, Spring Web) and extracted into the `Project\_5` folder.

2\. \*\*Create the Main Application Class:\*\*

Located at `src\\main\\java\\com\\retail\\retail\_app\\RetailAppApplication.java`.

```java

package com.retail.retail\_app; 



import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;



@SpringBootApplication

@RestController

public class RetailAppApplication { 



&#x20;   public static void main(String\[] args) {

&#x20;       SpringApplication.run(RetailAppApplication.class, args); 

&#x20;   }



&#x20;   @GetMapping("/")

&#x20;   public String home() {

&#x20;       return "Welcome to the Retail Company Web Application!";

&#x20;   }

}



```





3\. \*\*Build the Application:\*\*

```bash

mvnw clean install



```







\---



\## Phase 3: Docker Containerization



1\. \*\*Create the `Dockerfile`:\*\*

In the root of `Project\_5`, created a file named exactly `Dockerfile` (removed the hidden `.txt` extension).

```dockerfile

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY target/\*.jar app.jar

EXPOSE 8080

CMD \["java", "-jar", "app.jar"]



```





\*(Note: Switched to `eclipse-temurin:17-jdk-jammy` due to `openjdk:17-jdk-slim` deprecation).\*

2\. \*\*Build the Docker Image:\*\*

```bash

docker build -t retail-app:v1 .



```





\*Screenshot 1 captured: Successful Docker Build.\*



\---



\## Phase 4: Application Deployment \& Verification



1\. \*\*Run the Docker Container:\*\*

```bash

docker run -d -p 8080:8080 --name retail-web retail-app:v1



```





2\. \*\*Verify Application:\*\*

Accessed `http://localhost:8080` in the web browser to verify the "Welcome to the Retail Company Web Application!" message.

\*Screenshot 2 captured: Working Web Application.\*

3\. \*\*Stop the Container (Cleanup):\*\*

```bash

docker stop retail-web



```







\---



\## Phase 5: Image Vulnerability Scanning



To fulfill the DTR scanning requirement without a dedicated enterprise registry, Docker Scout (the native Docker scanning tool) was used.



1\. \*\*Authenticate with Docker Hub:\*\*

```bash

docker login



```





2\. \*\*Execute the Vulnerability Scan:\*\*

```bash

docker scout cves retail-app:v1



```





\*Screenshot 3 captured: Docker Scout CVE Scan Results.\*



\---



\## Phase 6: Documentation and Version Control



1\. \*\*Navigate to the main submission directory:\*\*

```bash

cd ..



```





2\. \*\*Create the `README.md` file:\*\*

Created a markdown file containing the project list and placeholders for the execution screenshots.

3\. \*\*Stage, Commit, and Push:\*\*

```bash

git add .

git commit -m "Complete Project 5 and add README"

git push origin project-submissions



```





4\. \*\*Finalize on GitHub:\*\*

Uploaded the three saved screenshots directly into the `README.md` file via the GitHub web editor and opened a Pull Request.



```



```

