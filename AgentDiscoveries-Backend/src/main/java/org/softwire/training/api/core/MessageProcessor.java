package org.softwire.training.api.core;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.configuration2.Configuration;

import javax.inject.Inject;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.ZoneOffset;
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
            // Should never fail!
            throw new RuntimeException(e);
        }
    }

    private final String seed;

    public MessageProcessor(String seed) {
        this.seed = seed;
    }

    @Inject
    public MessageProcessor(Configuration configuration) {
        this(configuration.getString("message.encoding.seed"));
    }

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

    /**
     * Use a combination of the secret seed and the date to generate a hash.
     * This is used to select a word from the list.
     *
     * It should be cryptographically difficult to deduce the seed,
     * the date or the next word given any of the others.
     */
    private String getCodeWord() {
        // Input bytes from the seed and current date
        byte[] input = ByteBuffer.allocate(8)
                .putInt(LocalDate.now(ZoneOffset.UTC).hashCode())
                .put(seed.getBytes(StandardCharsets.UTF_8))
                .array();

        // Hash the input
        byte[] hash = DigestUtils.md5(input);

        // Extract the first 4 bytes as an int
        int result = ByteBuffer.wrap(hash).getInt();

        // Select a word using the result
        return WORD_LIST.get(Math.floorMod(result, WORD_LIST.size()));
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
