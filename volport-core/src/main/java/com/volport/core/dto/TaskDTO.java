package com.volport.core.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Task}
 */
@Value
@Data
@Builder
public class TaskDTO implements Serializable {
    Long id;
    String name;
    String description;
    LocalDate deadline;
    String status;
    Integer effort;
    ProjectDTO project;
    List<VolunteerDTO> volunteers;
}