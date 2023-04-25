package com.example.springbootbackend.api;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AddressDTO {

    private Long id;
    private String street;
    private String houseNumber;
    private String zipCode;
    private String city;
    private String country;
}
