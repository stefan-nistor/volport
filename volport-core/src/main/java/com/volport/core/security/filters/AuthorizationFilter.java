package com.volport.core.security.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;

@Service
public class AuthorizationFilter extends BasicAuthenticationFilter {

    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String AUTHORIZATION_KEY = "Authorization";

    @Value("${jwt.secret}")
    private String secret;

    public AuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION_KEY);
        if (authorizationHeader == null || !authorizationHeader.startsWith(TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
        } else {
            UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(authorizationHeader);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            response.addHeader("Access-Control-Allow-Origin", "*");
            filterChain.doFilter(request, response);
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String authorizationHeader) {
        String user = JWT.require(Algorithm.HMAC512(secret.getBytes()))
                .build()
                .verify(authorizationHeader.replace(TOKEN_PREFIX, ""))
                .getSubject();
        return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
    }

}
