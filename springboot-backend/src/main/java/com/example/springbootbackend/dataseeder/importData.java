package com.example.springbootbackend.dataseeder;

import com.example.springbootbackend.domain.Employee;
import com.example.springbootbackend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class importData implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;


    @Override
    public void run(String... args) throws Exception {

        employeeRepository.deleteAll();

        Employee employee1 = new Employee(1L, "Jan", "Janssens",  "jan@gmail.com","19800101123");
        Employee employee2 = new Employee(2L, "Jef", "Vermeulen",  "jan@gmail.com","19760220123");
        Employee employee3 = new Employee(3L, "John", "Doe",  "jan@gmail.com","19600810123");

        employeeRepository.saveAll(Arrays.asList(employee1,employee2,employee3));


    }
}
