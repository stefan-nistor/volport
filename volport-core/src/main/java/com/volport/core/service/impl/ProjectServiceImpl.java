package com.volport.core.service.impl;

import com.volport.core.dto.ProjectDTO;
import com.volport.core.dto.VolunteerDTO;
import com.volport.core.exceptions.ProjectAlreadyExistsException;
import com.volport.core.exceptions.ProjectNotFoundException;
import com.volport.core.model.Partner;
import com.volport.core.model.Project;
import com.volport.core.model.Volunteer;
import com.volport.core.repository.PartnerRepository;
import com.volport.core.repository.ProjectRepository;
import com.volport.core.repository.VolunteerRepository;
import com.volport.core.service.ProjectService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectServiceImpl.class);

    static final String NOT_FOUND_EXCEPTION = "No such project for given id";
    private static final String KEY_VOLUNTEER_IDS = "volunteerIds";
    private static final String KEY_PARTNER_IDS = "partnerIds";

    private final ProjectRepository projectRepository;
    private final VolunteerRepository volunteerRepository;
    private final PartnerRepository partnerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, VolunteerRepository volunteerRepository, PartnerRepository partnerRepository, ModelMapper modelMapper) {
        this.projectRepository = projectRepository;
        this.volunteerRepository = volunteerRepository;
        this.partnerRepository = partnerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ProjectDTO> getAll() {
        return projectRepository
                .findAll()
                .stream()
                .map(project -> ProjectDTO.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .description(project.getDescription())
                        .logo(project.getLogo())
                        .volunteerIds(project.getVolunteers().stream()
                                .map(Volunteer::getId)
                                .toList())
                        .partnerIds(project.getPartners().stream()
                                .map(Partner::getId)
                                .toList())
                        .build())
                .toList();
    }

    @Override
    public ProjectDTO getById(Long id) {
        var project = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(NOT_FOUND_EXCEPTION));
        return ProjectDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .logo(project.getLogo())
                .volunteerIds(project.getVolunteers().stream()
                        .map(Volunteer::getId)
                        .toList())
                .partnerIds(project.getPartners().stream()
                        .map(Partner::getId)
                        .toList())
                .build();
    }

    @Override
    public ProjectDTO saveProject(ProjectDTO projectDTO) {
        if (projectRepository.findByName(projectDTO.getName()).isPresent()) {
            LOGGER.error("Project name already exists - {}", projectDTO.getName());
            throw new ProjectAlreadyExistsException("Project name already exists");
        }
        return modelMapper.map(projectRepository.save(modelMapper.map(projectDTO, Project.class)), ProjectDTO.class);
    }

    @Override
    public void saveProjectList(List<ProjectDTO> projectDTOList) {
        projectDTOList.forEach(this::saveProject);
    }

    @Override
    public List<VolunteerDTO> getProjectVolunteers(Long id) {
        var volunteers = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(NOT_FOUND_EXCEPTION)).getVolunteers();
        return volunteers.stream()
                .map(volunteer -> modelMapper.map(volunteer, VolunteerDTO.class))
                .toList();
    }

    @Override
    public void updateProject(Map<String, List<Long>> updates, Long id) {
        var project = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(NOT_FOUND_EXCEPTION));

        if (updates.containsKey(KEY_VOLUNTEER_IDS)) {
            var volunteers = project.getVolunteers();
            var newVolunteers = volunteerRepository.findAllById(updates.get(KEY_VOLUNTEER_IDS));
            volunteers.addAll(newVolunteers);
            project.setVolunteers(volunteers);
        }

        if (updates.containsKey(KEY_PARTNER_IDS)) {
            var partners = project.getPartners();
            var newPartners = partnerRepository.findAllById(updates.get(KEY_PARTNER_IDS));
            partners.addAll(newPartners);
            project.setPartners(partners);
        }

        projectRepository.save(project);
    }

}
