package com.example.springbootbackend.rest;

import com.example.springbootbackend.api.AgreementDTO;
import com.example.springbootbackend.api.AgreementRequest;
import com.example.springbootbackend.domain.Agreement;
import com.example.springbootbackend.service.AgreementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/agreement")
public class AgreementController {

    private final AgreementService agreementService;


    @PostMapping("/{employeeId}")
    public ResponseEntity<AgreementDTO> addAgreementOnEmployee(@PathVariable Long employeeId,@Valid @RequestBody AgreementRequest agreementRequest){

        return new ResponseEntity<>(agreementService.addAgreement(employeeId,agreementRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgreementDTO> updateAgreement(@PathVariable Long id,@Valid @RequestBody AgreementRequest agreementRequest){

        return new ResponseEntity<>(agreementService.updateAgreement(id,agreementRequest),HttpStatus.OK);
    }

}
