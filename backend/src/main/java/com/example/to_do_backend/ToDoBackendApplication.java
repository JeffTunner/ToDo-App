package com.example.to_do_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.to_do_backend.repository")
@EntityScan(basePackages = "com.example.to_do_backend.entity")
public class ToDoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoBackendApplication.class, args);
	}

}
