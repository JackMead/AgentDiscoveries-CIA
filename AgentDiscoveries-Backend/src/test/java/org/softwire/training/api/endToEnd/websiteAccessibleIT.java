package org.softwire.training.api.endToEnd;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class websiteAccessibleIT {
    public static final String Target_Address=System.getProperty("target.address");
    public static final WebDriver driver = new HtmlUnitDriver();

    @Test
    public void testTitle(){
        driver.get(Target_Address);
        String title = driver.getTitle();
        assertTrue(title.equals("Agent Discoveries"));
    }
}
