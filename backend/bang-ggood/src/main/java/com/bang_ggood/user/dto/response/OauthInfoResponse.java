package com.bang_ggood.user.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OauthInfoResponse(String id, String connected_at, KakaoAccountResponse kakao_account) {
}
