package com.example.springbootbackend.api;

import com.example.springbootbackend.domain.Employee;
import com.example.springbootbackend.utils.DateFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class EmployeeDTO {

    private Long id;
    private String firstName;
    private String lastName;
    //private String birthDate;
    private String email;

    private String rrn;

    public EmployeeDTO(Employee employee) {
        this.id= employee.getId();
        this.firstName = employee.getFirstName();
        this.lastName = employee.getLastName();
        this.email = employee.getEmail();
        //this.birthDate = employee.getBirthDate().format(DateFormatter.FORMATTER);
        this.rrn= employee.getRrn();
    }

}
