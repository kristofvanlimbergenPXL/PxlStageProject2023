package com.example.springbootbackend.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Agreement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //werkfunctie  (bediende, arbeider,...
    private String workFunction;

    //brutoloon
    private int grossSalary;

    //aantal uren tewerkstelling (hoeveel uren dat employee effectief werkt  bv 30h
    private int employmentHours;

    //totaal contract uren (bv 38 h werkweek)
    private int agreementHours;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id")
    private Employee employee;

}
