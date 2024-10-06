package com.bang_ggood.auth.config;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.auth.controller.CookieProvider;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

import static org.hamcrest.Matchers.containsString;

class ArgumentResolverTest extends AcceptanceTest {

    @Autowired
    private CookieProvider cookieProvider;
    @Autowired
    private UserRepository userRepository;

    @DisplayName("@UserPrincipal 어노테이션 동작 성공 : 토큰값이 없으면 게스트 유저가 할당된다.")
    @Test
    void resolveUserPrincipalArgument_returnGuestUser() {
        // given & when
        userRepository.save(UserFixture.GUEST_USER());

        User user = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get(TestController.USER_PRINCIPAL_URL)
                .then().log().all()
                .statusCode(200)
                .extract().as(User.class);

        // then
        Assertions.assertThat(user.getUserType()).isEqualTo(UserType.GUEST);
    }

    @DisplayName("@UserPrincipal 어노테이션 동작 성공 : 토큰값이 있으면 인증된 유저를 할당한다.")
    @Test
    void resolveUserPrincipalArgument_returnUser() {
        // given & when
        User user = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get(TestController.USER_PRINCIPAL_URL)
                .then().log().all()
                .statusCode(200)
                .extract().as(User.class);

        // then
        Assertions.assertThat(user.getUserType()).isEqualTo(UserType.USER);
    }

    @DisplayName("@AuthPrincipal 어노테이션 동작 성공 : 쿠키값이 없으면 예외를 발생시킨다.")
    @Test
    void resolveAuthPrincipalArgument_throwException_whenCookieEmpty() {
        // given & when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get(TestController.AUTH_PRINCIPAL_URL)
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_TOKEN_EMPTY.getMessage()));
    }

    @DisplayName("@AuthPrincipal 어노테이션 동작 성공 : 토큰값이 없으면 예외를 발생시킨다.")
    @Test
    void resolveAuthPrincipalArgument_throwException_whenTokenEmpty() {
        // given & when & then
        ResponseCookie invalidResponseCookie = ResponseCookie.from("testKey", "testValue").build();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, invalidResponseCookie.toString()))
                .when().get(TestController.AUTH_PRINCIPAL_URL)
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_TOKEN_EMPTY.getMessage()));
    }

    @DisplayName("@AuthPrinciapl 어노테이션 동작 성공 : 액세스 토큰 존재 X, 리프레시 토큰 존재 O 일때 예외를 발생시킨다.")
    @Test
    void resolveAuthPrincipalArgument_throwException_whenAccessTokenEmpty() {
        // given & when & then
        ResponseCookie refreshTokenCookie = cookieProvider.createRefreshTokenCookie("testToken");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, refreshTokenCookie.toString()))
                .when().get(TestController.AUTH_PRINCIPAL_URL)
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_ACCESS_TOKEN_EMPTY.getMessage()));
    }

    @DisplayName("@AuthPrinciapl 어노테이션 동작 성공 : 액세스 토큰 존재 O, 리프레시 토큰 존재 X 일때 예외를 발생시킨다.")
    @Test
    void resolveAuthPrincipalArgument_throwException_whenRefreshTokenEmpty() {
        // given & when & then
        ResponseCookie accessTokenCookie = cookieProvider.createAccessTokenCookie("testToken");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, accessTokenCookie.toString()))
                .when().get(TestController.AUTH_PRINCIPAL_URL)
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_REFRESH_TOKEN_EMPTY.getMessage()));
    }
}
