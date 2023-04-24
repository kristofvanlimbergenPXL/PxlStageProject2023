package com.example.springbootbackend.api;

import com.example.springbootbackend.domain.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgreementRequest {

    private String workFunction;
    private int grossSalary;
    private int employmentHours;
    private int agreementHours;

}
