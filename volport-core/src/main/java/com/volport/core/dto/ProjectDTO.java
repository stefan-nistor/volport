package com.volport.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.volport.core.model.Project}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO implements Serializable {
    Long id;
    String name;
    String description;
}