package com.example.springbootbackend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Past;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;



@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "firstname can not be empty")
    private String firstName;

    @NotEmpty(message = "lastname can not be empty")
    private String lastName;

/*    @Past(message = "The birth date must be in the past")
    private LocalDate birthDate;*/

    @Email(message = "Invalid email format")
    private String email;

    //rijksregisternummer
    @NotEmpty(message = "RRN can not be empty")
    @Length(min = 11, max = 11,message = "Length must be 11 numbers")
    private String rrn;


}
