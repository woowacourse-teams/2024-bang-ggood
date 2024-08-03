package com.bang_ggood.user.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AuthInfo(@NotNull Long id, @NotBlank String name, @NotBlank String email) {

    public static AuthInfo of(Long id, String name, String email) {
        return new AuthInfo(id, name, email);
    }
}
