package com.retail.retailapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductCatalogController {

    @GetMapping("/retail/products")
    public Map<String, Object> getProductCatalog() {
        Map<String, Object> response = new HashMap<>();
        response.put("application", "Product Catalog Web Service");
        response.put("totalProducts", 3);
        
        List<Map<String, Object>> products = new ArrayList<>();
        
        Map<String, Object> p1 = new HashMap<>();
        p1.put("id", "PROD-101");
        p1.put("name", "Enterprise Laptop Pro");
        p1.put("category", "Electronics");
        p1.put("price", 1299.99);
        products.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("id", "PROD-102");
        p2.put("name", "Wireless Ergonomic Mouse");
        p2.put("category", "Accessories");
        p2.put("price", 49.99);
        products.add(p2);

        Map<String, Object> p3 = new HashMap<>();
        p3.put("id", "PROD-103");
        p3.put("name", "UltraHD 27-inch Monitor");
        p3.put("category", "Electronics");
        p3.put("price", 349.50);
        products.add(p3);

        response.put("products", products);
        return response;
    }
}
