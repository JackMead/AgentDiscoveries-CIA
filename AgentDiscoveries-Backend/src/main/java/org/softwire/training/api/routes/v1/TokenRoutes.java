package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.api.core.TokenIssuer;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.TokenRequestApiModel;
import org.softwire.training.api.models.TokenResponseApiModel;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;
import java.util.Optional;

public class TokenRoutes {

    private final UsersDao usersDao;
    private final PasswordHasher passwordHasher;
    private final TokenIssuer tokenIssuer;

    @Inject
    public TokenRoutes(UsersDao usersDao, PasswordHasher passwordHasher, TokenIssuer tokenIssuer) {
        this.usersDao = usersDao;
        this.passwordHasher = passwordHasher;
        this.tokenIssuer = tokenIssuer;
    }

    public void validateToken(Request req, Response res) throws FailedRequestException {
        String headerValue = req.headers("Authorization");

        if (StringUtils.isEmpty(headerValue) || !headerValue.startsWith("Bearer ")) {
            throw new FailedRequestException(ErrorCode.INVALID_TOKEN, "Bearer authorization not present");
        } else {
            // Store user_id as an attribute for user in request logic. If
            String subject = tokenIssuer.validateToken(headerValue.substring(7));
            req.attribute("user_id", Integer.parseInt(subject));
        }
    }

    public TokenResponseApiModel createToken(Request req, Response res) throws FailedRequestException {
        TokenRequestApiModel tokenRequest = JsonRequestUtils.readBodyAsType(req, TokenRequestApiModel.class);

        Optional<User> userOptional = usersDao.getUserByUsername(tokenRequest.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordHasher.checkPassword(tokenRequest.getPassword(), user.getHashedPassword())) {
                return generateToken(user);
            } else {
                throw new FailedRequestException(ErrorCode.INVALID_CREDENTIALS, "Invalid password supplied");
            }
        } else {
            throw new FailedRequestException(ErrorCode.INVALID_CREDENTIALS, "Username not found");
        }
    }

    private TokenResponseApiModel generateToken(User user) {
        // Use the user_id as the subject for the issued token
        TokenIssuer.IssuedToken issuedToken = tokenIssuer.generateToken(Integer.toString(user.getUserId()));
        return new TokenResponseApiModel(issuedToken.getToken(), issuedToken.getExpiryInstant().toString(), user.getUserId(), user.isAdmin());
    }
}
