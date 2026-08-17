package com.devops.retail;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration and endpoint tests for RetailApplication.
 */
@SpringBootTest
@AutoConfigureMockMvc
public class RetailApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Context loads successfully")
    void contextLoads() {
    }

    @Test
    @DisplayName("Root endpoint returns application details")
    void testHomeEndpoint() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.application").value("Enterprise Retail Management System"));
    }

    @Test
    @DisplayName("Product catalog endpoint returns all products")
    void testProductsEndpoint() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(5))
                .andExpect(jsonPath("$[0].name").value("Wireless Mechanical Keyboard"));
    }

    @Test
    @DisplayName("Single product lookup returns correct item")
    void testGetProductById() throws Exception {
        mockMvc.perform(get("/api/products/101"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Wireless Mechanical Keyboard"))
                .andExpect(jsonPath("$.category").value("Electronics"));
    }

    @Test
    @DisplayName("Health check endpoint returns healthy status")
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("HEALTHY"));
    }
}
