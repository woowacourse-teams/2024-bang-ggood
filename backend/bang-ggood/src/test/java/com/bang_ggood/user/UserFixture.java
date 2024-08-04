package com.bang_ggood.user;

import com.bang_ggood.auth.dto.response.KakaoAccountResponse;
import com.bang_ggood.auth.dto.response.OauthInfoResponse;
import com.bang_ggood.auth.dto.response.ProfileResponse;
import com.bang_ggood.user.domain.User;

public class UserFixture {

    public static final User USER1 = new User("방방이", "bang-bang@gmail.com");
    public static final User USER2 = new User("빵빵이", "bbang-bbang@gmail.com");
    public static final OauthInfoResponse oauthInfoResponseUSER1 = new OauthInfoResponse("", "",
            new KakaoAccountResponse(USER1.getEmail(), USER1.getName(),
                    new ProfileResponse("", "","")));

    public static final OauthInfoResponse oauthInfoResponseUSER2 = new OauthInfoResponse("", "",
            new KakaoAccountResponse(USER2.getEmail(), USER2.getName(),
                    new ProfileResponse("", "","")));

}
