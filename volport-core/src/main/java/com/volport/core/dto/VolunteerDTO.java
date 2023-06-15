package com.volport.core.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Volunteer}
 */
@Value
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class VolunteerDTO implements Serializable {
    Long id;
    String firstname;
    String lastname;
    String email;
    LocalDate joinDate;
    boolean canVote;
    DepartmentDTO department;

}