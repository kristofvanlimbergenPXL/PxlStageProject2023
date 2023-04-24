package com.example.springbootbackend.api;

import com.example.springbootbackend.domain.Agreement;
import com.example.springbootbackend.domain.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AgreementDTO {

    private Long id;
    private String workFunction;
    private int grossSalary;
    private int employmentHours;
    private int agreementHours;

    public AgreementDTO(Agreement agreement) {
        this.id= agreement.getId();
        this.workFunction= agreement.getWorkFunction();
        this.grossSalary=agreement.getGrossSalary();
        this.employmentHours=agreement.getEmploymentHours();
        this.agreementHours=agreement.getAgreementHours();
    }
}
