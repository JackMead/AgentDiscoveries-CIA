package org.softwire.training.api.routes.v1;

import com.sun.deploy.net.FailedDownloadException;
import org.junit.jupiter.api.Test;
import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.api.core.TokenIssuer;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.TokenRequestApiModel;
import org.softwire.training.api.models.TokenResponseApiModel;
import org.softwire.training.api.testutils.RequestGenerationHelper;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;
import spark.Request;
import spark.Response;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class TokenRoutesTest {

    private UsersDao usersDao = mock(UsersDao.class);
    private PasswordHasher passwordHasher = mock(PasswordHasher.class);
    private TokenIssuer tokenIssuer = mock(TokenIssuer.class);
    private Response response = mock(Response.class);

    private TokenRoutes tokenRoutes = new TokenRoutes(usersDao, passwordHasher, tokenIssuer);

    @Test
    public void createTokenFailsForInvalidUsername() {
        // Given
        String username = "invalid-username";
        Request request = createRequestWithUsernamePassword(username, "password");

        when(usersDao.getUserByUsername(username)).thenReturn(Optional.empty());

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenRoutes.createToken(request, response));

        // Then
        assertEquals(ErrorCode.INVALID_CREDENTIALS, exception.getErrorCode());
    }

    @Test
    public void createTokenFailsForInvalidPassword() {
        // Given
        String username = "valid-username";
        String password = "invalid-password";
        Request request = createRequestWithUsernamePassword(username, password);

        User user = mock(User.class);
        String hashedUserPassword = "hashed-password";

        when(usersDao.getUserByUsername(username)).thenReturn(Optional.of(user));
        when(user.getHashedPassword()).thenReturn(hashedUserPassword);
        when(passwordHasher.checkPassword(password, hashedUserPassword)).thenReturn(false);

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenRoutes.createToken(request, response));

        // Then
        assertEquals(ErrorCode.INVALID_CREDENTIALS, exception.getErrorCode());
    }

    @Test
    public void createTokenCallsTokenIssuerForValidUsernameAndPassword() throws FailedRequestException {
        // Given
        String username = "valid-username";
        String password = "valid-password";
        Request request = createRequestWithUsernamePassword(username, password);

        User user = mock(User.class);
        String hashedUserPassword = "hashed-password";
        int userId = 42;

        when(usersDao.getUserByUsername(username)).thenReturn(Optional.of(user));
        when(user.getHashedPassword()).thenReturn(hashedUserPassword);
        when(user.getUserId()).thenReturn(userId);
        when(passwordHasher.checkPassword(password, hashedUserPassword)).thenReturn(true);

        TokenIssuer.IssuedToken issuedToken = new TokenIssuer.IssuedToken("token", Instant.now());
        when(tokenIssuer.generateToken(Integer.toString(userId))).thenReturn(issuedToken);

        // When
        TokenResponseApiModel responseModel = tokenRoutes.createToken(request, response);

        // Then
        verify(tokenIssuer).generateToken(Integer.toString(userId));
        assertEquals(issuedToken.getToken(), responseModel.getToken());
        assertEquals(issuedToken.getExpiryInstant().toString(), responseModel.getExpires());
    }

    @Test
    public void validateTokenFailsIfNoAuthorizationHeader() {
        // Given
        Request request = createRequestWithAuthorizationHeaderValue(null);

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenRoutes.validateToken(request, response));

        // Then
        assertEquals(ErrorCode.INVALID_TOKEN, exception.getErrorCode());
    }

    @Test
    public void validateTokenFailsAuthorizationHeaderIsEmpty() {
        // Given
        Request request = createRequestWithAuthorizationHeaderValue("");

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenRoutes.validateToken(request, response));

        // Then
        assertEquals(ErrorCode.INVALID_TOKEN, exception.getErrorCode());
    }

    @Test
    public void validateTokenFailsIfAuthorizationHeaderDoesNotStartWithBearer() {
        // Given
        Request request = createRequestWithAuthorizationHeaderValue("token-without-bearer");

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenRoutes.validateToken(request, response));

        // Then
        assertEquals(ErrorCode.INVALID_TOKEN, exception.getErrorCode());
    }

    @Test
    public void validateTokenFailsIfTokenIsNotValid() throws FailedRequestException {
        // Given
        String invalidToken = "invalid-token";
        Request request = createRequestWithAuthorizationHeaderValue("Bearer " + invalidToken);

        when(tokenIssuer.validateToken(invalidToken))
                .thenThrow(new FailedRequestException(ErrorCode.OPERATION_INVALID, "message"));

        // When
        FailedRequestException exception = assertThrows(
                FailedRequestException.class,
                () -> tokenRoutes.validateToken(request, response));

        // Then
        assertEquals(ErrorCode.OPERATION_INVALID, exception.getErrorCode());
    }

    @Test
    public void validateTokenSetsUserIdAttributeOnRequestForValidToken() throws FailedRequestException {
        // Given
        String validToken = "valid-token";
        int userId = 20;

        Request request = createRequestWithAuthorizationHeaderValue("Bearer " + validToken);
        when(tokenIssuer.validateToken(validToken)).thenReturn(Integer.toString(userId));

        // When
        tokenRoutes.validateToken(request, response);

        // Then
        verify(request).attribute("user_id", userId);
    }

    private Request createRequestWithUsernamePassword(String username, String password) {
        TokenRequestApiModel model = new TokenRequestApiModel();
        model.setUsername(username);
        model.setPassword(password);

        return RequestGenerationHelper.makeRequestWithJSONBodyForObject(model);
    }

    private Request createRequestWithAuthorizationHeaderValue(String headerValue) {
        Request request = mock(Request.class);
        when(request.headers("Authorization")).thenReturn(headerValue);
        return request;
    }
}
