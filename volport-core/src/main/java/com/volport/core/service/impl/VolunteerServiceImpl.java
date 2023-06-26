package com.volport.core.service.impl;

import com.volport.core.dto.VolunteerDTO;
import com.volport.core.exceptions.UserAlreadyExistsException;
import com.volport.core.exceptions.VolunteerNotFoundException;
import com.volport.core.model.Project;
import com.volport.core.model.Task;
import com.volport.core.model.Volunteer;
import com.volport.core.repository.VolunteerRepository;
import com.volport.core.service.VolunteerService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class VolunteerServiceImpl implements VolunteerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VolunteerServiceImpl.class);

    private final VolunteerRepository volunteerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    VolunteerServiceImpl(VolunteerRepository volunteerRepository, ModelMapper modelMapper) {
        this.volunteerRepository = volunteerRepository;
        this.modelMapper = modelMapper;
    }

    /**
     * Get all volunteers from database.
     *
     * @return {@link List} of {@link VolunteerDTO}
     */
    @Override
    public List<VolunteerDTO> getAllVolunteers() {
        return volunteerRepository.findAll().stream()
                .map(volunteer -> VolunteerDTO.builder()
                        .id(volunteer.getId())
                        .firstname(volunteer.getFirstname())
                        .lastname(volunteer.getLastname())
                        .email(volunteer.getEmail())
                        .canVote(volunteer.isCanVote())
                        .departmentId(volunteer.getDepartment().getId())
                        .joinDate(volunteer.getJoinDate())
                        .projectIds(volunteer.getProjects().stream().map(Project::getId).toList())
                        .taskIds(volunteer.getTasks().stream().map(Task::getId).toList())
                        .build()
                )
                .toList();
    }

    /**
     * Add a new volunteer in database.
     *
     * @param volunteerDTO volunteer to be added
     * @return
     */
    @Override
    public VolunteerDTO addVolunteer(@NotNull VolunteerDTO volunteerDTO) {
        var volunteer = volunteerRepository.findByEmail(volunteerDTO.getEmail());
        if (volunteer.isPresent()) {
            throw new UserAlreadyExistsException(String.format("Volunteer with email %s already exists",
                    volunteerDTO.getEmail()));
        }
        // maybe let user pick joinDate
        return modelMapper.map(volunteerRepository.save(modelMapper.map(volunteerDTO, Volunteer.class)), VolunteerDTO.class);
    }

    @Override
    public void addVolunteerList(@NotNull List<VolunteerDTO> volunteerDTOS) {
        volunteerDTOS.forEach(this::addVolunteer);
    }

    /**
     * Update a volunteer.
     *
     * @param id           id of the volunteer
     * @param volunteerDTO modified fields
     * @return {@link VolunteerDTO} the volunteer with updated data
     */
    @Override
    @Transactional
    public VolunteerDTO updateVolunteer(Long id, VolunteerDTO volunteerDTO) {
//        var volunteer = volunteerRepository.findById(id).orElseThrow(() -> new VolunteerNotFoundException("No such volunteer for given id"));
//        volunteer.setCanVote(volunteerDTO.isCanVote());
//        volunteer.setEmail(volunteerDTO.getEmail());
//        volunteer.setJoinDate(volunteerDTO.getJoinDate());
//        volunteer.setFirstname(volunteerDTO.getFirstname());
//        volunteer.setLastname(volunteerDTO.getLastname());
//        volunteer.setDepartment(volunteerDTO.getDepartment());
//
//        return mapper.map(volunteerRepository.save(volunteer), VolunteerDTO.class);
        return volunteerDTO;
    }

    /**
     * Delete a volunteer from database.
     *
     * @param id of the volunteer
     * @return True if the volunteer was deleted successfully, False otherwise
     */
    @Override
    public boolean deleteVolunteer(Long id) {
        volunteerRepository.findById(id).orElseThrow(() -> new VolunteerNotFoundException("No such volunteer for given id"));
        volunteerRepository.deleteById(id);
        return true;
    }

    @Override
    public Integer getDepartmentSize(Long departmentId) {
        return volunteerRepository.findAllByDepartment_Id(departmentId).size();
    }

    @Override
    public List<VolunteerDTO> getAllByIds(List<Long> ids) {
        return volunteerRepository.findAllById(ids).stream()
                .map(volunteer -> VolunteerDTO.builder()
                .id(volunteer.getId())
                .firstname(volunteer.getFirstname())
                .lastname(volunteer.getLastname())
                .email(volunteer.getEmail())
                .canVote(volunteer.isCanVote())
                .departmentId(volunteer.getDepartment().getId())
                .joinDate(volunteer.getJoinDate())
                .projectIds(volunteer.getProjects().stream().map(Project::getId).toList())
                .taskIds(volunteer.getTasks().stream().map(Task::getId).toList())
                .build()
        )
                .toList();
    }
}
