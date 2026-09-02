package com.retail.retail_web_app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RetailController {

    @GetMapping("/")
    public String home() {
        return "Retail Web Application is running!";
    }

    @GetMapping("/products")
    public String products() {
        return "Retail Products Service";
    }
}