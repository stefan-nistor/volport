package com.volport.core.exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String notFoundException) {
        super(notFoundException);
    }
}
