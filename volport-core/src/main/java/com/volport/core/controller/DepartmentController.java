package com.volport.core.controller;

import com.volport.core.dto.DepartmentDTO;
import com.volport.core.service.DepartmentService;
import com.volport.core.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private VolunteerService volunteerService;

    @GetMapping
    public ResponseEntity<?> getAllDepartments(){
        return ResponseEntity.ok().body(departmentService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> addDepartment(@RequestBody DepartmentDTO departmentDTO){
        var result = departmentService.createDepartment(departmentDTO);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/size/{departmentId}")
    public ResponseEntity<?> getDepartmentSize(@PathVariable Long departmentId){
        return ResponseEntity.ok().body(volunteerService.getDepartmentSize(departmentId));
    }

}
