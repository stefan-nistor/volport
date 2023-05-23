package com.volport.core.exceptions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ExceptionHandlerAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler({
            ProjectAlreadyExistsException.class,
            DepartmentAlreadyExistsException.class,
            UserAlreadyExistsException.class,
            PartnerAlreadyExistsException.class
    })
    public ResponseEntity<Object> alreadyExistsException(RuntimeException e){
        Map<String, Object> result = new HashMap<>();
        result.put("Timestamp", LocalDateTime.now());
        result.put("Message", e.getMessage());
        return new ResponseEntity<>(result, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler({VolunteerNotFoundException.class})
    public ResponseEntity<Object> notFoundException(RuntimeException e){
        Map<String, Object> result = new HashMap<>();
        result.put("Timestamp", LocalDateTime.now());
        result.put("Message", e.getMessage());
        return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }
}
