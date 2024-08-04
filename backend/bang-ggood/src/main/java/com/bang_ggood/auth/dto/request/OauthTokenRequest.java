package com.bang_ggood.auth.dto.request;

public record OauthTokenRequest(String grantType, String clientId,
                                String redirectUri, String code, String clientSecret) {

    public static OauthTokenRequest of(String grantType, String clientId,
                                       String redirectUri, String code, String clientSecret) {
        return new OauthTokenRequest(grantType, clientId, redirectUri, code, clientSecret);
    }
}
