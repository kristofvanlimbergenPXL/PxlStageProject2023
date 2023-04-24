package com.example.springbootbackend.api;

import com.example.springbootbackend.domain.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class EmployeeDetailDTO {


    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String rrn;
    private String phoneNumber;

    private List<AgreementDTO> agreements;

    public EmployeeDetailDTO(Employee employee) {
        this.id = employee.getId();
        this.firstName = employee.getFirstName();
        this.lastName = employee.getLastName();
        this.email = employee.getEmail();
        this.rrn = employee.getRrn();
        this.phoneNumber =employee.getPhoneNumber();
        this.agreements=employee.getAgreements().stream().map(AgreementDTO::new).collect(Collectors.toList());
    }




}
