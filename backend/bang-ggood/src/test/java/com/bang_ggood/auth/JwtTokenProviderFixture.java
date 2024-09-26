package com.bang_ggood.auth;

import com.bang_ggood.auth.service.JwtTokenProperties;
import com.bang_ggood.auth.service.JwtTokenProvider;
import java.security.SecureRandom;
import java.util.Base64;

public class JwtTokenProviderFixture {

    private static final long THIRTY_MINUTE = 1800000L;

    public static JwtTokenProvider JWT_TOKEN_PROVIDER_WITH_INVALID_KEY() {
        return new JwtTokenProvider(createInvalidJwtSecretKey(), PROPERTIES());
    }

    public static JwtTokenProvider JWT_TOKEN_PROVIDER_WITH_INVALID_EXPIRED_TIME() {
        return new JwtTokenProvider(createJwtSecretKey(), PROPERTIES_WITH_SHORT_EXPIRED_MILLIS());
    }

    private static String createJwtSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[32];
        secureRandom.nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }

    private static String createInvalidJwtSecretKey() {
        return "A".repeat(32);
    }

    private static JwtTokenProperties PROPERTIES_WITH_SHORT_EXPIRED_MILLIS() {
        return new JwtTokenProperties(1L, 1L);
    }

    private static JwtTokenProperties PROPERTIES() {
        return new JwtTokenProperties(THIRTY_MINUTE , THIRTY_MINUTE);
    }
}