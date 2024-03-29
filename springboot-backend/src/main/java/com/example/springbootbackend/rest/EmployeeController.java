package com.example.springbootbackend.rest;


import com.example.springbootbackend.api.EmployeeAddresDTO;
import com.example.springbootbackend.api.EmployeeDTO;
import com.example.springbootbackend.api.EmployeeDetailDTO;
import com.example.springbootbackend.api.EmployeeRequest;
import com.example.springbootbackend.domain.Employee;
import com.example.springbootbackend.proxy.EmployeeAddressProxy;
import com.example.springbootbackend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;



    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAll() {
        return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeAddresDTO> getEmployeeById(@PathVariable Long id) {

        return new ResponseEntity<>(employeeService.getEmployee(id), HttpStatus.OK);
    }
    //met feign
    @GetMapping("/{id}/feign")
    public ResponseEntity<EmployeeAddresDTO> getEmployeeByIdFeign(@PathVariable Long id) {

        return new ResponseEntity<>(employeeService.getEmployeeFeign(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
        return new ResponseEntity<>(employeeService.createEmployee(employeeRequest), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeRequest employeeRequest) {

        return new ResponseEntity<>(employeeService.updateEmployee(id, employeeRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
