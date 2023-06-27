package com.volport.core.controller;

import com.volport.core.dto.TaskDTO;
import com.volport.core.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;


    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        return ResponseEntity.ok(taskService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getById(id));
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<?> getByProjectId(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getByProjectId(id));
    }

    @GetMapping("/ongoing")
    public ResponseEntity<?> getOngoingTasks() {
        return ResponseEntity.ok(taskService.getOngoingTasks());
    }

    @GetMapping("/completed")
    public ResponseEntity<?> getCompletedTasks() {
        return ResponseEntity.ok(taskService.getCompletedTasks());
    }

    @GetMapping("/project/{id}/ongoing")
    public ResponseEntity<?> getProjectOngoingTasks(@PathVariable Long id){
        return ResponseEntity.ok(taskService.getProjectOngoingTasks(id));
    }

    @PostMapping
    public ResponseEntity<?> saveTask(@RequestBody TaskDTO taskDTO) {
        taskService.saveTask(taskDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("{/id}")
    public ResponseEntity<?> updateTask(@RequestBody TaskDTO taskDTO, @PathVariable Long id) {
        taskService.updateTask(taskDTO, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/progress")
    public ResponseEntity<?> getOverallProgress(){
        return ResponseEntity.ok(taskService.getOverallProgress());
    }

    @GetMapping("/progress/{id}")
    public ResponseEntity<?> getProgressForProject(@PathVariable Long id){
        return ResponseEntity.ok(taskService.getProjectProgress(id));
    }

    @GetMapping("/deadline")
    public ResponseEntity<?> getFirstDeadlineOverall(){
        return ResponseEntity.ok(taskService.getFirstDeadlineOverall());
    }

    @GetMapping("/deadline/{id}")
    public ResponseEntity<?> getFirstProjectDeadline(@PathVariable Long id){
        return ResponseEntity.ok(taskService.getProjectFirstDeadline(id));
    }

}
