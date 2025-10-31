package com.example.courseService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.courseService.controller",
    "com.example.courseService.service",
	"com.example.courseService.config",
	"com.example.courseService.DTOs",
	"com.example.courseService.entity",
	"com.example.courseService.ExceptionHandling",
	"com.example.courseService.repo",
	"com.example.courseService.utility"
})
@EnableJdbcHttpSession(
	tableName = "SPRING_SESSION",
	maxInactiveIntervalInSeconds = 86400) // for 24 hrs
public class CourseServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CourseServiceApplication.class, args);
	}

}
