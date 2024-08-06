package com.bang_ggood.auth.config;

import com.bang_ggood.auth.controller.CookieProvider;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import java.util.Arrays;

@Component
public class AuthPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private final AuthService authService;

    public AuthPrincipalArgumentResolver(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return User.class.isAssignableFrom(parameter.getParameterType())
                && parameter.hasParameterAnnotation(AuthPrincipal.class);
    }

    @Override
    public User resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        if (request.getCookies() == null) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_COOKIE_EMPTY);
        }

        String token = extractToken(request.getCookies());
        return authService.extractUser(token);
    }

    private String extractToken(Cookie[] cookies) {
        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(CookieProvider.TOKEN_COOKIE_NAME))
                .findAny()
                .map(Cookie::getValue)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.AUTHENTICATION_COOKIE_INVALID));
    }
}
