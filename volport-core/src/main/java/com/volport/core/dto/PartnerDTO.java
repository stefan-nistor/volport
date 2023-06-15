package com.volport.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Partner}
 */
@Value
@Data
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class PartnerDTO implements Serializable {
    Long id;
    String name;
    String contact;
    String fiscalID;
    String bank;
    String bankAccount;
    String observations;
    List<Long> projectIds;
}