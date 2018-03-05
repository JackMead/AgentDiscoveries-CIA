package org.softwire.training.api.end_to_end.helper;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

public class E2eHelper {
    public void login(WebDriver driver, String targetAddress) {
        driver.get(targetAddress);
        WebElement userNameInput = driver.findElement(By.id("user-name-input"));
        userNameInput.sendKeys("testuser1");
        WebElement passwordInput = driver.findElement(By.id("password-input"));
        passwordInput.sendKeys("badpass");
        WebElement submitButton = driver.findElement(By.id("login-submit"));
        submitButton.submit();
        WebElement navBarRight = driver.findElement(By.className("navbar-right"));
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.stalenessOf(submitButton));
    }

    public WebDriver prepareDriver() {
        ChromeOptions options = new ChromeOptions()
                .addArguments("headless")
                .addArguments("no-sandbox");
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts()
                .implicitlyWait(10, TimeUnit.SECONDS)
                .pageLoadTimeout(2, TimeUnit.SECONDS);
        return driver;
    }
}
