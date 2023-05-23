package com.volport.core.controller;

import com.volport.core.dto.VolunteerDTO;
import com.volport.core.service.VolunteerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/volunteer")
public class VolunteerController {

    private static final Logger LOGGER = LoggerFactory.getLogger(VolunteerController.class);

    @Autowired
    private VolunteerService volunteerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getAllVolunteers(){
        LOGGER.info("GET /api/volunteers");
        return  ResponseEntity.ok(volunteerService.getAllVolunteers());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addVolunteer(@RequestBody VolunteerDTO volunteerDTO) {
        LOGGER.info("Requested POST on /api/volunteers with body {}", volunteerDTO);
        volunteerDTO.setPassword(passwordEncoder.encode(volunteerDTO.getPassword()));
        volunteerService.addVolunteer(volunteerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }



}
