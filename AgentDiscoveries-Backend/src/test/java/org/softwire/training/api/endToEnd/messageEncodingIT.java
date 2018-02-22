package org.softwire.training.api.endToEnd;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class messageEncodingIT {
    public static final String Target_Address=System.getProperty("target.address");
    public static final WebDriver driver = new HtmlUnitDriver();

    @Test
    public void testLoginPageHasTwoFields(){
        driver.get(Target_Address+"/#/login");
        driver.manage().timeouts().implicitlyWait(4, TimeUnit.SECONDS);
        List<WebElement> elements = driver.findElements(By.className("form-control"));
        assertEquals(driver.getPageSource(), "");
        assertTrue(elements.size()==2);
    }

    @Test
    public void testLoggingIn(){
        driver.get(Target_Address+"/#/login");
        List<WebElement> elements = driver.findElements(By.className("form-control"));
        elements.get(0).sendKeys("testuser1");
        elements.get(1).sendKeys("badpass");
        elements.get(1).submit();
        assertTrue(driver.getCurrentUrl()==Target_Address+"/#/search/location" );
    }
}
