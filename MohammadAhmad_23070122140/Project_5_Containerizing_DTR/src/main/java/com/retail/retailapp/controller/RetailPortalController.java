package com.retail.retailapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RetailPortalController {

    @GetMapping("/")
    public Map<String, Object> homePortal() {
        Map<String, Object> response = new HashMap<>();
        response.put("company", "Global Retail Enterprise");
        response.put("status", "UP");
        response.put("message", "Retail Company Spring Boot Application Running Successfully!");
        response.put("services", new String[]{"/retail/products", "/retail/orders"});
        return response;
    }
}
