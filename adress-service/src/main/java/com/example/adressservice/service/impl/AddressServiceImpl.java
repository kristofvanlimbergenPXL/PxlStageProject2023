package com.example.adressservice.service.impl;

import com.example.adressservice.api.AddressDTO;
import com.example.adressservice.domain.Address;
import com.example.adressservice.exception.AddressNotFoundException;
import com.example.adressservice.repository.AddressRepository;
import com.example.adressservice.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public AddressDTO getAddressByEmployeeId(Long employeeId) {

        return addressRepository.findByEmployeeId(employeeId).map(AddressDTO::new).orElseThrow(() -> new AddressNotFoundException(employeeId));
    }
}
