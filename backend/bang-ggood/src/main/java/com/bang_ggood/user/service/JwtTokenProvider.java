package com.bang_ggood.user.service;

import com.bang_ggood.user.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String secretKey;
    private final int tokenExpirationMills;

    public JwtTokenProvider(
            @Value("${jwt.secret-key}") String secretKey,
            @Value("${jwt.expiration-millis}") int tokenExpirationMills) {
        this.secretKey = secretKey;
        this.tokenExpirationMills = tokenExpirationMills;
    }

    public String createToken(User user) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + tokenExpirationMills);

        return Jwts.builder()
                .claim("id", user.getId())
                .claim("name", user.getName())
                .claim("email", user.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiredDate)
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }
}
