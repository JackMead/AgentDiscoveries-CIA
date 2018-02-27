package org.softwire.training.api.end_to_end.helper;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class E2eHelper {
    public void login(WebDriver driver, String targetAddress){
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
}
