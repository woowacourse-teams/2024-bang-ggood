package com.bang_ggood.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record OauthLoginRequest(@NotBlank(message = "인가 코드가 존재하지 않습니다.") String code,
                                @NotEmpty(message = "Redirect Uri이 존재하지 않습니다.") List<String> redirectUris) {
}
