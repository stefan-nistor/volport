package com.volport.core.service;

import com.volport.core.dto.ProjectDTO;
import com.volport.core.exceptions.ProjectAlreadyExistsException;
import com.volport.core.exceptions.ProjectNotFoundException;
import com.volport.core.model.Partner;
import com.volport.core.model.Project;
import com.volport.core.model.Volunteer;
import com.volport.core.repository.ProjectRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectServiceImpl.class);

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    private ModelMapper modelMapper;

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
        var project = projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException("No such project for given id"));
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

}
