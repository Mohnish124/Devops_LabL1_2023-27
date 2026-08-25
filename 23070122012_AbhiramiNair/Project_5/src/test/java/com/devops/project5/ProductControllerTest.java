package com.devops.project5;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProductControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void healthEndpointWorks() {
        String response = restTemplate.getForObject(
                "http://localhost:" + port + "/api/health",
                String.class
        );

        assertEquals("Retail web application is healthy", response);
    }

    @Test
    void productsEndpointWorks() {
        String response = restTemplate.getForObject(
                "http://localhost:" + port + "/api/products",
                String.class
        );

        assertTrue(response.contains("Running Shoes"));
        assertTrue(response.contains("Cotton T-Shirt"));
    }
}
