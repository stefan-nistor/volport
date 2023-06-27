package com.volport.core.controller;

import com.volport.core.dto.ProjectDTO;
import com.volport.core.repository.ProjectRepository;
import com.volport.core.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(projectService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok().body(projectService.getById(id));
    }

    @GetMapping("/{id}/volunteers")
    public ResponseEntity<?> getVolunteersForProjectId(@PathVariable Long id) {
        return ResponseEntity.ok().body(projectService.getProjectVolunteers(id));
    }

    @GetMapping("/{id}/partners")
    public ResponseEntity<?> getParntersForProjectId(@PathVariable Long id) {
        return ResponseEntity.ok().body(projectService.getProjectPartners(id));
    }

    @GetMapping("/{id}/departments")
    public ResponseEntity<?> getDepartmentsForProjectId(@PathVariable Long id){
        return ResponseEntity.ok().body(projectService.getProjectDepartments(id));
    }

    @PostMapping
    public ResponseEntity<?> addProject(@RequestBody ProjectDTO projectDTO) {
        var result = projectService.saveProject(projectDTO);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/projects")
    public ResponseEntity<?> addProjectList(@RequestBody List<ProjectDTO> projectDTOList) {
        projectService.saveProjectList(projectDTOList);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateProject(@RequestBody Map<String, List<Long>> updates, @PathVariable Long id) {
        projectService.updateProject(updates, id);
        return ResponseEntity.ok().build();
    }

}
