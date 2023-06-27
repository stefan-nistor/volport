package com.volport.core.service;

import com.volport.core.dto.TaskDTO;
import com.volport.core.model.Task;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface TaskService {

    List<TaskDTO> getAll();

    TaskDTO getById(Long id);

    void saveTask(TaskDTO taskDTO);

    void updateTask(TaskDTO updates, Long id);

    List<TaskDTO> getByProjectId(Long id);

    List<TaskDTO> getOngoingTasks();


    Double getOverallProgress();

    Double getProjectProgress(Long id);

    Map<String, LocalDate> getProjectFirstDeadline(Long id);

    Map<String, LocalDate> getFirstDeadlineOverall();

    List<TaskDTO> getProjectOngoingTasks(Long id);

    List<TaskDTO> getCompletedTasks();

    void assign(Long id, Map<String, Long> volunteerId);

}
