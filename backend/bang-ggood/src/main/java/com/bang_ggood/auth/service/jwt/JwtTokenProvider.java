package com.bang_ggood.auth.service.jwt;

import com.bang_ggood.auth.service.AuthUser;
import com.bang_ggood.auth.service.TokenType;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final String TOKEN_TYPE = "type";
    private final JwtTokenProperties jwtTokenProperties;
    private final String secretKey;

    public JwtTokenProvider(
            @Value("${jwt.secret-key}") String secretKey,
            JwtTokenProperties jwtTokenProperties) {
        this.secretKey = secretKey;
        this.jwtTokenProperties = jwtTokenProperties;
    }

    public String createAccessToken(User user) {
        long accessTokenExpirationMillis = jwtTokenProperties.getAccessTokenExpirationMillis();
        return createToken(user, accessTokenExpirationMillis, TokenType.ACCESS_TOKEN);
    }

    public String createRefreshToken(User user) {
        long refreshTokenExpirationMillis = jwtTokenProperties.getRefreshTokenExpirationMillis();
        return createToken(user, refreshTokenExpirationMillis, TokenType.REFRESH_TOKEN);
    }

    private String createToken(User user, long expirationMillis, TokenType tokenType) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .setSubject(user.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiredDate)
                .claim(TOKEN_TYPE, tokenType.name())
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public AuthUser resolveToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Long id = Long.valueOf(claims.getSubject());
            return AuthUser.from(id);
        } catch (ExpiredJwtException exception) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_EXPIRED);
        } catch (JwtException exception) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_INVALID);
        }
    }

    public void validateRefreshTokenType(String refreshToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(refreshToken)
                .getBody();

        String tokenType = claims.get(TOKEN_TYPE, String.class);

        if (!tokenType.equals(TokenType.REFRESH_TOKEN.name())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_TYPE_MISMATCH);
        }
    }
}
