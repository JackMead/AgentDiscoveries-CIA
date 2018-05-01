package org.softwire.training.api.integration;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.softwire.training.api.integration.helper.LoginHelper;
import org.softwire.training.api.integration.helper.WebDriverHelper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginIT {
    public static final String TARGET_ADDRESS = System.getProperty("target.address");

    private static WebDriver driver;

    @BeforeAll
    public static void setUp() {
        driver = WebDriverHelper.getSharedDriver();
    }

    @Test
    public void testTitle() {
        driver.get(TARGET_ADDRESS);
        String title = driver.getTitle();
        assertEquals("Agent Discoveries", title);
    }

    @Test
    public void testCanLogIn() {
        LoginHelper.login(driver, TARGET_ADDRESS);
        WebElement navBarRight = driver.findElement(By.className("navbar-right"));
        assertTrue(navBarRight.getText().contains("Log Out"));
    }
}
