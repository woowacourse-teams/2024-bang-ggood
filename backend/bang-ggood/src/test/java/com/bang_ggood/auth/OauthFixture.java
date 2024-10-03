package com.bang_ggood.auth;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.service.oauth.OauthRequestProperties;
import java.util.List;

public class OauthFixture {

    public static final OauthLoginRequest OAUTH_LOGIN_REQUEST = new OauthLoginRequest("testCode", List.of("localhost:3000"));
    public static final OauthRequestProperties OAUTH_REQUEST_PROPERTIES() {
        String registerdRedirectUri = REGISTERD_REDIRECT_URI;
        String tokenPostUri = "testTokenPostUri";
        String userInfoRequestUri = "testUserInfoRequestUri";
        String grantType = "testGrantType";
        String clientId = "testClientId";
        String clientSecret = "testClientSecret";

        return new OauthRequestProperties(
                tokenPostUri, userInfoRequestUri,
                grantType, clientId,
                registerdRedirectUri, clientSecret);
    }
    public static final String REGISTERD_REDIRECT_URI = "testRegisterdRedirectUri";
    public static final String INVALID_REGISTERD_REDIRECT_URI = "localhost:8081";
}
