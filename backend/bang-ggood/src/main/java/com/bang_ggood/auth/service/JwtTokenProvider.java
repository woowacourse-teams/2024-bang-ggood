package com.bang_ggood.auth.service;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
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

    private final String secretKey;
    private final long tokenExpirationMills;

    public JwtTokenProvider(
            @Value("${jwt.secret-key}") String secretKey,
            @Value("${jwt.expiration-millis}") long tokenExpirationMills) {
        this.secretKey = secretKey;
        this.tokenExpirationMills = tokenExpirationMills;
    }

    public String createToken(User user) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + tokenExpirationMills);

        return Jwts.builder()
                .setSubject(user.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiredDate)
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
}
