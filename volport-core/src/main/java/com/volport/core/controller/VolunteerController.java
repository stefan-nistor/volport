package com.volport.core.controller;

import com.volport.core.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/volunteer")
@RequiredArgsConstructor
public class VolunteerController {

    @Autowired
    VolunteerService volunteerService;

    @GetMapping
    public ResponseEntity<?> getAllVolunteers(){
        return  ResponseEntity.ok(volunteerService.getAllVolunteers());
    }



}
