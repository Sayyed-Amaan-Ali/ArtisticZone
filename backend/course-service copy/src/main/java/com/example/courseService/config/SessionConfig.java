// package com.example.courseService.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.jdbc.datasource.DataSourceTransactionManager;
// import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;
// import org.springframework.transaction.PlatformTransactionManager;
// import org.springframework.transaction.annotation.EnableTransactionManagement;

// import javax.sql.DataSource;

// @Configuration
// @EnableJdbcHttpSession(
//     tableName = "SPRING_SESSION",
//     maxInactiveIntervalInSeconds = 86400 // 24 hour
// )
// public class SessionConfig {
    
//     @Bean
//     public PlatformTransactionManager transactionManager(DataSource dataSource) {
//         return new DataSourceTransactionManager(dataSource);
//     }
// }