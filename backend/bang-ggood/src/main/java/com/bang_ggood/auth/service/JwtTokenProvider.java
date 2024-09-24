package com.bang_ggood.auth.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
    private JwtTokenProperties jwtTokenProperties;

    private final String secretKey;

    public JwtTokenProvider(
            @Value("${jwt.secret-key}") String secretKey,
            JwtTokenProperties jwtTokenProperties) {
        this.secretKey = secretKey;
        this.jwtTokenProperties = jwtTokenProperties;
    }

    public String createAccessToken(User user) {
        Date now = new Date();
        long expiredMillis = now.getTime() + jwtTokenProperties.getAccessTokenExpirationMillis();
        Date expiredDate = new Date(expiredMillis);

        return createToken(user, now, expiredDate);
    }

    public String createRefreshToken(User user) {
        Date now = new Date();
        long expiredMillis = now.getTime() + jwtTokenProperties.getRefreshTokenExpirationMillis();
        Date expiredDate = new Date(expiredMillis);

        return createToken(user, now, expiredDate);
    }

    private String createToken(User user, Date now, Date expiredDate) {
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expiredDate)
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public AuthUser resolveToken(String token) {
        try {
            log.info("resolveToken token: {}", token);
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
