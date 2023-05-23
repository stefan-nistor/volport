package com.volport.core.service;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.exceptions.PartnerAlreadyExistsException;
import com.volport.core.model.Partner;
import com.volport.core.repository.PartnerRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartnerServiceImpl implements PartnerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PartnerServiceImpl.class);

    @Autowired
    PartnerRepository partnerRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PartnerDTO> getAll() {
        return partnerRepository.findAll().stream()
                .map(element -> modelMapper.map(element, PartnerDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PartnerDTO savePartner(PartnerDTO partnerDTO) {
        if(partnerRepository.findByName(partnerDTO.getName()).isPresent()){
            LOGGER.error("Partner already exists - {}", partnerDTO.getName());
            throw new PartnerAlreadyExistsException("Partner already exists");
        }
        return modelMapper.map(partnerRepository.save(modelMapper.map(partnerDTO, Partner.class)), PartnerDTO.class);
    }
}
