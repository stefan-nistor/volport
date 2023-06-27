package com.volport.core.repository;

import com.volport.core.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject_IdAndStatus(Long id, String status);
    List<Task> findByStatus(String status);
    List<Task> findByProject_Id(Long id);

    List<Task> findByProject_IdOrderByDeadlineAsc(Long id);

    List<Task> findAllByOrderByDeadlineAsc();


}
