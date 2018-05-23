package org.softwire.training.api.core;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;

public class PasswordHasher {

    private static final Logger LOGGER = LoggerFactory.getLogger(PasswordHasher.class);

    @Inject
    public PasswordHasher() {
        // No argument constructor for injection
    }

    public String hashPassword(String plaintextPassword) {
        return BCrypt.hashpw(plaintextPassword, BCrypt.gensalt());
    }

    public boolean checkPassword(String plaintextPassword, String hashedPassword) {
        try {
            return BCrypt.checkpw(plaintextPassword, hashedPassword);
        } catch (IllegalArgumentException exception) {
            // BCrypt will throw IllegalArgumentException if the hashed password is not as expected.
            // In this case log and return false as cannot possibly match what is stored.
            LOGGER.error("Exception while checking password", exception);
            return false;
        }
    }
}
