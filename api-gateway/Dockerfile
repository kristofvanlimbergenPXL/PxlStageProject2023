FROM eclipse-temurin:latest
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar .
ENV JAVA_TOOL_OPTIONS "-javaagent:./opentelemetry-javaagent.jar"
COPY target/*.jar api-gateway.jar
ENTRYPOINT ["java","-jar","/api-gateway.jar"]