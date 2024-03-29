package com.example.adressservice.repository;

import com.example.adressservice.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {


    Optional<Address> findByEmployeeId(Long employeeId);


}
