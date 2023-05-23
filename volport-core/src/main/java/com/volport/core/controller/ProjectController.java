package com.volport.core.controller;

import com.volport.core.dto.ProjectDTO;
import com.volport.core.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok().body(projectService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> addProject(@RequestBody ProjectDTO projectDTO) {
        var result  = projectService.saveProject(projectDTO);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

}
