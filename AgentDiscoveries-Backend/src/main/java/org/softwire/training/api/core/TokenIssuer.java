package org.softwire.training.api.core;

import io.jsonwebtoken.*;
import org.apache.commons.configuration2.Configuration;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.inject.Inject;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Date;

public class TokenIssuer {

    private Configuration configuration;

    @Inject
    public TokenIssuer(Configuration configuration) {
        this.configuration = configuration;
    }

    public IssuedToken generateToken(String subject) {
        Instant expiryInstant = getExpirationInstantForTokenIssuedNow();
        String token = Jwts.builder()
                .setSubject(subject)
                .setExpiration(Date.from(expiryInstant))
                .signWith(SignatureAlgorithm.HS512, getSecretKey())
                .compact();

        return new IssuedToken(token, expiryInstant);
    }

    private Instant getExpirationInstantForTokenIssuedNow() {
        return ZonedDateTime.now(ZoneId.systemDefault())
                .plusHours(24)
                .toInstant();
    }

    public String validateToken(String token) throws FailedRequestException {
        try {
            Claims claims = Jwts.parser().setSigningKey(getSecretKey()).parseClaimsJws(token).getBody();
            return claims.getSubject();
        } catch (SignatureException e) {
            throw new FailedRequestException(ErrorCode.INVALID_TOKEN, "Token is invalid");
        } catch (ExpiredJwtException expiredToken) {
            throw new FailedRequestException(ErrorCode.TOKEN_EXPIRED, "Token has already expired");
        }
    }

    private SecretKey getSecretKey() {
        return new SecretKeySpec(
                Base64.getDecoder().decode(configuration.getString("server.authentication.key")),
                configuration.getString("server.authentication.algorithm"));
    }

    public static class IssuedToken {

        private final String token;
        private final Instant expiryInstant;

        public IssuedToken(String token, Instant expiryInstant) {
            this.token = token;
            this.expiryInstant = expiryInstant;
        }

        public String getToken() {
            return token;
        }

        public Instant getExpiryInstant() {
            return expiryInstant;
        }
    }
}
