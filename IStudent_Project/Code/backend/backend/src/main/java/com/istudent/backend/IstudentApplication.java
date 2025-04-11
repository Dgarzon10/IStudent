package com.istudent.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class IstudentApplication {

	public static void main(String[] args) {
		SpringApplication.run(IstudentApplication.class, args);
	}

	@GetMapping
	String greating(){
		return "Welcome to IStudent API";
	}

}
