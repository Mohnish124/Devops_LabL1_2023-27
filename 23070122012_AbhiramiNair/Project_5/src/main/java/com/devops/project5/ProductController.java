package com.devops.project5;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final List<Product> products = List.of(
            new Product(1, "Running Shoes", "Footwear", 2499.00),
            new Product(2, "Cotton T-Shirt", "Clothing", 799.00),
            new Product(3, "Travel Backpack", "Accessories", 1599.00)
    );

    @GetMapping("/health")
    public String health() {
        return "Retail web application is healthy";
    }

    @GetMapping("/products")
    public List<Product> products() {
        return products;
    }
}
