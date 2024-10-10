package com.bang_ggood.global.config;

import com.bang_ggood.auth.config.AuthRequiredPrincipalArgumentResolver;
import com.bang_ggood.auth.config.UserPrincipalArgumentResolver;
import com.bang_ggood.auth.controller.CookieResolver;
import com.bang_ggood.auth.service.AuthService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final CookieResolver cookieResolver;
    private final AuthService authService;

    public WebMvcConfig(CookieResolver cookieResolver, AuthService authService) {
        this.cookieResolver = cookieResolver;
        this.authService = authService;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new AuthRequiredPrincipalArgumentResolver(cookieResolver, authService));
        resolvers.add(new UserPrincipalArgumentResolver(cookieResolver, authService));
    }
}
