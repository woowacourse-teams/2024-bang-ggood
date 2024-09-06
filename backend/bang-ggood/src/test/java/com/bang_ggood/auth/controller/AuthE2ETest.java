package com.bang_ggood.auth.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.UserFixture;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import static org.hamcrest.Matchers.containsString;

class AuthE2ETest extends AcceptanceTest {

    @Autowired
    private AuthService authService;

    @DisplayName("로그인 실패 : 인가코드가 없는 경우")
    @Test
    void login_code_notBlank_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(new OauthLoginRequest(""))
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
                .body("message", containsString(ExceptionCode.AUTHENTICATION_COOKIE_EMPTY.getMessage()));
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
                .body("message", containsString(ExceptionCode.AUTHENTICATION_COOKIE_INVALID.getMessage()));
    }

    @DisplayName("인증 실패 : 블랙리스트에 들어간 토큰일 경우")
    @Test
    void authentication_token_blacklist_exception() {
        authService.logout(this.responseCookie.getName() + "="+ this.responseCookie.getValue(), UserFixture.USER1);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST)
                .when().post("/checklists")
                .then().log().all()
                .statusCode(401)
                .body("message", containsString(ExceptionCode.AUTHENTICATION_TOKEN_IN_BLACKLIST.getMessage()));
    }
}
