package com.bang_ggood.auth;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import java.util.List;

public class OauthFixture {

    public static final OauthLoginRequest OAUTH_LOGIN_REQUEST = new OauthLoginRequest("testCode", List.of("localhost:3000"));
}
