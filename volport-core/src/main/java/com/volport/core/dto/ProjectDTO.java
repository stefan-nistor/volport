package com.volport.core.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Project}
 */
@Value
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class ProjectDTO implements Serializable {
    Long id;
    String name;
    String description;
    List<Long> volunteerIds;
    List<Long> partnerIds;
}