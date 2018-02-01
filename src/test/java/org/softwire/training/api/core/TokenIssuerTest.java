package org.softwire.training.api.core;

import org.apache.commons.configuration2.Configuration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class TokenIssuerTest {

    private final Configuration configuration = mock(Configuration.class);
    private final TokenIssuer tokenIssuer = new TokenIssuer(configuration);

    @BeforeEach
    public void setUp() {
        when(configuration.getString("server.authentication.algorithm")).thenReturn("HS512");
        when(configuration.getString("server.authentication.key"))
                .thenReturn("2D4vyMbaKVWNGJo9spW2FtARgN6EW+47gadhaaaaaaabt+HzJhlkcRP7U5tWUjSZXKOuC+eqAsmdRVQt8y2m1g==");
    }

    @Test
    public void generatedTokenIsConsideredValid() throws FailedRequestException {
        String subject = "subject-line";

        TokenIssuer.IssuedToken issuedToken = tokenIssuer.generateToken(subject);
        String validatedSubject = tokenIssuer.validateToken(issuedToken.getToken());

        assertEquals(subject, validatedSubject);
    }

    @Test
    public void generatedTokenExpiryDateShouldBeSufficientlyInFuture() throws FailedRequestException {
        String subject = "subject-line";

        // Act
        Instant expiryInstant = tokenIssuer.generateToken(subject).getExpiryInstant();

        // Assert
        Instant minimiumExpiryInstant = ZonedDateTime.now(ZoneId.systemDefault())
                .plusHours(23)
                .toInstant();

        assertTrue(minimiumExpiryInstant.compareTo(expiryInstant) < 0);
    }

    @Test
    public void expiredTokenIsNoLongerValid() {
        // Valid token, but expired in the past (provided clock is not days behind!)
        String expiredToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdWJqZWN0IiwiZXhwIjoxNTE3MzM0Mjg2fQ.kSuDmt3uDpCvOmS3dqjYLAaYc-gaZxHIrmye0IhfKI8n82LVwxgl3jqFIx2EMZFtFA4CUrE6FxhM3RSR6U67zw";
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenIssuer.validateToken(expiredToken));


        assertEquals(ErrorCode.TOKEN_EXPIRED, exception.getErrorCode());
    }

    @Test
    public void nonsenseTokenIsNotAcceptedWithInvalidToken() throws FailedRequestException {
        // Token without a valid signature
        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdWJqZWN0IiwiZXhwIjoxNTE3MzM0Mjg2fQ.kSuDmt3uDpCvOmS3dqjYLAaYc-gaZxHIrmye0changedn82LVwxgl3jqFIx2EMZFtFA4CUrE6FxhM3RSR6U67zw";
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenIssuer.validateToken(invalidToken));


        assertEquals(ErrorCode.INVALID_TOKEN, exception.getErrorCode());
    }
}
