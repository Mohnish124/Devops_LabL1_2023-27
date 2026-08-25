package com.retail.retailapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class OrderManagementController {

    @GetMapping("/retail/orders")
    public Map<String, Object> getOrderManagement() {
        Map<String, Object> response = new HashMap<>();
        response.put("application", "Order Management Web Service");
        response.put("activeOrders", 2);

        List<Map<String, Object>> orders = new ArrayList<>();

        Map<String, Object> o1 = new HashMap<>();
        o1.put("orderId", "ORD-8821");
        o1.put("customer", "Mohammad Ahmad");
        o1.put("status", "SHIPPED");
        o1.put("totalAmount", 1349.98);
        orders.add(o1);

        Map<String, Object> o2 = new HashMap<>();
        o2.put("orderId", "ORD-8822");
        o2.put("customer", "Acme Retail Corp");
        o2.put("status", "PROCESSING");
        o2.put("totalAmount", 349.50);
        orders.add(o2);

        response.put("orders", orders);
        return response;
    }
}
