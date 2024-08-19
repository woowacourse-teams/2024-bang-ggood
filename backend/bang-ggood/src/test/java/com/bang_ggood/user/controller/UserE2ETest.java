package com.bang_ggood.user.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.dto.UserResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class UserE2ETest extends AcceptanceTest {

    @DisplayName("유저 정보 조회 성공")
    @Test
    void readUserInfo() {
        UserResponse response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().get("/user/me")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(UserResponse.class);

        assertAll(
                () -> assertThat(response.id()).isEqualTo(UserFixture.USER1.getId()),
                () -> assertThat(response.name()).isEqualTo(UserFixture.USER1.getName()),
                () -> assertThat(response.email()).isEqualTo(UserFixture.USER1.getEmail())
        );
    }
}
