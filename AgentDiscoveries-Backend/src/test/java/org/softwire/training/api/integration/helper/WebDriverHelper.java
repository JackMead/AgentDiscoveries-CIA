package org.softwire.training.api.integration.helper;

import io.github.bonigarcia.wdm.ChromeDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.concurrent.TimeUnit;

/**
 * Helper for preparing a WebDriver for use with the Integration Tests
 */
public class WebDriverHelper {

    /**
     * Set this to 'false' to disable headless mode and allow debugging with developer tools.
     */
    private static final boolean HEADLESS = true;

    /**
     * Shared webdriver
     */
    private static WebDriver sharedDriver = null;

    private WebDriverHelper() {}

    /**
     * Get a web driver. Note that this is shared among several tests!
     */
    public static synchronized WebDriver getSharedDriver() {
        if (sharedDriver == null) {
            sharedDriver = prepareDriver();
        }
        return sharedDriver;
    }

    private static WebDriver prepareDriver() {
        ChromeDriverManager.getInstance().setup();

        ChromeOptions options = new ChromeOptions();
        if (HEADLESS) {
            options.addArguments("--headless", "--disable-gpu");
        }
        WebDriver driver = new ChromeDriver(options);

        driver.manage().timeouts()
                .implicitlyWait(10, TimeUnit.SECONDS)
                .pageLoadTimeout(2, TimeUnit.SECONDS);

        // Ensure Chrome is closed when the JVM exits
        Runtime.getRuntime().addShutdownHook(new Thread(driver::close));

        return driver;
    }
}
