package com.volport.core.service.impl;

import com.volport.core.dto.TaskDTO;
import com.volport.core.exceptions.ProjectNotFoundException;
import com.volport.core.exceptions.TaskNotFoundException;
import com.volport.core.model.Task;
import com.volport.core.model.Volunteer;
import com.volport.core.repository.ProjectRepository;
import com.volport.core.repository.TaskRepository;
import com.volport.core.repository.VolunteerRepository;
import com.volport.core.service.TaskService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class TaskServiceImpl implements TaskService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TaskServiceImpl.class);
    private static final String NOT_FOUND_EXCEPTION = "No task for given id";
    private static final String UNASSIGNED = "unassigned";
    private static final String IN_PROGRESS = "inprogress";
    private static final String COMPLETED = "completed";
    private final TaskRepository taskRepository;
    private final VolunteerRepository volunteerRepository;
    private final ProjectRepository projectRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, VolunteerRepository volunteerRepository, ProjectRepository projectRepository, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.volunteerRepository = volunteerRepository;
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<TaskDTO> getAll() {
        return taskRepository.findAll().stream()
                .map(task -> TaskDTO.builder()
                        .id(task.getId())
                        .deadline(task.getDeadline())
                        .startDate(task.getStartDate())
                        .status(task.getStatus())
                        .description(task.getDescription())
                        .effort(task.getEffort())
                        .name(task.getName())
                        .projectId(task.getProject().getId())
                        .volunteerIds(task.getVolunteers().stream()
                                .map(Volunteer::getId).toList())
                        .build()
                )
                .toList();
    }

    @Override
    public TaskDTO getById(Long id) {
        var task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(NOT_FOUND_EXCEPTION));
        return TaskDTO.builder()
                .id(task.getId())
                .deadline(task.getDeadline())
                .startDate(task.getStartDate())
                .status(task.getStatus())
                .description(task.getDescription())
                .effort(task.getEffort())
                .name(task.getName())
                .projectId(task.getProject().getId())
                .volunteerIds(task.getVolunteers().stream()
                        .map(Volunteer::getId).toList())
                .build();
    }

    @Override
    public void saveTask(TaskDTO taskDTO) {
        var task = modelMapper.map(taskDTO, Task.class);
        var volunteers = volunteerRepository.findAllById(taskDTO.getVolunteerIds());
        var project = projectRepository.findById(taskDTO.getProjectId()).orElseThrow(() -> new ProjectNotFoundException(ProjectServiceImpl.NOT_FOUND_EXCEPTION));
        task.setVolunteers(volunteers);
        task.setProject(project);

        if(!task.getStatus().isEmpty()) {
            taskRepository.save(task);
            return;
        }

        if(task.getVolunteers().isEmpty()){
            task.setStatus(UNASSIGNED);
        } else {
            task.setStatus(IN_PROGRESS);
        }

        if(task.getEffort() > 0){
            task.setStatus(COMPLETED);
        }

        taskRepository.save(task);
    }

    @Override
    public void updateTask(TaskDTO taskDTO, Long id) {
        var task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(NOT_FOUND_EXCEPTION));
        var volunteers = volunteerRepository.findAllById(taskDTO.getVolunteerIds());
        var project = projectRepository.findById(taskDTO.getProjectId()).orElseThrow(() -> new ProjectNotFoundException(ProjectServiceImpl.NOT_FOUND_EXCEPTION));

        task.setEffort(taskDTO.getEffort());
        task.setDeadline(taskDTO.getDeadline());
        task.setProject(project);
        task.setVolunteers(volunteers);
        task.setDescription(taskDTO.getDescription());

        taskRepository.save(task);
    }

    @Override
    public List<TaskDTO> getByProjectId(Long id) {
        return taskRepository.findByProject_Id(id).stream()
                .map(task -> TaskDTO.builder()
                        .id(task.getId())
                        .deadline(task.getDeadline())
                        .startDate(task.getStartDate())
                        .status(task.getStatus())
                        .description(task.getDescription())
                        .effort(task.getEffort())
                        .name(task.getName())
                        .projectId(task.getProject().getId())
                        .volunteerIds(task.getVolunteers().stream()
                                .map(Volunteer::getId).toList())
                        .build()
                )
                .toList();
    }

    @Override
    public List<TaskDTO> getOngoingTasks() {
        return taskRepository.findByStatus(IN_PROGRESS).stream()
                .map(task -> TaskDTO.builder()
                        .id(task.getId())
                        .deadline(task.getDeadline())
                        .startDate(task.getStartDate())
                        .status(task.getStatus())
                        .description(task.getDescription())
                        .effort(task.getEffort())
                        .name(task.getName())
                        .projectId(task.getProject().getId())
                        .volunteerIds(task.getVolunteers().stream()
                                .map(Volunteer::getId).toList())
                        .build()
                )
                .toList();
    }

    @Override
    public Double getOverallProgress() {
        var completedSize = taskRepository.findByStatus(COMPLETED).size();
        var totalSize = taskRepository.findAll().size();
        if(totalSize == 0){
            return 0.0;
        }
        return (double) completedSize / totalSize * 100;
    }

    @Override
    public Double getProjectProgress(Long id) {
        var totalSize = taskRepository.findByProject_Id(id).size();
        var completedSize = taskRepository.findByProject_IdAndStatus(id, COMPLETED).size();
        if(totalSize == 0){
            return 0.0;
        }
        return (double) completedSize / totalSize * 100;
    }

    @Override
    public Map<String, LocalDate> getProjectFirstDeadline(Long id) {
        var task = taskRepository.findByProject_IdOrderByDeadlineAsc(id).stream().findFirst().orElseThrow();
        Map<String, LocalDate> result = new HashMap<>();
        result.put(task.getName(), task.getDeadline());
        return result;
    }

    @Override
    public Map<String, LocalDate> getFirstDeadlineOverall() {
        var task = taskRepository.findAllByOrderByDeadlineAsc().stream().findFirst().orElseThrow();
        Map<String, LocalDate> result = new HashMap<>();
        result.put(task.getName(), task.getDeadline());
        return  result;
    }
}
