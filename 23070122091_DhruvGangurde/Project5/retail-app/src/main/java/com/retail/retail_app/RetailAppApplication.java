package com.retail.retail_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class RetailAppApplication {


public static void main(String[] args) {
    SpringApplication.run(RetailAppApplication.class, args);
}

}

@RestController
class RetailController {

@GetMapping("/")
public String home() {
    return "Retail Application is running successfully!";
}

}
