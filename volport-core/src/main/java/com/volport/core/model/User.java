package com.volport.core.model;

import lombok.Data;

@Data
public class User {
    private String uid;
    private String name;
    private String email;
    private long lastLogin;
    private String bio;
}
