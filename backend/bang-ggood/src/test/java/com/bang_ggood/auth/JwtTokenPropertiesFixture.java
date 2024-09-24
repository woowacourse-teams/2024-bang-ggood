package com.bang_ggood.auth;

import com.bang_ggood.auth.service.JwtTokenProperties;

public class JwtTokenPropertiesFixture {

    public static JwtTokenProperties PROPERTIES_WITH_SHORT_EXPIRED_MILLIS() {
        return new JwtTokenProperties(1L, 1L);
    }

    public static JwtTokenProperties PROPERTIES() {
        return new JwtTokenProperties(1800000L, 1800000L); // 30분
    }
}
