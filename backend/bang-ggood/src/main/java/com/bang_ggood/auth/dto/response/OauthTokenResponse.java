package com.bang_ggood.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OauthTokenResponse(String token_type, String access_token,
                                 String expires_in, String refresh_token,
                                 String refresh_token_expires_in, String scope) {
}
