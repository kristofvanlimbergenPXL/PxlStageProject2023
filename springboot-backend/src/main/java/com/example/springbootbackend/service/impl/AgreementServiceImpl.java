package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.api.AgreementDTO;
import com.example.springbootbackend.api.AgreementRequest;
import com.example.springbootbackend.domain.Agreement;
import com.example.springbootbackend.domain.Employee;
import com.example.springbootbackend.exception.AgreementNotFoundException;
import com.example.springbootbackend.exception.EmployeeNotFoundException;
import com.example.springbootbackend.repository.AgreementRepository;
import com.example.springbootbackend.repository.EmployeeRepository;
import com.example.springbootbackend.service.AgreementService;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgreementServiceImpl implements AgreementService {

    private final AgreementRepository agreementRepository;
    private final EmployeeRepository employeeRepository;


    @Override
    public AgreementDTO addAgreement(Long employeeId, AgreementRequest agreementRequest) {

        Employee existingEmployee = employeeRepository.findById(employeeId).orElseThrow(() -> new EmployeeNotFoundException(employeeId));

        Agreement newAgreement = Agreement.builder()
                .workFunction(agreementRequest.getWorkFunction())
                .grossSalary(agreementRequest.getGrossSalary())
                .employmentHours(agreementRequest.getEmploymentHours())
                .agreementHours(agreementRequest.getAgreementHours())
                .employee(existingEmployee)
                .build();
        return new AgreementDTO(agreementRepository.save(newAgreement));
    }

    @Override
    public AgreementDTO updateAgreement(Long id, AgreementRequest agreementRequest) {

        Agreement existingAgreement = agreementRepository.findById(id).orElseThrow(() -> new AgreementNotFoundException(id));

        existingAgreement.setGrossSalary(agreementRequest.getGrossSalary());
        existingAgreement.setWorkFunction(agreementRequest.getWorkFunction());
        existingAgreement.setAgreementHours(agreementRequest.getAgreementHours());
        existingAgreement.setAgreementHours(agreementRequest.getAgreementHours());

        return new AgreementDTO(agreementRepository.save(existingAgreement));
    }

}
