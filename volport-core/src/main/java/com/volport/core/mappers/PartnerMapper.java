package com.volport.core.mappers;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.model.Partner;
import com.volport.core.repository.ProjectRepository;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface PartnerMapper {

    Partner toEntity(PartnerDTO partner);

    PartnerDTO toDto(Partner partner);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Partner partialUpdate(PartnerDTO partnerDTO, @MappingTarget Partner partner);
}