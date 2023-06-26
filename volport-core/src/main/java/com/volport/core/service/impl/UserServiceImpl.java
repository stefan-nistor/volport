package com.volport.core.service.impl;

import com.volport.core.model.User;
import com.volport.core.repository.UserRepository;
import com.volport.core.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public User get() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        var uid = auth.getName();

        try{
            return userRepository.get(uid);
        } catch (ExecutionException | InterruptedException e) {
            LOGGER.error(e.getMessage());
        }
        return null;
    }

    @Override
    public User save(String bio) {
        return null;
    }
}
