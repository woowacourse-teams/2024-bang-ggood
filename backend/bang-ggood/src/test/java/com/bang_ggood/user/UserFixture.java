package com.bang_ggood.user;

import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.dto.response.KakaoAccountResponse;
import com.bang_ggood.user.dto.response.OauthInfoResponse;
import com.bang_ggood.user.dto.response.ProfileResponse;

public class UserFixture {

    public static final User USER1 = new User(1L, "방방이", "bang-bang@gmail.com");
    public static final User USER2 = new User(2L, "빵빵이", "bbang-bbang@gmail.com");
    public static final OauthInfoResponse OAUTH_INFO_RESPONSE_USER1 = new OauthInfoResponse("", "",
            new KakaoAccountResponse(USER1.getEmail(), USER1.getName(),
                    new ProfileResponse("", "", "")));

    public static final OauthInfoResponse OAUTH_INFO_RESPONSE_USER2 = new OauthInfoResponse("", "",
            new KakaoAccountResponse(USER2.getEmail(), USER2.getName(),
                    new ProfileResponse("", "", "")));

}
