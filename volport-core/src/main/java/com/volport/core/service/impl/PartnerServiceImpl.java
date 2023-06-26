package com.volport.core.service.impl;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.exceptions.PartnerAlreadyExistsException;
import com.volport.core.mappers.PartnerMapper;
import com.volport.core.repository.PartnerRepository;
import com.volport.core.service.PartnerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartnerServiceImpl implements PartnerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PartnerServiceImpl.class);

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private PartnerMapper partnerMapper;

    @Override
    public List<PartnerDTO> getAll() {
        return partnerRepository.findAll().stream().map(partnerMapper::toDto).toList();

    }

    @Override
    public PartnerDTO savePartner(PartnerDTO partnerDTO) {
        if (partnerRepository.findByName(partnerDTO.getName()).isPresent()) {
            LOGGER.error("Partner already exists - {}", partnerDTO.getName());
            throw new PartnerAlreadyExistsException("Partner already exists");
        }
        return partnerMapper.toDto(partnerRepository.save(partnerMapper.toEntity(partnerDTO)));
    }

    @Override
    public void addPartnerList(List<PartnerDTO> partnerDTOList) {
        partnerDTOList.forEach(partnerDTO -> partnerRepository.save(partnerMapper.toEntity(partnerDTO)));
    }
}
