package com.volport.core.service;

import com.volport.core.repository.VolunteerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    private final VolunteerRepository volunteerRepository;

    @Autowired
    public UserDetailsServiceImpl(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var volunteerEntity = volunteerRepository.findByEmail(email);
        if (volunteerEntity.isEmpty()){
            LOGGER.error("User with email {} not found in database", email);
            throw new UsernameNotFoundException("Email not found");
        }

        var volunteer = volunteerEntity.get();
        return new User(volunteer.getEmail(), volunteer.getPassword(), Collections.emptyList());
    }
}
