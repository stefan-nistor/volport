package com.volport.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDTO {
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private Date joinDate;
    private boolean canVote;

}
