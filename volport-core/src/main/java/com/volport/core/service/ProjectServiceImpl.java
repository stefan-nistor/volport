package com.volport.core.service;

import com.volport.core.dto.ProjectDTO;
import com.volport.core.exceptions.ProjectAlreadyExistsException;
import com.volport.core.model.Project;
import com.volport.core.repository.ProjectRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {


    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectServiceImpl.class);

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProjectDTO> getAll() {
        return projectRepository.findAll().stream()
                .map(element -> modelMapper.map(element, ProjectDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProjectDTO saveProject(ProjectDTO projectDTO) {
        if (projectRepository.findByName(projectDTO.getName()).isPresent()) {
            LOGGER.error("Project name already exists - {}", projectDTO.getName());
            throw new ProjectAlreadyExistsException("Project name already exists");
        }
        return modelMapper.map(projectRepository.save(modelMapper.map(projectDTO, Project.class)), ProjectDTO.class);
    }
}
