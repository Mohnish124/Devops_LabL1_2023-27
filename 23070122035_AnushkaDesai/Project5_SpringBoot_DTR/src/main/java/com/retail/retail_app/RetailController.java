package com.retail.retail_app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RetailController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Retail Company Web Application";
    }

    @GetMapping("/products")
    public String products() {
        return "Products: Laptop, Smartphone, Headphones, Smartwatch";
    }
}