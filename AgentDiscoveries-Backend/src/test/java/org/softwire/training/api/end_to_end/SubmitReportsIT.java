package org.softwire.training.api.end_to_end;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.softwire.training.api.end_to_end.helper.E2eHelper;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class SubmitReportsIT {
    public static final String Target_Address = System.getProperty("target.address");

    private static WebDriver driver;
    private static E2eHelper helper= new E2eHelper();;
    private static WebDriverWait wait;

    @BeforeAll
    public static void setUp() throws InterruptedException {
        driver=helper.prepareDriver();
        wait = new WebDriverWait(driver, 10);
    }

    @AfterAll
    public static void tearDown() {
        driver.quit();
    }

    @Test
    public void testCanSubmitLocationReport() {
        helper.login(driver, Target_Address);
        try {
            driver.get(Target_Address + "/#/submit/location");
        } catch (Exception e) {
            if (e.getClass() != TimeoutException.class) {
                throw e;
            }
        }

        WebElement statusInput = driver.findElement(By.id("status-input"));
        statusInput.sendKeys("1");
        WebElement reportInput = driver.findElement(By.id("report-input"));
        reportInput.sendKeys("A test report");
        WebElement submitButton = driver.findElement(By.id("submit-report"));
        submitButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("alert-info")));
        WebElement alert = driver.findElement(By.className("alert-info"));
        assertTrue(alert.getText().contains("Report filed"));
    }

    @Test
    public void testCanSubmitRegionReport(){
        helper.login(driver, Target_Address);
        try {
            driver.get(Target_Address + "/#/submit/region");
        } catch (Exception e) {
            if (e.getClass() != TimeoutException.class) {
                throw e;
            }
        }

        WebElement statusInput = driver.findElement(By.id("status-input"));
        statusInput.sendKeys("1");
        WebElement reportInput = driver.findElement(By.id("report-input"));
        reportInput.sendKeys("A test report");
        WebElement submitButton = driver.findElement(By.id("submit-report"));
        submitButton.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("alert-info")));
        WebElement alert = driver.findElement(By.className("alert-info"));
        assertTrue(alert.getText().contains("Report sent"));
    }
}
