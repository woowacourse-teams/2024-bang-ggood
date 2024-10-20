package com.bang_ggood.auth.dto.request;

public record ConfirmPasswordResetCodeRequest(String email, String code) {
}
