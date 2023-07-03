package com.volport.core.service;

import com.volport.core.model.User;

public interface UserService {

    User get();
    User save(String bio);

}
