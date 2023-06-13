# PxlStageProject2023

In deze repo kan je 4 implementaties voor distributed tracing in Java Spring Boot 3 terugvinden:

* De main branch is de basis setup zonder implementatie
* Micrometer_zipkin branch is implemantatie van Micrometer Tracing + Brave + Zipkin
* Micrometer_OTEL branch is implementatie van Micrometer Tracing + OpenTelemetry + Zipkin
* OTEL_Zipkin branch is implementatie van OpenTelemetry + Zipkin
* OTEL_Collector_Zipkin is implementatie van OpenTelemetry + Collecctor + ZIpkin

## Opstarten
* Backend:docker-compose up
* Frontend:ng serve

## Endpoints

* employee-service : port 8080
* address-service  : port 8081
* eureka server  : port 8761
* Api-gateway    : port 8765
* zipkin         : port 9411
* prometheus     : port 9090

## Basis setup
![image](https://github.com/kristofvanlimbergenPXL/PxlStageProject2023/assets/74915871/6be36da5-00c6-4af1-9917-1eb93a9c6b60)


