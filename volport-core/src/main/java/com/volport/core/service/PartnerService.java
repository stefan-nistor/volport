package com.volport.core.service;

import com.volport.core.dto.PartnerDTO;

import java.util.List;

public interface PartnerService {

    List<PartnerDTO> getAll();

    PartnerDTO savePartner(PartnerDTO partnerDTO);

}
