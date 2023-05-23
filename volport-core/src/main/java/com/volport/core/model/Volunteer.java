package com.volport.core.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "volunteers")
public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @OneToMany
//    @JoinColumn(name = "dept_id")
//    private List<Department> departments;
//    @OneToMany
//    @JoinColumn(name = "project_id")
//    private List<Project> projects;

    private String department;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Date joinDate;
    private boolean canVote;

    //TODO: link volunteer to project and department table

}
