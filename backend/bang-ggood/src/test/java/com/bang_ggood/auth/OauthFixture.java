package com.bang_ggood.auth;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.service.oauth.OauthRequestProperties;

public class OauthFixture {

    public static final OauthLoginRequest OAUTH_LOGIN_REQUEST = new OauthLoginRequest("testCode", "localhost:3000");
    public static final OauthRequestProperties OAUTH_REQUEST_PROPERTIES() {
        String tokenPostUri = "testTokenPostUri";
        String userInfoRequestUri = "testUserInfoRequestUri";
        String grantType = "testGrantType";
        String clientId = "testClientId";
        String clientSecret = "testClientSecret";

        return new OauthRequestProperties(
                tokenPostUri, userInfoRequestUri,
                grantType, clientId,
                REGISTERED_REDIRECT_URIS, clientSecret);
    }
    public static final String REGISTERED_REDIRECT_URIS = "localhost:3000, localhost:3001";
    public static final String INVALID_REGISTERED_REDIRECT_URI = "localhost:8081";
}
