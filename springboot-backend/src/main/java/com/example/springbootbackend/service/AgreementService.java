package com.example.springbootbackend.service;

import com.example.springbootbackend.api.AgreementDTO;
import com.example.springbootbackend.api.AgreementRequest;

public interface AgreementService {


    AgreementDTO addAgreement(Long employeeId, AgreementRequest agreementRequest);

    AgreementDTO updateAgreement(Long id,AgreementRequest agreementRequest);
}
