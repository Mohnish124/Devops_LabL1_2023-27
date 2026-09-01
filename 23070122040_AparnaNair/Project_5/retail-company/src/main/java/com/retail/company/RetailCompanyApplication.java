package com.retail.company;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RetailCompanyApplication {

    public static void main(String[] args) {
        SpringApplication.run(RetailCompanyApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to Retail Company!";
    }

    @GetMapping("/products")
    public String products() {
        return "Retail Company Products";
    }
}