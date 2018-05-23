package org.softwire.training.api.core;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class PasswordHasherTest {

    private final PasswordHasher passwordHasher = new PasswordHasher();

    @Test
    public void roundTripPasswordHashing() {
        String password = "password";

        String hashedPassword = passwordHasher.hashPassword(password);

        assertTrue(passwordHasher.checkPassword(password, hashedPassword));
    }

    @Test
    public void failOnIncorrectPassword() {
        String hashedPassword = passwordHasher.hashPassword("password");

        assertFalse(passwordHasher.checkPassword("incorrect", hashedPassword));
    }
}
