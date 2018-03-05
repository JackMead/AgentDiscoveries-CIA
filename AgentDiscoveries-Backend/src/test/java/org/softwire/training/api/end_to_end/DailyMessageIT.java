package org.softwire.training.api.end_to_end;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.softwire.training.api.core.MessageProcessor;
import org.softwire.training.api.end_to_end.helper.E2eHelper;
import org.softwire.training.models.Message;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class DailyMessageIT {
    public static final String Target_Address=System.getProperty("target.address");

    private static WebDriver driver;
    private static E2eHelper helper = new E2eHelper();
    private static WebDriverWait wait;

    @BeforeAll
    public static void setUp(){
        driver=helper.prepareDriver();
        wait = new WebDriverWait(driver, 10);
    }

    @AfterAll
    public static void tearDown(){
        driver.quit();
    }

    @Test
    public void testCanEncodeAndDecodeMessage() throws InterruptedException {
        String startingMessage = "aTestMessage";
        Message encodedMessage = new Message(startingMessage);
        Message decodedMessage = new Message(startingMessage);

        MessageProcessor messageProcessor = new MessageProcessor();
        messageProcessor.encrypt(encodedMessage);
        messageProcessor.decrypt(decodedMessage);

        helper.login(driver, Target_Address);
        try {
            driver.get(Target_Address + "/#/message");
        }catch(Exception e){
            if(e.getClass()!=TimeoutException.class){
                throw e;
            }
        }
        WebElement userNameInput = driver.findElement(By.id("message-input"));
        userNameInput.sendKeys(startingMessage);

        WebElement encodeButton = driver.findElement(By.id("encode-button"));
        encodeButton.click();
        WebElement resultDiv = driver.findElement(By.id("code-result"));
        wait.until(ExpectedConditions.textToBePresentInElement(resultDiv, encodedMessage.getMessage()));
        assert(resultDiv.getText().contains(encodedMessage.getMessage()));

        WebElement decodeButton = driver.findElement(By.id("decode-button"));
        decodeButton.click();
        wait.until(ExpectedConditions.textToBePresentInElement(resultDiv, decodedMessage.getMessage()));
        assertTrue(resultDiv.getText().contains(decodedMessage.getMessage()));
    }
}
