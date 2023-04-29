package com.example.springbootbackend.proxy;


import com.example.springbootbackend.api.AddressDTO;
import com.example.springbootbackend.api.EmployeeAddresDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//@FeignClient(name = "address-service",url = "localhost:8081/api/address") --> deze als je zonder docker werkt
@FeignClient(name = "address-service")
public interface EmployeeAddressProxy {


    @GetMapping("/{employeeId}")
    public AddressDTO getAddressByEmployeeId(@PathVariable Long employeeId);


}
