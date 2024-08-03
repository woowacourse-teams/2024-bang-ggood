package com.bang_ggood.user.service;

import com.bang_ggood.user.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final String ID_KEY = "id";
    private static final String NAME_KEY = "name";
    private static final String EMAIL_KEY = "email";

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
                .claim(ID_KEY, user.getId().toString())
                .claim(NAME_KEY, user.getName())
                .claim(EMAIL_KEY, user.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiredDate)
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public AuthInfo resolveToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();

        Long id = Long.valueOf(claims.get(ID_KEY).toString());
        String name = claims.get(NAME_KEY).toString();
        String email = claims.get(EMAIL_KEY).toString();

        return AuthInfo.of(id, name, email);
    }
}
