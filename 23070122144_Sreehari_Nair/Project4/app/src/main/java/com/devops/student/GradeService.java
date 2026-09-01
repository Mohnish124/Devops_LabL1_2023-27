package com.devops.student;

import java.util.List;

/**
 * Service to calculate student grades, average score, GPA, and honors status.
 */
public class GradeService {

    /**
     * Calculates the letter grade for a given percentage score.
     *
     * @param score Percentage score (0 - 100)
     * @return Letter grade (A, B, C, D, or F)
     * @throws IllegalArgumentException if score is outside [0, 100]
     */
    public String calculateGrade(double score) {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("Score must be between 0 and 100");
        }

        if (score >= 90.0) {
            return "A";
        } else if (score >= 80.0) {
            return "B";
        } else if (score >= 70.0) {
            return "C";
        } else if (score >= 60.0) {
            return "D";
        } else {
            return "F";
        }
    }

    /**
     * Calculates the average score from a list of subject marks.
     *
     * @param scores List of numerical scores
     * @return Average score
     * @throws IllegalArgumentException if list is null or empty
     */
    public double calculateAverage(List<Double> scores) {
        if (scores == null || scores.isEmpty()) {
            throw new IllegalArgumentException("Scores list cannot be null or empty");
        }

        double sum = 0.0;
        for (Double s : scores) {
            if (s == null || s < 0 || s > 100) {
                throw new IllegalArgumentException("Invalid individual score: " + s);
            }
            sum += s;
        }
        return sum / scores.size();
    }

    /**
     * Determines whether a student qualifies for Dean's Honor Roll (Grade A with average >= 92.0).
     *
     * @param averageScore Calculated average score
     * @return true if eligible for honors, false otherwise
     */
    public boolean isEligibleForHonors(double averageScore) {
        return averageScore >= 92.0;
    }
}
