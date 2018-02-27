package org.softwire.training.api.end_to_end;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.softwire.training.api.end_to_end.helper.E2eHelper;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class SubmitReportsIT {
    public static final String Target_Address="http://localhost:8080";//System.getProperty("target.address");

    private static WebDriver driver;
    private static E2eHelper helper;
    private WebDriverWait wait = new WebDriverWait(driver, 10);

    @BeforeAll
    public static void setUp(){
//        ChromeOptions options = new ChromeOptions().addArguments("--headless");
        driver = new ChromeDriver();
        helper=new E2eHelper();
    }

    @AfterAll
    public static void tearDown(){
        driver.quit();
    }

    @Test
    public void testCanSubmitReport(){
        //CURRENTLY
        //Need to add id tags to relevant elements
        new E2eHelper().login(driver, Target_Address);
        driver.get(Target_Address+"/#/submit/location");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("status-input")));
        WebElement statusInput = driver.findElement(By.id("status-input"));
        statusInput.sendKeys("1");
        WebElement reportInput = driver.findElement(By.id("report-input"));
        reportInput.sendKeys("A test report");
        WebElement submitButton = driver.findElement(By.tagName("button"));
        submitButton.submit();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("alert-info")));
        WebElement alert = driver.findElement(By.className("alert-info"));
        assertTrue(alert.getText().contains("Report sent"));
    }
}
