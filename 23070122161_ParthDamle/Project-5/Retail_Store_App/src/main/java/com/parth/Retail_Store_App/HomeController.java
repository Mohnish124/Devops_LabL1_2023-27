package com.parth.Retail_Store_App;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Retail Store Application!";
    }

    @GetMapping("/products")
    public String products() {
        return "Products Service Running";
    }

    @GetMapping("/customers")
    public String customers() {
        return "Customers Service Running";
    }
}