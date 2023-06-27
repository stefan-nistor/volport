package com.volport.core.service;

import com.volport.core.dto.PartnerDTO;
import com.volport.core.dto.ProjectDTO;
import com.volport.core.dto.VolunteerDTO;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    List<ProjectDTO> getAll();

    ProjectDTO getById(Long id);

    ProjectDTO saveProject(ProjectDTO projectDTO);

    void saveProjectList(List<ProjectDTO> projectDTOList);

    List<VolunteerDTO> getProjectVolunteers(Long id);
    List<PartnerDTO> getProjectPartners(Long id);

    Map<String, Integer> getProjectDepartments(Long id);

    void updateProject(Map<String, List<Long>> updates, Long id);
}
