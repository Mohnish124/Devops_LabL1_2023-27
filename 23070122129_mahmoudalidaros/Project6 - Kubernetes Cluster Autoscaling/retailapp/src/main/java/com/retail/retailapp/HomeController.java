package com.retail.retailapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/status")
    public String status() {
        return "Retail Company Spring Boot Application Running Successfully!";
    }
}