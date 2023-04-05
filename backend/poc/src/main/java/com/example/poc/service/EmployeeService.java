package com.example.poc.service;



import com.example.poc.api.EmployeeDTO;
import com.example.poc.api.EmployeeRequest;

import java.util.List;

public interface EmployeeService {
    List<EmployeeDTO> getAll();

    EmployeeDTO getEmployee(Long id);

    EmployeeDTO createEmployee(EmployeeRequest employeeRequest);

    void deleteEmployee(Long id);

    EmployeeDTO updateEmployee(Long id, EmployeeRequest employeeRequest);
}
