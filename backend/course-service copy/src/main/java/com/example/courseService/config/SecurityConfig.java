package com.example.courseService.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET,"api/students/debug-auth").permitAll()
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/courses/**").permitAll()
                .requestMatchers(HttpMethod.POST, "api/students").permitAll()
                .requestMatchers(
                    HttpMethod.POST, "/api/auth/send-otp").permitAll()
                .requestMatchers(
                    HttpMethod.POST, "/api/auth/verify-otp").permitAll()
                .requestMatchers(
                    HttpMethod.POST, "/api/auth/resend-otp").permitAll()
        
                // Public or Authenticated status check
                .requestMatchers(
                    HttpMethod.GET, "/api/auth/status").permitAll()
        
                // Authenticated session endpoints
                .requestMatchers(
                    HttpMethod.POST, "/api/auth/logout").authenticated()
                .requestMatchers(
                    HttpMethod.GET, "/api/auth/session").authenticated()
                .requestMatchers(
                    HttpMethod.GET, "/api/auth/validate").authenticated()
                
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            );
        
        
        
        return http.build();
    }
}