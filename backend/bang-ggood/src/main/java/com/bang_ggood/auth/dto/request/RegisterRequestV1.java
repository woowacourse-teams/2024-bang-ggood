package com.bang_ggood.auth.dto.request;

import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequestV1(@NotBlank(message = "이름이 존재하지 않습니다.") String name,
                                @NotBlank(message = "이메일이 존재하지 않습니다.") String email,
                                @NotBlank(message = "비밀번호가 존재하지 않습니다.") String password) {

    public User toUserEntity() {
        return new User(name(), email(), password(), UserType.USER, LoginType.LOCAL);
    }
}
