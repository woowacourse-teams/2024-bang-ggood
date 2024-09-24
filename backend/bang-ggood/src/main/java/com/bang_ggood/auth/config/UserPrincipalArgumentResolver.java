package com.bang_ggood.auth.config;

import com.bang_ggood.auth.controller.CookieResolver;
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
public class UserPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private final CookieResolver cookieResolver;
    private final AuthService authService;

    public UserPrincipalArgumentResolver(CookieResolver cookieResolver, AuthService authService) {
        this.cookieResolver = cookieResolver;
        this.authService = authService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return User.class.isAssignableFrom(parameter.getParameterType())
                && parameter.hasParameterAnnotation(UserPrincipal.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        if (request.getCookies() == null) {
            return authService.assignGuestUser();
        }

        String token = cookieResolver.extractAccessToken(request.getCookies());
        return authService.getAuthUser(token);
    }
}
