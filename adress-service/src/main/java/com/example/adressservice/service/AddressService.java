package com.example.adressservice.service;


import com.example.adressservice.api.AddressDTO;
import com.example.adressservice.domain.Address;

public interface AddressService {

    AddressDTO getAddressByEmployeeId(Long employeeId);
}
