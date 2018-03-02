package org.softwire.training.api.core;

import org.softwire.training.models.Message;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class MessageProcessor {
    private List<String> wordList = Arrays.asList(
            "latch", "chief", "dye", "observe", "volleyball", "disturb", "brain", "boys", "giant", "refer", "rigid",
            "language", "responsible", "strew", "fangs", "sacrifice", "eye", "corrupt", "ambitious", "lead", "hush",
            "hope", "test", "grandfather", "frequent");

    public void encrypt(Message message){
        String codeWord = getCodeWord();
        String messageString = message.getMessage();
        String encodedMessageString = new String();
        for (int i = 0; i < messageString.length(); i++) {
            if (messageString.charAt(i) == ' ') {
                encodedMessageString+= ' ';
            } else {
                encodedMessageString += (char) (Math.floorMod((messageString.charAt(i) + codeWord.charAt(i % codeWord.length()) - (int)'A'), 58) + (int)'A');
            }
        }

        message.setMessage(encodedMessageString);
    }

    public void decrypt(Message message){
        String codeWord = getCodeWord();
        String messageString = message.getMessage();
        String decodedMessageString = new String();
        for (int i = 0; i < messageString.length(); i++) {
            if (messageString.charAt(i) == ' ') {
                decodedMessageString += ' ';
            } else {
                decodedMessageString += (char) (Math.floorMod((messageString.charAt(i) - codeWord.charAt(i % codeWord.length()) - (int) 'A'), 58) + (int) 'A');
            }
        }

        message.setMessage(decodedMessageString);
    }

    private String getCodeWord() {
        LocalDate today = LocalDate.now();
        int hashCode = today.hashCode();
        return wordList.get(hashCode % (wordList.size()));
    }

}
