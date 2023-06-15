package com.volport.core.dto;

import lombok.*;

import javax.validation.constraints.Email;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link com.volport.core.model.Volunteer}
 */
@Value
@Data
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class VolunteerDTO implements Serializable {
    Long id;
    String firstname;
    String lastname;
    @Email
    String email;
    LocalDate joinDate;
    boolean canVote;
    Long departmentId;
    List<Long> projectIds;
    List<Long> taskIds;
}