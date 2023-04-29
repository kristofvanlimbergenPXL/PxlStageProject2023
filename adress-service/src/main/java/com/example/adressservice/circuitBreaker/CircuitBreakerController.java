package com.example.adressservice.circuitBreaker;


import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class CircuitBreakerController {


    @GetMapping("/circuit-api")

    @Bulkhead(name="circuit-api")
    public String sampleApi() {
        log.info("circuit api call received");

        return "circuit-api";
    }


}
