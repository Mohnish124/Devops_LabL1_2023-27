package com.portfolio.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PortfolioController {

    @GetMapping("/")
    public String home() {
        return "Portfolio app is running";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/greet")
    public String greet(@RequestParam(defaultValue = "world") String name) {
        return "Hello, " + name + "!";
    }

}
