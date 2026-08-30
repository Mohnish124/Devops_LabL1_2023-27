FROM eclipse-temurin:24-jdk

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

EXPOSE 8081

ENTRYPOINT ["java","-jar","target/retail-store-app-0.0.1-SNAPSHOT.jar"]