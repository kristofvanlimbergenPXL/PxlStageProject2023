package com.example.springbootbackend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.validator.constraints.Length;


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

    @Email(message = "Invalid email format")
    private String email;

    //rijksregisternummer
    @NotEmpty(message = "RRN can not be empty")
    @Length(min = 11, max = 11,message = "Length must be 11 numbers")
    private String rrn;

   @NotEmpty(message = "Phonenumber can not be empty")
    private String phoneNumber;

}
