package com.example.springbootbackend.service;


import com.example.springbootbackend.api.EmployeeAddresDTO;
import com.example.springbootbackend.api.EmployeeDTO;
import com.example.springbootbackend.api.EmployeeDetailDTO;
import com.example.springbootbackend.api.EmployeeRequest;
import com.example.springbootbackend.domain.Employee;

import java.util.List;

public interface EmployeeService {
    List<EmployeeDTO> getAll();

    EmployeeAddresDTO getEmployee(Long id);

    //met feign proxy
    EmployeeAddresDTO getEmployeeFeign(Long id);

    EmployeeDTO createEmployee(EmployeeRequest employeeRequest);

    void deleteEmployee(Long id);

    EmployeeDTO updateEmployee(Long id, EmployeeRequest employeeRequest);
}
