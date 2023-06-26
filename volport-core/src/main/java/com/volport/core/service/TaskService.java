package com.volport.core.service;

import com.volport.core.dto.TaskDTO;

import java.util.List;

public interface TaskService {

    List<TaskDTO> getAll();

    TaskDTO getById(Long id);

    void saveTask(TaskDTO taskDTO);

    void updateTask(TaskDTO updates, Long id);

    List<TaskDTO> getByProjectId(Long id);


}
