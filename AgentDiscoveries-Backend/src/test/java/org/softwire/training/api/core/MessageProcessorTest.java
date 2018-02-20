package org.softwire.training.api.core;

import org.junit.jupiter.api.Test;
import org.softwire.training.models.Message;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class MessageProcessorTest {

    private final MessageProcessor messageProcessor = new MessageProcessor();

    @Test
    public void EncryptModifiesMessage() {
        String startingMessageString = "Some test message! :)";
        Message messageToModify = new Message(startingMessageString);
        messageProcessor.encrypt(messageToModify);
        assertNotEquals(startingMessageString, messageToModify.getMessage());
    }

    @Test
    public void DecryptModifiesMessage() {
        String startingMessageString = "Some test message! :)";
        Message messageToModify = new Message(startingMessageString);
        messageProcessor.decrypt(messageToModify);
        assertNotEquals(startingMessageString, messageToModify.getMessage());
    }

    @Test
    public void EncryptsAndDecryptsMessageToStartingMessage() {
        String startingMessageString = "hello";
        Message messageToModify = new Message(startingMessageString);
        messageProcessor.encrypt(messageToModify);
        messageProcessor.decrypt(messageToModify);
        assertEquals(startingMessageString, messageToModify.getMessage());
    }
}
