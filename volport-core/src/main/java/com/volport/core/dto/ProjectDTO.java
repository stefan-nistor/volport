package com.volport.core.dto;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Project}
 */

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class ProjectDTO  {
//    @Serial
//    private static final long serialVersionUID = -764398136558888666L;
    Long id;
    String name;
    String description;
    String logo;
    List<Long> volunteerIds;
    List<Long> partnerIds;
}