package com.volport.core.service;

import com.volport.core.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {

    List<ProjectDTO> getAll();

    ProjectDTO saveProject(ProjectDTO projectDTO);

}
