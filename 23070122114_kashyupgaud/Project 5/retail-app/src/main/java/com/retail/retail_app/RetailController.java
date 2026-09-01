package com.retail.retail_app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RetailController {

    @GetMapping("/")
    public String home() {
        return "Retail Company Web Application is Running!";
    }

    @GetMapping("/products")
    public String products() {
        return "Product Catalog: Laptop, Smartphone, Headphones, Smart Watch";
    }

    @GetMapping("/orders")
    public String orders() {
        return "Order Management Service is Running!";
    }
}
