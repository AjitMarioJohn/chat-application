# Use a base image with JDK and Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Build the project and generate JAR
RUN mvn clean package -DskipTests

# Use a lightweight JDK to run the application
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/target/chat-app-service-discovery.jar /app/chat-app-service-discovery.jar

# Expose port 8761 for service discovery
EXPOSE 8761

# Define an entry point to run the application
ENTRYPOINT ["java", "-jar", "/app/chat-app-service-discovery.jar"]