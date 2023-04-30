FROM eclipse-temurin:latest
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar .
ENV JAVA_TOOL_OPTIONS "-javaagent:./opentelemetry-javaagent.jar"
COPY target/*.jar employee-service.jar
ENTRYPOINT ["java","-jar","/employee-service.jar"]