package org.softwire.training.api.endToEnd;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.softwire.training.AgentDiscoveriesApplication;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class dummySeleniumIT {
    @Test
    public void testTitle(){
        WebDriver driver = new HtmlUnitDriver();
        driver.get("http://localhost:8080");
        String title = driver.getTitle();
        System.out.println("Title found: "+title);
        assertTrue(title.equals("Agent Discoveries"));
    }

    public void testOnline(){
        WebDriver driver = new HtmlUnitDriver();
        driver.get("http://localhost:8080");
        String body = driver.getPageSource();
        assertTrue(!body.isEmpty());
    }
}
