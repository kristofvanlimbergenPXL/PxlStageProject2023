## AS <NAME> to name this stage as maven
#FROM maven:latest AS maven
#WORKDIR /usr/src/app
#COPY . /usr/src/app
## Compile and package the application to an executable JAR
#RUN mvn clean package -DskipTests
#
## For Java
#FROM eclipse-temurin:latest
#
##ARG JAR_FILE=adress-service-0.0.1-SNAPSHOT.jar
#
#WORKDIR /opt/app
#
## Copy the spring-boot-api-tutorial.jar from the maven stage to the /opt/app directory of the current stage.
#COPY --from=maven /usr/src/app/target/*.jar /opt/app/adress-service.jar
## Exposing port 8081
#
#
#ENTRYPOINT ["java","-jar","adress-service.jar"]
##ENTRYPOINT ["java","-jar","spring-boot-api-tutorial.jar"]

#
#FROM eclipse-temurin:latest
## Setting up work directory
#WORKDIR /app
#
## Copy the jar file into our app
#COPY /target/adress-service-0.0.1-SNAPSHOT.jar /app
#
## Exposing port 8080
#EXPOSE 8081
#
## Starting the application
#ENTRYPOINT  ["java", "-jar", "adress-service-0.0.1-SNAPSHOT.jar"]

#FROM eclipse-temurin:latest
## Setting up work directory
#WORKDIR /app
#
## Copy the jar file into our app
#COPY ./target/adress-service-0.0.1-SNAPSHOT.jar /app
#
## Exposing port 8080
##EXPOSE 8080
#
## Starting the applicationr
#CMD ["java", "-jar", "adress-service-0.0.1-SNAPSHOT.jar"]

FROM eclipse-temurin:latest
COPY target/*.jar address-service.jar
ENTRYPOINT ["java","-jar","/address-service.jar"]