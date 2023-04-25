package com.example.springbootbackend.api;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeAddresDTO {

    private EmployeeDetailDTO employee;
    private AddressDTO address;

}
