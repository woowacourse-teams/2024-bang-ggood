package com.bang_ggood.auth.config;

import com.bang_ggood.auth.controller.cookie.CookieResolver;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.user.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class AuthRequiredPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private final CookieResolver cookieResolver;
    private final AuthService authService;

    public AuthRequiredPrincipalArgumentResolver(CookieResolver cookieResolver, AuthService authService) {
        this.cookieResolver = cookieResolver;
        this.authService = authService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return User.class.isAssignableFrom(parameter.getParameterType())
                && parameter.hasParameterAnnotation(AuthRequiredPrincipal.class);
    }

    @Override
    public User resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        cookieResolver.checkLoginRequired(request);
        String token = cookieResolver.extractAccessToken(request.getCookies());
        return authService.getAuthUser(token);
    }
}
