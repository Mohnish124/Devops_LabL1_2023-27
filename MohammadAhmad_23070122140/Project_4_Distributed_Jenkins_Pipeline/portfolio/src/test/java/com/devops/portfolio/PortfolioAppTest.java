package com.devops.portfolio;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PortfolioAppTest {

    @Test
    public void testStudentMetadata() {
        PortfolioApp app = new PortfolioApp();
        String info = app.getStudentInfo();
        assertNotNull(info);
        assertTrue(info.contains("Mohammad Ahmad"));
        assertTrue(info.contains("23070122140"));
    }

    @Test
    public void testPortfolioHealth() {
        PortfolioApp app = new PortfolioApp();
        assertTrue(app.verifyPortfolioHealth(), "Portfolio health verification should return true");
    }
}
