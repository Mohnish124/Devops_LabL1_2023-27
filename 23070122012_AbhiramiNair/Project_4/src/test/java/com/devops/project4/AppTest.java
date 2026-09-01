package com.devops.project4;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AppTest {

    @Test
    void pipelineMessageShouldBePresent() {
        App app = new App();
        assertTrue(app.getPipelineMessage().contains("distributed Jenkins pipeline"));
    }

    @Test
    void additionShouldWork() {
        App app = new App();
        assertEquals(5, app.add(2, 3));
    }
}
