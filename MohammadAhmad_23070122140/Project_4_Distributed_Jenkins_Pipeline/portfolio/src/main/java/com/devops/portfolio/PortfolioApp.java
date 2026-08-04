package com.devops.portfolio;

/**
 * Maven Portfolio Application representing Mohammad Ahmad (23070122140)
 */
public class PortfolioApp {

    private final String studentName;
    private final String pnr;
    private final String batch;
    private final String course;

    public PortfolioApp() {
        this.studentName = "Mohammad Ahmad";
        this.pnr = "23070122140";
        this.batch = "2023-27";
        this.course = "DevOps Lab - Scalable CI/CD Architecture";
    }

    public String getStudentInfo() {
        return String.format("Student: %s | PNR: %s | Batch: %s | Course: %s", 
                studentName, pnr, batch, course);
    }

    public boolean verifyPortfolioHealth() {
        System.out.println("Verifying Maven Portfolio Build Artifact Integrity...");
        return studentName != null && pnr.equals("23070122140");
    }

    public static void main(String[] args) {
        PortfolioApp app = new PortfolioApp();
        System.out.println("=================================================");
        System.out.println("      DEVOPS DISTRIBUTED PIPELINE PORTFOLIO      ");
        System.out.println("=================================================");
        System.out.println(app.getStudentInfo());
        System.out.println("Portfolio Health Status: " + (app.verifyPortfolioHealth() ? "PASSED" : "FAILED"));
        System.out.println("=================================================");
    }
}
