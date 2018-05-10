package org.softwire.training.api.core;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import spark.utils.IOUtils;

import javax.inject.Inject;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;

/**
 * The MessageProcessor selects a word from a list and applies a shift cipher.
 *
 * This rotates the set of printable characters based on the letters in the codeword.
 * Non-ASCII and non-printable characters (including spaces) are unchanged.
 */
public class MessageProcessor {

    // Printable ASCII characters, not including space
    private static final char FIRST_PRINTABLE = 0x21;
    private static final char LAST_PRINTABLE = 0x7E;

    private static final List<String> WORD_LIST;

    static {
        try {
            WORD_LIST = Resources.readLines(
                    Resources.getResource("codewords.txt"),
                    Charsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Inject
    public MessageProcessor() {}

    public String encode(String input){
        return applyShiftCipher(input, getCodeWord(), false);
    }

    public String decode(String input){
        return applyShiftCipher(input, getCodeWord(), true);
    }

    private String applyShiftCipher(String input, String codeWord, boolean invert) {
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);
            if (isAsciiPrintable(ch)) {
                int shift = codeWord.charAt(i % codeWord.length()) - FIRST_PRINTABLE;
                result.append(shiftPrintableChar(ch, invert ? -shift : shift));
            } else {
                result.append(ch);
            }
        }

        return result.toString();
    }

    private String getCodeWord() {
        LocalDate today = LocalDate.now(ZoneOffset.UTC);
        int hashCode = today.hashCode();
        return WORD_LIST.get(hashCode % (WORD_LIST.size()));
    }

    private boolean isAsciiPrintable(char ch) {
        return ch >= FIRST_PRINTABLE && ch <= LAST_PRINTABLE;
    }

    private char shiftPrintableChar(char ch, int shift) {
        int offset = FIRST_PRINTABLE; // the start of printable characters
        int limit = LAST_PRINTABLE - FIRST_PRINTABLE;

        // floorMod is like '%' but always returns a positive integer
        return (char) (Math.floorMod(ch + shift - offset, limit) + offset);
    }
}
