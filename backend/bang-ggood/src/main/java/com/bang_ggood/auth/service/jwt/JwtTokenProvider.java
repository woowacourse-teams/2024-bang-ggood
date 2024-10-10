package com.bang_ggood.auth.service.jwt;

import com.bang_ggood.auth.service.TokenType;
import com.bang_ggood.user.domain.User;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private final JwtTokenProperties jwtTokenProperties;

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
                .claim(JwtTokenProperties.TOKEN_TYPE, tokenType.name())
                .signWith(jwtTokenProperties.getSecretKey())
                .compact();
    }
}
