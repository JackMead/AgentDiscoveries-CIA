package org.softwire.training.api.endToEnd;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class dummySeleniumIT {
    public static final String Target_Address=System.getProperty("target.address");

    @Test
    public void testTitle(){
        WebDriver driver = new HtmlUnitDriver();
        driver.get(Target_Address);
        String title = driver.getTitle();
        assertTrue(title.equals("Agent Discoveries"));
    }

    @Test
    public void testOnline(){
        WebDriver driver = new HtmlUnitDriver();
        driver.get(Target_Address);
        String body = driver.getPageSource();
        assertTrue(!body.isEmpty());
    }
}
