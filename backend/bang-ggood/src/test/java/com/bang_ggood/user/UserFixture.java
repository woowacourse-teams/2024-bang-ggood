package com.bang_ggood.user;

import com.bang_ggood.auth.dto.response.KakaoAccountResponse;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.auth.dto.response.ProfileResponse;
import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;

public class UserFixture {

    public static User USER1;

    public static User USER1() {
        return new User("방방이", "bang-bang01@gmail.com", "password1234", UserType.USER, LoginType.LOCAL);
    }

    public static User USER2() {
        return new User("빵빵이", "bbang-bbang@gmail.com", "password1234", UserType.USER, LoginType.LOCAL);
    }

    public static User GUEST_USER1() {
        return new User("빵빵이", "bbang-bbang1@gmail.com", UserType.GUEST, LoginType.LOCAL);
    }

    public static User GUEST_USER2() {
        return new User("빵빵이", "bbang-bbang2@gmail.com", UserType.GUEST, LoginType.LOCAL);
    }

    public static User ADMIN_USER1() {
        return new User("어드민방방이", "admin-bang-bang1@gmail.com", UserType.ADMIN, LoginType.LOCAL);
    }

    public static User USER1_WITH_ID() {
        return new User(1L, "방방이", "bang-bang@gmail.com");
    }

    public static User USER2_WITH_ID() {
        return new User(2L, "빵빵이", "bbang-bbang@gmail.com");
    }

    public static OauthInfoApiResponse OAUTH_INFO_RESPONSE_USER1() {
        return new OauthInfoApiResponse("", "",
                new KakaoAccountResponse(USER1().getEmail().getValue(), USER1().getName(),
                        new ProfileResponse("", "", "")));
    }

    public static OauthInfoApiResponse OAUTH_INFO_RESPONSE_USER2() {
        return new OauthInfoApiResponse("", "",
                new KakaoAccountResponse(USER2().getEmail().getValue(), USER2().getName(),
                        new ProfileResponse("", "", "")));
    }

    public static void init(UserRepository userRepository) {
        USER1 = userRepository.save(new User("방방이", "bang-bang@gmail.com", UserType.USER, LoginType.LOCAL));
    }
}
