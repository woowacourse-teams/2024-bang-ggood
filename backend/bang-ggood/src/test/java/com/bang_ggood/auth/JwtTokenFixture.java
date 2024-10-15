package com.bang_ggood.auth;

import com.bang_ggood.auth.service.jwt.JwtTokenProperties;
import com.bang_ggood.auth.service.jwt.JwtTokenProvider;
import java.security.SecureRandom;
import java.util.Base64;

public class JwtTokenFixture {

    private static final long THIRTY_MINUTE = 1800000L;

    public static JwtTokenProvider JWT_TOKEN_PROVIDER_WITH_INVALID_KEY() {
        return new JwtTokenProvider(PROPERTIES_WITH_INVALID_SECRET_KEY());
    }

    public static JwtTokenProvider JWT_TOKEN_PROVIDER_WITH_INVALID_EXPIRED_TIME() {
        return new JwtTokenProvider(PROPERTIES_WITH_SHORT_EXPIRED_MILLIS());
    }

    private static String createJwtSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[32];
        secureRandom.nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }

    private static JwtTokenProperties PROPERTIES_WITH_SHORT_EXPIRED_MILLIS() {
        return new JwtTokenProperties(createJwtSecretKey(), 1L, 1L);
    }

    private static JwtTokenProperties PROPERTIES_WITH_INVALID_SECRET_KEY() {
        return new JwtTokenProperties(createJwtSecretKey(), THIRTY_MINUTE, THIRTY_MINUTE);
    }
}
