package com.bang_ggood.auth.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.auth.dto.response.TokenExistResponse;
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

import static com.bang_ggood.auth.AuthFixture.LOCAL_LOGIN_REQUEST;
import static com.bang_ggood.auth.AuthFixture.LOCAL_LOGIN_REQUEST_NO_EMAIL;
import static com.bang_ggood.auth.AuthFixture.LOCAL_LOGIN_REQUEST_NO_PASSWORD;
import static com.bang_ggood.auth.AuthFixture.OAUTH_LOGIN_REQUEST;
import static org.hamcrest.Matchers.containsString;

class AuthE2ETest extends AcceptanceTest {

    @Autowired
    private AuthService authService;

    @DisplayName("로컬 로그인 성공")
    @Test
    void localLogin() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(LOCAL_LOGIN_REQUEST)
                .when().post("/v1/local-auth/login")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("로컬 로그인 실패: 이메일이 없는 경우")
    @Test
    void localLogin_noEmail_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(LOCAL_LOGIN_REQUEST_NO_EMAIL)
                .when().post("/v1/local-auth/login")
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("이메일이 존재하지 않습니다."));
    }

    @DisplayName("로컬 로그인 실패: 비밀번호가 없는 경우")
    @Test
    void localLogin_noPassword_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(LOCAL_LOGIN_REQUEST_NO_PASSWORD)
                .when().post("/v1/local-auth/login")
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("비밀번호가 존재하지 않습니다."));
    }

    @DisplayName("카카오 로그인 실패 : 인가코드가 없는 경우")
    @Test
    void login_code_notBlank_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(OAUTH_LOGIN_REQUEST)
                .when().post("/oauth/login")
                .then().log().all()
                .statusCode(400);
    }

    @DisplayName("회원 탈퇴 성공")
    @Test
    void withdraw() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().delete("v1/withdraw")
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("인증 실패 : 쿠키가 없는 경우")
    @Test
    void authentication_no_cookie_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, null))
                .when().post("/v1/checklists")
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
                .when().post("/v1/checklists")
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_TOKEN_EMPTY.getMessage()));
    }

    @DisplayName("토큰 존재여부 반환 성공 : 쿠키가 존재하지 않는 경우")
    @Test
    void checkTokenExist_returnFalse() {
        TokenExistResponse tokenExistResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/token-exist")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(TokenExistResponse.class);

        Assertions.assertThat(tokenExistResponse.isRefreshTokenExist()).isFalse();
    }

    @DisplayName("토큰 존재여부 반환 성공 : 액세스 토큰이 존재하고 리프레시 토큰이 존재하는 경우")
    @Test
    void checkTokenExist_AccessTokenExist_RefreshTokenExist() {
        TokenExistResponse tokenExistResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/token-exist")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(TokenExistResponse.class);

        Assertions.assertThat(tokenExistResponse.isAccessTokenExist()).isTrue();
        Assertions.assertThat(tokenExistResponse.isRefreshTokenExist()).isTrue();
    }
}
