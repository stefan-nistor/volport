package com.volport.core.mappers;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.model.Partner;
import com.volport.core.model.Project;
import org.springframework.stereotype.Component;

@Component
public class PartnerMapperImpl implements PartnerMapper{
    @Override
    public Partner toEntity(PartnerDTO partner) {
        return Partner.builder()
                .id(partner.getId())
                .name(partner.getName())
                .bank(partner.getBank())
                .bankAccount(partner.getBankAccount())
                .contact(partner.getContact())
                .fiscalID(partner.getFiscalID())
                .observations(partner.getObservations())
                .build();
    }

    // TODO add projects - check for null
    @Override
    public PartnerDTO toDto(Partner partner) {
        return PartnerDTO.builder()
                .id(partner.getId())
                .name(partner.getName())
                .bank(partner.getBank())
                .bankAccount(partner.getBankAccount())
                .contact(partner.getContact())
                .fiscalID(partner.getFiscalID())
                .observations(partner.getObservations())
                .build();
    }

    @Override
    public Partner partialUpdate(PartnerDTO partnerDTO, Partner partner) {
        return null;
    }
}
