package com.volport.core.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Partner}
 */
@Value
@Data
@Builder
public class PartnerDTO implements Serializable {
    Long id;
    String name;
    List<ProjectDTO> projects;
}