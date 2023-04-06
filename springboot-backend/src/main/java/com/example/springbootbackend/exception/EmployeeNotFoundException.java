package com.example.springbootbackend.exception;

public class EmployeeNotFoundException extends RuntimeException {

    public EmployeeNotFoundException(Long id) {
        super("The employee with id '" + id + "' does not exist!!");
    }
}
