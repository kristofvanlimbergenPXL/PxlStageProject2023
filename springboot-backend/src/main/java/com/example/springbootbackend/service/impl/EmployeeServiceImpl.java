package com.example.springbootbackend.service.impl;


import com.example.springbootbackend.api.*;
import com.example.springbootbackend.domain.Address;
import com.example.springbootbackend.domain.Employee;
import com.example.springbootbackend.exception.EmployeeNotFoundException;
import com.example.springbootbackend.repository.EmployeeRepository;
import com.example.springbootbackend.service.EmployeeService;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private static final String BASE_URL = "http://localhost:8081/api/address/";
    private final EmployeeRepository employeeRepository;
    private final RestTemplate restTemplate;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Override
    public List<EmployeeDTO> getAll() {
        return employeeRepository.findAll().stream().map(EmployeeDTO::new).collect(Collectors.toList());
    }

    @Override
    public EmployeeAddresDTO getEmployee(Long id) {

        EmployeeDetailDTO employee = employeeRepository.findById(id).map(EmployeeDetailDTO::new).orElseThrow(() -> new EmployeeNotFoundException(id));
        ResponseEntity<AddressDTO> responseEntity = restTemplate
                .getForEntity(BASE_URL + id,
                        AddressDTO.class);
        AddressDTO address = responseEntity.getBody();

        return new EmployeeAddresDTO(employee, address);
    }


    @Override
    public EmployeeDTO createEmployee(EmployeeRequest employeeRequest) {

        Optional<Employee> existingEmployee = employeeRepository.findByRrn(employeeRequest.getRrn());
        if (existingEmployee.isPresent()) {
            throw new ValidationException("This employee already exists!");
        }
        Employee newEmployee = Employee.builder()
                .firstName(employeeRequest.getFirstName())
                .lastName(employeeRequest.getLastName())
                .email(employeeRequest.getEmail())
                .rrn(employeeRequest.getRrn())
                .phoneNumber(employeeRequest.getPhoneNumber())
                .build();

        return new EmployeeDTO(employeeRepository.save(newEmployee));

    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeRequest employeeRequest) {

        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));

        existingEmployee.setFirstName(employeeRequest.getFirstName());
        existingEmployee.setLastName(employeeRequest.getLastName());
        existingEmployee.setEmail(employeeRequest.getEmail());
        existingEmployee.setRrn(employeeRequest.getRrn());
        existingEmployee.setPhoneNumber(employeeRequest.getPhoneNumber());

        return new EmployeeDTO(employeeRepository.save(existingEmployee));
    }


}
