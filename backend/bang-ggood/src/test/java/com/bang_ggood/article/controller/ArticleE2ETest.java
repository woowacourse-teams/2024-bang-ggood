package com.bang_ggood.article.controller;

import com.bang_ggood.AcceptanceTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class ArticleE2ETest extends AcceptanceTest {

    @DisplayName("아티클 조회 성공")
    @Test
    void readArticle() {
        long articleId = 1L;

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles/" + articleId)
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("아티클 조회 실패 : 유효하지 않은 아이디인 경우")
    @Test
    void readArticle_invalidId_exception() {
        long articleId = Long.MAX_VALUE;

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles/" + articleId)
                .then().log().all()
                .statusCode(400);
    }
}
