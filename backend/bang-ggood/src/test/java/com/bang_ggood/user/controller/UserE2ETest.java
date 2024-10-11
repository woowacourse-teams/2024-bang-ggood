package com.bang_ggood.user.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.dto.UserResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class UserE2ETest extends AcceptanceTest {

    @DisplayName("유저 정보 조회 성공")
    @Test
    void readUserInfo() {
        User user = this.getAuthenticatedUser();
        UserResponse response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/user/me")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(UserResponse.class);

        assertAll(
                () -> assertThat(response.userId()).isEqualTo(user.getId()),
                () -> assertThat(response.userName()).isEqualTo(user.getName()),
                () -> assertThat(response.userEmail()).isEqualTo(user.getEmail())
        );
    }
}
