package com.bang_ggood.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(@Email(message = "유효하지 않은 이메일 형식입니다.") String email,
                                   @NotBlank(message = "인증 코드가 비어있습니다.") String code,
                                   @NotBlank(message = "새로운 비밀번호가 비어있습니다.") String newPassword) {
}
