package com.volport.core.controller;

import com.volport.core.dto.VolunteerDTO;
import com.volport.core.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/volunteer")
@RequiredArgsConstructor
public class VolunteerController {

    @Autowired
    private final VolunteerService volunteerService;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getAllVolunteers(){
        return  ResponseEntity.ok(volunteerService.getAllVolunteers());
    }

    @PostMapping
    public ResponseEntity<?> addVolunteer(@RequestBody VolunteerDTO volunteerDTO) {
        volunteerDTO.setPassword(passwordEncoder.encode(volunteerDTO.getPassword()));
        volunteerService.addVolunteer(volunteerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }



}
