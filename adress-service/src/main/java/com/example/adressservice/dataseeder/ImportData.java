package com.example.adressservice.dataseeder;

import com.example.adressservice.domain.Address;
import com.example.adressservice.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class ImportData implements CommandLineRunner {

    private final AddressRepository addressRepository;

    @Override
    public void run(String... args) throws Exception {

        addressRepository.deleteAll();

        Address addres1 = Address.builder()
                .id(1L)
                .street("TestStreet")
                .houseNumber("12")
                .zipCode("3200")
                .city("Test")
                .country("België")
                .employeeId(1L)
                .build();

        Address addres2 = Address.builder()
                .id(2L)
                .street("TestStreet")
                .houseNumber("10")
                .zipCode("3500")
                .city("Test")
                .country("België")
                .employeeId(2L)
                .build();

        Address addres3 = Address.builder()
                .id(3L)
                .street("TestStreet")
                .houseNumber("18")
                .zipCode("3500")
                .city("Test")
                .country("België")
                .employeeId(3L)
                .build();

        addressRepository.saveAll(Arrays.asList(addres1, addres2, addres3));
    }
}
