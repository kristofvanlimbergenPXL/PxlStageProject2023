package com.example.adressservice.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Street can not be empty")
    private String street;
    @NotEmpty(message = "HouseNumber can not be empty")
    private String houseNumber;
    @NotEmpty(message = "Zipcode can not be empty")
    private String zipCode;
    @NotEmpty(message = "City can not be empty")
    private String city;
    @NotEmpty(message = "Country can not be empty")
    private String country;
    @NotNull(message = "EmployeeId can not be empty")
    private Long employeeId;

}
