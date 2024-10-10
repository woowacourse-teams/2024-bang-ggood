package com.bang_ggood.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record LocalLoginRequestV1(@NotBlank(message = "이메일이 존재하지 않습니다.") String email,
                                  @NotBlank(message = "비밀번호가 존재하지 않습니다.") String password) {
}
