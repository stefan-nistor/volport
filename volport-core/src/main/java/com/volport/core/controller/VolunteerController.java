package com.volport.core.controller;

import com.volport.core.dto.VolunteerDTO;
import com.volport.core.service.VolunteerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/volunteer")
public class VolunteerController {

    private static final Logger LOGGER = LoggerFactory.getLogger(VolunteerController.class);

    @Autowired
    private VolunteerService volunteerService;

    @GetMapping
    public ResponseEntity<?> getAllVolunteers(){
        return  ResponseEntity.ok(volunteerService.getAllVolunteers());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addVolunteer(@RequestBody VolunteerDTO volunteerDTO) {
        LOGGER.info("Requested POST on /api/volunteer with body {}", volunteerDTO);
        var result = volunteerService.addVolunteer(volunteerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/volunteers")
    public ResponseEntity<?> addVolunteerList(@RequestBody List<VolunteerDTO> volunteerDTOS){
        volunteerService.addVolunteerList(volunteerDTOS);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVolunteer(@PathVariable Long id, @RequestBody VolunteerDTO volunteerDTO) {
        var updated = volunteerService.updateVolunteer(id, volunteerDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVolunteer(@PathVariable Long id) {
        if(!volunteerService.deleteVolunteer(id)){
            LOGGER.error("Error at delete volunteer with id {}", id);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
