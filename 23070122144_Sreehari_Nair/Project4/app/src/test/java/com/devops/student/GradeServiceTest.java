package com.devops.student;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for GradeService using JUnit 5.
 */
public class GradeServiceTest {

    private GradeService gradeService;

    @BeforeEach
    public void setUp() {
        gradeService = new GradeService();
    }

    @Test
    @DisplayName("Should return Grade A for scores >= 90")
    public void testCalculateGradeA() {
        assertEquals("A", gradeService.calculateGrade(95.5));
        assertEquals("A", gradeService.calculateGrade(90.0));
        assertEquals("A", gradeService.calculateGrade(100.0));
    }

    @Test
    @DisplayName("Should return Grade B for scores in range [80, 90)")
    public void testCalculateGradeB() {
        assertEquals("B", gradeService.calculateGrade(89.9));
        assertEquals("B", gradeService.calculateGrade(85.0));
        assertEquals("B", gradeService.calculateGrade(80.0));
    }

    @Test
    @DisplayName("Should return Grade C for scores in range [70, 80)")
    public void testCalculateGradeC() {
        assertEquals("C", gradeService.calculateGrade(79.9));
        assertEquals("C", gradeService.calculateGrade(75.0));
        assertEquals("C", gradeService.calculateGrade(70.0));
    }

    @Test
    @DisplayName("Should return Grade D for scores in range [60, 70)")
    public void testCalculateGradeD() {
        assertEquals("D", gradeService.calculateGrade(69.9));
        assertEquals("D", gradeService.calculateGrade(65.0));
        assertEquals("D", gradeService.calculateGrade(60.0));
    }

    @Test
    @DisplayName("Should return Grade F for scores < 60")
    public void testCalculateGradeF() {
        assertEquals("F", gradeService.calculateGrade(59.9));
        assertEquals("F", gradeService.calculateGrade(40.0));
        assertEquals("F", gradeService.calculateGrade(0.0));
    }

    @Test
    @DisplayName("Should throw IllegalArgumentException for score outside 0-100")
    public void testCalculateGradeInvalid() {
        assertThrows(IllegalArgumentException.class, () -> gradeService.calculateGrade(-5.0));
        assertThrows(IllegalArgumentException.class, () -> gradeService.calculateGrade(105.0));
    }

    @Test
    @DisplayName("Should correctly calculate average score from list")
    public void testCalculateAverage() {
        List<Double> scores = Arrays.asList(90.0, 80.0, 70.0, 100.0);
        double average = gradeService.calculateAverage(scores);
        assertEquals(85.0, average, 0.001);
    }

    @Test
    @DisplayName("Should throw exception when calculating average of empty or null list")
    public void testCalculateAverageEmpty() {
        assertThrows(IllegalArgumentException.class, () -> gradeService.calculateAverage(Collections.emptyList()));
        assertThrows(IllegalArgumentException.class, () -> gradeService.calculateAverage(null));
    }

    @Test
    @DisplayName("Should evaluate eligibility for Dean's Honors correctly")
    public void testHonorsEligibility() {
        assertTrue(gradeService.isEligibleForHonors(92.0));
        assertTrue(gradeService.isEligibleForHonors(98.5));
        assertFalse(gradeService.isEligibleForHonors(91.9));
        assertFalse(gradeService.isEligibleForHonors(85.0));
    }
}
