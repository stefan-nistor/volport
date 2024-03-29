package com.volport.core.service;

import com.volport.core.dto.PartnerDTO;

import java.util.List;

public interface PartnerService {

    List<PartnerDTO> getAll();
    List<PartnerDTO> getAllByIds(List<Long> ids);

    PartnerDTO savePartner(PartnerDTO partnerDTO);

    void addPartnerList(List<PartnerDTO> partnerDTOList);

}
