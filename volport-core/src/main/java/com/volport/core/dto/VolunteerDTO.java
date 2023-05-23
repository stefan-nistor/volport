package com.volport.core.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDTO {
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String department;;
    private String password;
    private LocalDate joinDate;
    private boolean canVote;

}
