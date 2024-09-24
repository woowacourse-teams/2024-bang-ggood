package com.bang_ggood.auth.config;

import com.bang_ggood.user.domain.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    public static final String USER_PRINCIPAL_URL = "/test/user-principal";
    public static final String AUTH_PRINCIPAL_URL = "/test/auth-principal";

    @GetMapping(USER_PRINCIPAL_URL)
    public User testUserPrincipal(@UserPrincipal User user) {
        return user;
    }

    @GetMapping(AUTH_PRINCIPAL_URL)
    public User testAuthPrincipal(@AuthRequiredPrincipal User user) {
        return user;
    }
}
