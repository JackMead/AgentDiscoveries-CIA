package org.softwire.training.api.endToEnd;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class WebsiteAccessibleIT {
    public static final String Target_Address = System.getProperty("target.address");
    public static WebDriver driver;

    @BeforeAll
    public static void setUp() {
        System.out.println("Setting up");
        HtmlUnitDriver htmlDriver =new CustomHtmlUnitDriver();
        htmlDriver.setJavascriptEnabled(true);
        driver=htmlDriver;
    }

    @AfterAll
    public static void tearDown() {
        System.out.println("and done");
    }

    @Test
    public void testTitle() {
        driver.get(Target_Address);
        String title = driver.getTitle();
        assertEquals("Agent Discoveries", title);
    }

    @Test
    public void testLoginPageHasTwoFields() {
        driver.get(Target_Address + "/#/login");
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        WebElement elements = driver.findElement(By.id("login-submit"));
        elements.isDisplayed();
        System.out.println(elements.getText());
        System.out.println("Total page: "+driver.getPageSource());
        //assertEquals(driver.getPageSource(), "");
        assertEquals(elements.getText(), "");
    }

    @Test
    public void testLoggingIn() {
        driver.get(Target_Address + "/#/login");
        List<WebElement> elements = driver.findElements(By.className("form-control"));
        elements.get(0).sendKeys("testuser1");
        elements.get(1).sendKeys("badpass");
        elements.get(1).submit();
        assertTrue(driver.getCurrentUrl() == Target_Address + "/#/search/location");
    }
}
