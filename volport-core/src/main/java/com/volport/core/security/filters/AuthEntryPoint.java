package com.volport.core.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.volport.core.util.JsonUtil;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class AuthEntryPoint implements AuthenticationEntryPoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthEntryPoint.class);

    /**
     * Commences an authentication and returns an error message if the exception is invoked
     *
     * @param request       - the input {@link HttpServletRequest}
     * @param response      - the input {@link HttpServletResponse}
     * @param authException - the input {@link AuthenticationException}
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        LOGGER.error("Unauthorized error: {}", authException.getMessage());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), JsonUtil.objectToJsonString("Unauthorized error: Bad credentials"));
    }

}