package com.bang_ggood.user.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user/me")
    public ResponseEntity<UserResponse> readUserInfo(@AuthRequiredPrincipal User user) {
        return ResponseEntity.ok(UserResponse.from(user));
    }
}
