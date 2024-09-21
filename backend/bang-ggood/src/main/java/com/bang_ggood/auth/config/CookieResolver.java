package com.bang_ggood.auth.config;

import com.bang_ggood.auth.controller.CookieProvider;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class CookieResolver {

    public String extractToken(Cookie[] cookies) {
        if (cookies == null) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_COOKIE_EMPTY);
        }

        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(CookieProvider.TOKEN_COOKIE_NAME))
                .findAny()
                .map(Cookie::getValue)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.AUTHENTICATION_COOKIE_TOKEN_EMPTY));
    }
}
