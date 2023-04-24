package com.example.springbootbackend.repository;

import com.example.springbootbackend.domain.Agreement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgreementRepository extends JpaRepository<Agreement,Long> {


}
