package com.example.apigateway.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {

    // /api/address    8081   address-service
    // /api/employee   8080   employee-service
    // /api/agreement  8080   employee-service

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder.routes()

                .route(p -> p.path("/api/employee/**")
                        .uri("lb://employee-service"))
                .route(p -> p.path("/api/agreement/**")
                        .uri("lb://employee-service"))
                .route(p -> p.path("/api/address/**")
                        .uri("lb://address-service"))
                .build();
    }

}
