package com.example.springbootbackend.domain;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Address {

    private Long id;
    private String street;
    private String houseNumber;
    private String zipCode;
    private String city;
    private String country;
    private Long employeeId;

}
