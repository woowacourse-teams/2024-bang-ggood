package com.bang_ggood.auth.dto.response;

import com.bang_ggood.user.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OauthInfoResponse(String id, String connected_at, KakaoAccountResponse kakao_account) {

    public User toUserEntity() {
        return new User(kakao_account.name(), kakao_account.email());
    }
}
