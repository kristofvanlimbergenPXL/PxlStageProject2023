package com.example.adressservice.api;

import com.example.adressservice.domain.Address;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AddressDTO {

    private Long id;
    private String street;
    private String houseNumber;
    private String zipCode;
    private String city;
    private String country;


    public AddressDTO(Address address) {

        this.id= address.getId();
        this.street= address.getStreet();;
        this.houseNumber= address.getHouseNumber();
        this.zipCode= address.getZipCode();
        this.city= address.getCity();
        this.country= address.getCountry();
    }
}
