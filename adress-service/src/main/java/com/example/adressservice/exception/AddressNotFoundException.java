package com.example.adressservice.exception;

public class AddressNotFoundException extends RuntimeException {

    public AddressNotFoundException(Long id) {
        super("Employee with id: " + id + " has no address");
    }
}
