package com.volport.core.controller;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partner")
public class PartnerController {

    @Autowired
    PartnerService partnerService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok().body(partnerService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> addPartner(@RequestBody PartnerDTO partnerDTO) {
        var result = partnerService.savePartner(partnerDTO);
        if(result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
