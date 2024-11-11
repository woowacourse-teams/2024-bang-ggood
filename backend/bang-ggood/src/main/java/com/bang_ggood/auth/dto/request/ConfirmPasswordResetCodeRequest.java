package com.bang_ggood.auth.dto.request;

import jakarta.validation.constraints.Email;

public record ConfirmPasswordResetCodeRequest(@Email(message = "유효하지 않은 이메일 형식입니다.") String email,
                                              String code) {
}
