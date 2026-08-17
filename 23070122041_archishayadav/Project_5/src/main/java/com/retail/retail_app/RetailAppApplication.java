package com.retail.retail_app; 

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RetailAppApplication { // Changed to capital 'A'

    public static void main(String[] args) {
        SpringApplication.run(RetailAppApplication.class, args); // Changed to capital 'A'
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to the Retail Company Web Application!";
    }
}