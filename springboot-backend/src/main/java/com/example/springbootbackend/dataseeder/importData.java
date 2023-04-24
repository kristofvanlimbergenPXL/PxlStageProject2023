package com.example.springbootbackend.dataseeder;

import com.example.springbootbackend.domain.Agreement;
import com.example.springbootbackend.domain.Employee;
import com.example.springbootbackend.repository.AgreementRepository;
import com.example.springbootbackend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class importData implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final AgreementRepository agreementRepository;


    @Override
    public void run(String... args) throws Exception {

        employeeRepository.deleteAll();

        Employee employee1 = new Employee(1L, "Jan", "Janssens",  "jan@gmail.com","19800101123","0494/123456",new ArrayList<>());
        Employee employee2 = new Employee(2L, "Jef", "Vermeulen",  "jan@gmail.com","19760220123","0475/987654",new ArrayList<>());
        Employee employee3 = new Employee(3L, "John", "Doe",  "jan@gmail.com","19600810123","0494/561234",new ArrayList<>());

        employeeRepository.saveAll(Arrays.asList(employee1,employee2,employee3));

        agreementRepository.deleteAll();
        Agreement agreement1=new Agreement(1L,"Bediende",2500,30,38,employee1);
        Agreement agreement2=new Agreement(2L,"Arbeider",2000,38,38,employee2);
        Agreement agreement3=new Agreement(3L,"Consulent",3500,14,38,employee1);

        agreementRepository.saveAll(Arrays.asList(agreement1,agreement2,agreement3));

    }
}
