package com.volport.core.service;

import com.volport.core.dto.DepartmentDTO;

import java.util.List;

public interface DepartmentService {

    List<DepartmentDTO> getAll();

    DepartmentDTO createDepartment(DepartmentDTO departmentDTO);

}
