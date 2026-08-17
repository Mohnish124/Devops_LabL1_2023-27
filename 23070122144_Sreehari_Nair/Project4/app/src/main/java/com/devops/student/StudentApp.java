package com.devops.student;

import java.util.Arrays;
import java.util.List;

/**
 * Main application entry point demonstrating the Student Grade Evaluation Service.
 */
public class StudentApp {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   Student Grade & Performance Evaluation App    ");
        System.out.println("   Project 4: Distributed Jenkins CI Pipeline     ");
        System.out.println("==================================================");

        GradeService gradeService = new GradeService();

        List<Double> semesterScores = Arrays.asList(95.0, 88.5, 92.0, 91.0, 89.0);
        System.out.println("Subject Scores: " + semesterScores);

        double average = gradeService.calculateAverage(semesterScores);
        String finalGrade = gradeService.calculateGrade(average);
        boolean honors = gradeService.isEligibleForHonors(average);

        System.out.printf("Calculated Average Score : %.2f%%\n", average);
        System.out.printf("Final Overall Grade       : %s\n", finalGrade);
        System.out.printf("Dean's Honors Status      : %s\n", honors ? "QUALIFIED" : "NOT QUALIFIED");
        System.out.println("==================================================");
        System.out.println("Application executed successfully!");
    }
}
