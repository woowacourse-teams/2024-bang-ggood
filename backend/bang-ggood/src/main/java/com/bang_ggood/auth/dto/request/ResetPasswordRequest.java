package com.bang_ggood.auth.dto.request;

public record ResetPasswordRequest(String email, String code, String newPassword) {
}
