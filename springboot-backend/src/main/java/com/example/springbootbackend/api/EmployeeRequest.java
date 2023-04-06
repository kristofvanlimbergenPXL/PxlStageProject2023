package com.example.springbootbackend.api;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequest {

    @NotEmpty(message = "firstname can not be empty")
    private String firstName;

    @NotEmpty(message = "lastname can not be empty")
    private String lastName;

    @Past(message = "The birth date must be in the past")
    private String birthDate;

    @Email(message = "Invalid email format")
    private String email;

    //rijksregisternummer
    @NotEmpty(message = "RRN can not be empty")
    @Length(min = 11, max = 11,message = "Length must be 11 numbers")
    private String rrn;

}
