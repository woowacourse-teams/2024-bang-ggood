package com.bang_ggood.auth.dto.response;

import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OauthInfoApiResponse(String id, String connected_at, KakaoAccountResponse kakao_account) {

    public User toUserEntity() {
        return new User(kakao_account.profile().nickname(), kakao_account.email(), null, UserType.USER, LoginType.KAKAO);
    }
}
