package com.volport.core.service;

import java.util.List;

import com.volport.core.dto.VolunteerDTO;


public interface VolunteerService {

    /**
     * Get all volunteers from database
     *
     * @return {@link List} of {@link VolunteerDTO}
     */
    List<VolunteerDTO> getAllVolunteers();

    /**
     * Add a new volunteer in database
     *
     * @param volunteerDTO volunteer to be added
     * @return
     */
    VolunteerDTO addVolunteer(VolunteerDTO volunteerDTO);

    void addVolunteerList(List<VolunteerDTO> volunteerDTOS);

    /**
     * Update a volunteer
     *
     * @param id
     * @param volunteerDTO
     * @return {@link VolunteerDTO} the volunteer with updated data
     */
    VolunteerDTO updateVolunteer(Long id, VolunteerDTO volunteerDTO);

    /**
     * Delete a volunteer from database
     *
     * @param id of the volunteer
     * @return True if the volunteer was deleted successfully, False otherwise
     */
    boolean deleteVolunteer(Long id);
}
