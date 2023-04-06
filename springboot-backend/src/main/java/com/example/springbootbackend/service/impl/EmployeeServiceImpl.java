package com.example.springbootbackend.service.impl;


import com.example.springbootbackend.api.EmployeeDTO;
import com.example.springbootbackend.api.EmployeeRequest;
import com.example.springbootbackend.domain.Employee;
import com.example.springbootbackend.exception.EmployeeNotFoundException;
import com.example.springbootbackend.repository.EmployeeRepository;
import com.example.springbootbackend.service.EmployeeService;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Override
    public List<EmployeeDTO> getAll() {
        return employeeRepository.findAll().stream().map(EmployeeDTO::new).collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO getEmployee(Long id) {
        return employeeRepository.findById(id).map(EmployeeDTO::new).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeRequest employeeRequest) {

        Optional<Employee> existingEmployee = employeeRepository.findByRrn(employeeRequest.getRrn());
        if (existingEmployee.isEmpty()) {
            throw new ValidationException("This employee already exists!");
        }
        Employee newEmployee = Employee.builder()
                .firstName(employeeRequest.getFirstName())
                .lastName(employeeRequest.getLastName())
                .birthDate(LocalDate.parse(employeeRequest.getBirthDate(),formatter))
                .email(employeeRequest.getEmail())
                .rrn(employeeRequest.getRrn())
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
        existingEmployee.setBirthDate(LocalDate.parse(employeeRequest.getBirthDate(),formatter));
        existingEmployee.setEmail(employeeRequest.getEmail());
        existingEmployee.setRrn(employeeRequest.getRrn());

        return new EmployeeDTO(employeeRepository.save(existingEmployee));
    }


}
