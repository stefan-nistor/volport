package com.volport.core.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.volport.core.dto.VolunteerDTO;
import com.volport.core.exceptions.UserAlreadyExistsException;
import com.volport.core.model.Volunteer;
import com.volport.core.repository.VolunteerRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@Service
public class VolunteerServiceImpl implements VolunteerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VolunteerServiceImpl.class);
    @Autowired
    private VolunteerRepository volunteerRepository;
    @Autowired
    private ModelMapper mapper;

    /**
     * Get all volunteers from database.
     *
     * @return {@link List} of {@link VolunteerDTO}
     */
    @Override
    public List<VolunteerDTO> getAllVolunteers() {
        return volunteerRepository.findAll().stream()
                .map(entity -> mapper.map(entity, VolunteerDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * Add a new volunteer in database.
     *
     * @param volunteerDTO volunteer to be added
     */
    @Override
    public void addVolunteer(@NotNull VolunteerDTO volunteerDTO) {
        var volunteer = volunteerRepository.findByEmail(volunteerDTO.getEmail());
        if (volunteer.isPresent()){
            throw new UserAlreadyExistsException(String.format("Volunteer with email %s already exists",
                    volunteerDTO.getEmail()));
        }
        volunteerDTO.setJoinDate(LocalDate.now());
        volunteerRepository.save(mapper.map(volunteerDTO, Volunteer.class));
    }

    /**
     * Update a volunteer.
     *
     * @param id id of the volunteer
     * @param volunteerDTO modified fields
     * @return {@link VolunteerDTO} the volunteer with updated data
     */
    @Override
    public VolunteerDTO updateVolunteer(Long id, VolunteerDTO volunteerDTO) {
        return null;
    }

    /**
     * Delete a volunteer from database.
     *
     * @param id of the volunteer
     * @return True if the volunteer was deleted successfully, False otherwise
     */
    @Override
    public boolean deleteVolunteer(Long id) {
        return false;
    }
}
