package com.bang_ggood.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record KakaoAccountResponse(String email, String name, ProfileResponse profile) {
}
