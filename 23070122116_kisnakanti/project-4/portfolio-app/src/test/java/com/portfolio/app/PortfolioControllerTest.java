package com.portfolio.app;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PortfolioControllerTest {

    private final PortfolioController controller = new PortfolioController();

    @Test
    void homeReturnsRunningMessage() {
        assertEquals("Portfolio app is running", controller.home());
    }

    @Test
    void healthReturnsOk() {
        assertEquals("OK", controller.health());
    }

    @Test
    void greetDefaultsToWorld() {
        assertEquals("Hello, world!", controller.greet("world"));
    }

    @Test
    void greetUsesProvidedName() {
        assertEquals("Hello, Kisna!", controller.greet("Kisna"));
    }

}
