package com.volport.core.service.impl;

import com.volport.core.dto.DepartmentDTO;
import com.volport.core.exceptions.DepartmentAlreadyExistsException;
import com.volport.core.model.Department;
import com.volport.core.repository.DepartmentRepository;
import com.volport.core.service.DepartmentService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<DepartmentDTO> getAll() {
        return departmentRepository.findAll().stream()
                .map(element -> modelMapper.map(element, DepartmentDTO.class))
                .toList();
    }

    @Override
    public DepartmentDTO createDepartment(DepartmentDTO departmentDTO) {
        if(departmentRepository.findByName(departmentDTO.getName()).isPresent()){
            LOGGER.error("Department already exists - {}", departmentDTO.getName());
            throw new DepartmentAlreadyExistsException("Department Already Exists");
        }
        return modelMapper.map(departmentRepository.save(modelMapper.map(departmentDTO, Department.class)), DepartmentDTO.class);
    }
}
