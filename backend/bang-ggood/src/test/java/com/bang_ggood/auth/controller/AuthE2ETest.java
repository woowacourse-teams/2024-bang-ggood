package com.bang_ggood.auth.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.auth.dto.response.RefreshTokenCheckResponse;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.global.exception.ExceptionCode;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import static com.bang_ggood.auth.OauthFixture.OAUTH_LOGIN_REQUEST;
import static org.hamcrest.Matchers.containsString;

class AuthE2ETest extends AcceptanceTest {

    @Autowired
    private AuthService authService;

    @DisplayName("로그인 실패 : 인가코드가 없는 경우")
    @Test
    void login_code_notBlank_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(OAUTH_LOGIN_REQUEST)
                .when().post("/oauth/login")
                .then().log().all()
                .statusCode(400);
    }

    @DisplayName("인증 실패 : 쿠키가 없는 경우")
    @Test
    void authentication_no_cookie_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, null))
                .when().post("/checklists")
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_TOKEN_EMPTY.getMessage()));
    }

    @DisplayName("인증 실패 : 쿠키가 잘못된 형태로 들어간 경우")
    @Test
    void authentication_invalid_cookie_exception() {
        String testToken = "token";
        String expectedCookie = "invalidToken=" + testToken + "; Path=/; HttpOnly";

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, expectedCookie))
                .when().post("/checklists")
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_TOKEN_EMPTY.getMessage()));
    }

    @DisplayName("리프레시 토큰 체크 성공 : 쿠키가 존재하지 않는 경우")
    @Test
    void checkRefreshToken_returnFalse() {
        RefreshTokenCheckResponse refreshTokenCheckResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/refreshToken-check")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(RefreshTokenCheckResponse.class);

        Assertions.assertThat(refreshTokenCheckResponse.isRefreshTokenExist()).isFalse();
    }

    @DisplayName("리프레시 토큰 체크 성공 : 리프레시 토큰이 존재하는 경우")
    @Test
    void checkRefreshToken_returnTrue() {
        RefreshTokenCheckResponse refreshTokenCheckResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/refreshToken-check")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(RefreshTokenCheckResponse.class);

        Assertions.assertThat(refreshTokenCheckResponse.isRefreshTokenExist()).isTrue();
    }
}
