package org.softwire.training.api.integration.helper;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Helper for logging in to the application
 */
public class LoginHelper {
    public static void login(WebDriver driver, String targetAddress) {
        driver.get(targetAddress);

        WebElement userNameInput = driver.findElement(By.id("user-name-input"));
        userNameInput.sendKeys("testuser1");

        WebElement passwordInput = driver.findElement(By.id("password-input"));
        passwordInput.sendKeys("badpass");

        WebElement submitButton = driver.findElement(By.id("login-submit"));
        submitButton.submit();

        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.stalenessOf(submitButton));
    }
}
