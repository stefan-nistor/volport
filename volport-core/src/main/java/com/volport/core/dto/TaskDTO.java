package com.volport.core.dto;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Task}
 */
@Value
@Data
@Getter
@Setter
@Builder
public class TaskDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -21697835225554779L;
    Long id;
    String name;
    String description;
    LocalDate deadline;
    String status;
    Integer effort;
    Long projectId;
    List<Long> volunteersIds;
}