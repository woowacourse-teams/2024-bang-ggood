package com.bang_ggood.user;

import com.bang_ggood.auth.dto.response.KakaoAccountResponse;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.auth.dto.response.ProfileResponse;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;

public class UserFixture {

    public static User USER1() {
        return new User("방방이", "bang-bang@gmail.com", UserType.USER);
    }

    public static User USER2() {
        return new User("빵빵이", "bbang-bbang@gmail.com", UserType.USER);
    }

    public static User USER1_WITH_ID() {
        return new User(1L, "방방이", "bang-bang@gmail.com");
    }

    public static User USER2_WITH_ID() {
        return new User(2L, "빵빵이", "bbang-bbang@gmail.com");
    }

    public static OauthInfoApiResponse OAUTH_INFO_RESPONSE_USER1() {
        return new OauthInfoApiResponse("", "",
                new KakaoAccountResponse(USER1().getEmail(), USER1().getName(),
                        new ProfileResponse("", "", "")));
    }

    public static OauthInfoApiResponse OAUTH_INFO_RESPONSE_USER2() {
        return new OauthInfoApiResponse("", "",
                new KakaoAccountResponse(USER2().getEmail(), USER2().getName(),
                        new ProfileResponse("", "", "")));
    }
}
