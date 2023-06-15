package com.volport.core.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.volport.core.model.Partner}
 */
@Value
@Data
@Builder
public class PartnerDTO implements Serializable {
    Long id;
    String name;
}