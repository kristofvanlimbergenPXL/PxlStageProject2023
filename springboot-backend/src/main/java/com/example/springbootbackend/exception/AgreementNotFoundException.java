package com.example.springbootbackend.exception;

public class AgreementNotFoundException extends RuntimeException {

    public AgreementNotFoundException(Long id) {
        super("Agreement with id '" + id + "' does not exist!!");
    }
}
