package com.volport.core.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Project}
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO implements Serializable {
    Long id;
    String name;
    String description;
    private List<VolunteerDTO> volunteers;
    private List<TaskDTO> tasks;
}