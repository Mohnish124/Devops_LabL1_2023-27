# ---------- Build stage ----------
FROM maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /build

COPY pom.xml .
RUN mvn -B -q dependency:go-offline

COPY src ./src
RUN mvn -B -q clean package -DskipTests


# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre

WORKDIR /app

RUN useradd --system --create-home --uid 1001 springuser

COPY --from=builder /build/target/retail-web-app-1.0.0.jar /app/app.jar

RUN chown -R springuser:springuser /app

USER springuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
