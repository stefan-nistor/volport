package com.volport.core.service.impl;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.dto.ProjectDTO;
import com.volport.core.dto.VolunteerDTO;
import com.volport.core.exceptions.ProjectAlreadyExistsException;
import com.volport.core.exceptions.ProjectNotFoundException;
import com.volport.core.model.Department;
import com.volport.core.model.Partner;
import com.volport.core.model.Project;
import com.volport.core.model.Volunteer;
import com.volport.core.repository.PartnerRepository;
import com.volport.core.repository.ProjectRepository;
import com.volport.core.repository.VolunteerRepository;
import com.volport.core.service.PartnerService;
import com.volport.core.service.ProjectService;
import com.volport.core.service.VolunteerService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectServiceImpl.class);

    static final String NOT_FOUND_EXCEPTION = "No such project for given id";
    private static final String KEY_VOLUNTEER_IDS = "volunteerIds";
    private static final String KEY_PARTNER_IDS = "partnerIds";

    private final ModelMapper modelMapper;
    private final ProjectRepository projectRepository;
    private final VolunteerRepository volunteerRepository;
    private final PartnerRepository partnerRepository;
    private final VolunteerService volunteerService;
    private final PartnerService partnerService;


    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository,
                              VolunteerRepository volunteerRepository,
                              PartnerRepository partnerRepository,
                              ModelMapper modelMapper,
                              VolunteerService volunteerService,
                              PartnerService partnerService
    ) {
        this.modelMapper = modelMapper;
        this.projectRepository = projectRepository;
        this.volunteerRepository = volunteerRepository;
        this.partnerRepository = partnerRepository;
        this.volunteerService = volunteerService;
        this.partnerService = partnerService;
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
                                .collect(Collectors.toSet()))
                        .partnerIds(project.getPartners().stream()
                                .map(Partner::getId)
                                .collect(Collectors.toSet()))
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
                        .collect(Collectors.toSet()))
                .partnerIds(project.getPartners().stream()
                        .map(Partner::getId)
                        .collect(Collectors.toSet()))
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
        var volunteersIds = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(NOT_FOUND_EXCEPTION))
                .getVolunteers()
                .stream()
                .map(Volunteer::getId)
                .toList();
        return volunteerService.getAllByIds(volunteersIds);
    }

    @Override
    public List<PartnerDTO> getProjectPartners(Long id) {
        var partnersIds = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(NOT_FOUND_EXCEPTION))
                .getPartners()
                .stream()
                .map(Partner::getId)
                .toList();
        return partnerService.getAllByIds(partnersIds);
    }

    @Override
    public Map<String, Integer> getProjectDepartments(Long id) {
        var project = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(NOT_FOUND_EXCEPTION));
        Map<String, Integer> departmentSizes = new HashMap<>();

        for (Volunteer volunteer : project.getVolunteers()) {
            Department department = volunteer.getDepartment();
            if (department != null) {
                String departmentName = department.getAcronym();
                int currentSize = departmentSizes.getOrDefault(departmentName, 0);
                departmentSizes.put(departmentName, currentSize + 1);
            }
        }
        return departmentSizes;
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
