package com.example.courseService.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI courseServiceAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8081");
        devServer.setDescription("Development server");
        
        Server prodServer = new Server();
        prodServer.setUrl("https://api.courseplatform.com");
        prodServer.setDescription("Production server");
        
        Contact contact = new Contact();
        contact.setEmail("support@courseplatform.com");
        contact.setName("Course Platform Team");
        
        License license = new License()
                .name("MIT License")
                .url("https://opensource.org/licenses/MIT");
        
        Info info = new Info()
                .title("Course Service API")
                .version("1.0")
                .contact(contact)
                .description("API for managing courses in the course platform")
                .license(license);
        
        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer));
    }
}