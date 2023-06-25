package com.volport.core.controller;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @PostMapping("/partners")
    public ResponseEntity<?> addPartnerList(@RequestBody List<PartnerDTO> partnerDTOList){
        partnerService.addPartnerList(partnerDTOList);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
