package com.bang_ggood.user.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.user.dto.request.OauthLoginRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class UserE2ETest extends AcceptanceTest {

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
}
