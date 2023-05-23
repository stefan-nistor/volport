package com.volport.core.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;


@RestController
@RequestMapping("/health")
public class HealthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(HealthController.class);

    @GetMapping
    public ResponseEntity<?> healthCheck(){
        return ResponseEntity.ok().body("RUNNING");
    }

    @PostMapping
    public ResponseEntity<?> postCheck(@RequestBody String foo){
        LOGGER.info("Received message {}", foo);
        return ResponseEntity.ok().body(foo);
    }

}

