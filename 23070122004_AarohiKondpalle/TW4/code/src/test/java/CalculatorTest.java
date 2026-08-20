import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    @Test
    void testAddition() {
        Calculator c = new Calculator();
        assertEquals(5, c.add(2, 3));
    }

    @Test
    void testMultiplication() {
        Calculator c = new Calculator();
        assertEquals(6, c.multiply(2, 3));
    }
}