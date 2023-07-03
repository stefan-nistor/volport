package com.volport.core.repository;

import java.util.List;
import java.util.Optional;

import com.volport.core.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
    List<Volunteer> findByTasksNotEmpty();
    Optional<Volunteer> findByEmail(String email);

    List<Volunteer> findAllByDepartment_Id(Long id);

}
