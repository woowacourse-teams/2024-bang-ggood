package com.bang_ggood.user.service;

import jakarta.validation.constraints.NotNull;

public record AuthUser(@NotNull Long id) {

    public static AuthUser from(Long id) {
        return new AuthUser(id);
    }
}
