package com.example.adressservice.rest;

import com.example.adressservice.api.AddressDTO;
import com.example.adressservice.domain.Address;
import com.example.adressservice.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/address")
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/{employeeId}")
    public ResponseEntity<AddressDTO> getAddressByEmployeeId(@PathVariable Long employeeId){
        return new ResponseEntity<>(addressService.getAddressByEmployeeId(employeeId),HttpStatus.OK);
    }

}
