package com.bang_ggood.auth.config;

import com.bang_ggood.auth.controller.cookie.CookieResolver;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class AdminPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private final CookieResolver cookieResolver;
    private final AuthService authService;

    public AdminPrincipalArgumentResolver(CookieResolver cookieResolver, AuthService authService) {
        this.cookieResolver = cookieResolver;
        this.authService = authService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return User.class.isAssignableFrom(parameter.getParameterType())
                && parameter.hasParameterAnnotation(AdminPrincipal.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        cookieResolver.checkLoginRequired(request);

        String token = cookieResolver.extractAccessToken(request);

        User user = authService.getAuthUser(token);
        if (!user.matchesUserType(UserType.ADMIN)) {
            throw new BangggoodException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }
        return user;
    }
}
