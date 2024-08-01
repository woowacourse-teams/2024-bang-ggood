package com.bang_ggood.user.controller;

import com.bang_ggood.user.dto.request.OauthLoginRequest;
import com.bang_ggood.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/oauth/login")
    public void login(OauthLoginRequest request) {
        userService.login(request);
    }
}
