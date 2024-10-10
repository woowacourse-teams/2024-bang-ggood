package com.bang_ggood.auth;

import com.bang_ggood.auth.dto.request.LocalLoginRequestV1;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.service.oauth.OauthRequestProperties;

public class AuthFixture {

    public static final LocalLoginRequestV1 LOCAL_LOGIN_REQUEST = new LocalLoginRequestV1(
            "bang-ggood@gmail.com",
            "bang-ggood"
    );

    public static final LocalLoginRequestV1 LOCAL_LOGIN_REQUEST_NO_EMAIL = new LocalLoginRequestV1(
            null,
            "bang-ggood"
    );

    public static final LocalLoginRequestV1 LOCAL_LOGIN_REQUEST_NO_PASSWORD = new LocalLoginRequestV1(
            "bang-ggood@gmail.com",
            null
    );

    public static final LocalLoginRequestV1 LOCAL_LOGIN_REQUEST_INVALID_EMAIL = new LocalLoginRequestV1(
            "bang-bad@gmail.com",
            "bang-ggood"
    );

    public static final LocalLoginRequestV1 LOCAL_LOGIN_REQUEST_INVALID_PASSWORD = new LocalLoginRequestV1(
            "bang-ggood@gmail.com",
            "bang-bad"
    );

    public static final OauthLoginRequest OAUTH_LOGIN_REQUEST = new OauthLoginRequest("testCode", "localhost:3000");
    public static final String REGISTERED_REDIRECT_URIS = "localhost:3000, localhost:3001";
    public static final String INVALID_REGISTERED_REDIRECT_URI = "localhost:8081";

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
}
