package com.devops.retail.controller;

import com.devops.retail.model.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * REST Controller exposing endpoints for the retail store application.
 */
@RestController
@RequestMapping("/")
public class RetailController {

    private final List<Product> productCatalog = new ArrayList<>();

    public RetailController() {
        // Initialize sample retail inventory
        productCatalog.add(new Product(101L, "Wireless Mechanical Keyboard", "Electronics", 79.99, 45));
        productCatalog.add(new Product(102L, "Ergonomic Gaming Mouse", "Electronics", 49.99, 120));
        productCatalog.add(new Product(103L, "Noise-Cancelling Headphones", "Audio", 199.99, 30));
        productCatalog.add(new Product(104L, "Ultra-Wide 4K Monitor", "Displays", 349.99, 15));
        productCatalog.add(new Product(105L, "USB-C Multiport Hub", "Accessories", 29.99, 80));
    }

    /**
     * Root home endpoint returning application overview.
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getHome() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("application", "Enterprise Retail Management System");
        response.put("status", "UP");
        response.put("environment", "Docker Containerized");
        response.put("version", "1.0-SNAPSHOT");
        response.put("student", "Sreehari Nair (PRN: 23070122144)");
        response.put("endpoints", Arrays.asList("/api/products", "/api/inventory", "/api/health"));
        return ResponseEntity.ok(response);
    }

    /**
     * Returns the full product catalog.
     */
    @GetMapping("api/products")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productCatalog);
    }

    /**
     * Returns a specific product by ID.
     */
    @GetMapping("api/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productCatalog.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Returns summary of total inventory count and stock valuation.
     */
    @GetMapping("api/inventory")
    public ResponseEntity<Map<String, Object>> getInventorySummary() {
        int totalItems = productCatalog.stream().mapToInt(Product::getStockQuantity).sum();
        double totalValuation = productCatalog.stream()
                .mapToDouble(p -> p.getPrice() * p.getStockQuantity())
                .sum();

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("totalDistinctProducts", productCatalog.size());
        summary.put("totalStockUnits", totalItems);
        summary.put("totalInventoryValue", Math.round(totalValuation * 100.0) / 100.0);
        summary.put("inventoryStatus", "OPTIMAL");
        return ResponseEntity.ok(summary);
    }

    /**
     * Application health check endpoint.
     */
    @GetMapping("api/health")
    public ResponseEntity<Map<String, String>> getHealth() {
        Map<String, String> health = new HashMap<>();
        health.put("status", "HEALTHY");
        health.put("service", "retail-service");
        health.put("timestamp", new Date().toString());
        return ResponseEntity.ok(health);
    }
}
