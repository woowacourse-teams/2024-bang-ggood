package com.bang_ggood.article.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.exception.dto.ExceptionResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import static com.bang_ggood.article.ArticleFixture.ARTICLE;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_CREATE_REQUEST;
import static org.assertj.core.api.Assertions.assertThat;

public class ArticleE2ETest extends AcceptanceTest {

    @Autowired
    ArticleRepository articleRepository;

    @BeforeEach
    void saveArticle() {
        articleRepository.save(ARTICLE);
    }

    @DisplayName("아티클 생성 성공")
    @Test
    void createArticle() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ARTICLE_CREATE_REQUEST)
                .when().post("/articles")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("아티클 생성 실패: 유저가 아닌 경우")
    @Test
    void createArticle_notUser_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(ARTICLE_CREATE_REQUEST)
                .when().post("/articles")
                .then().log().all()
                .statusCode(401);
    }

    @DisplayName("아티클 조회 성공")
    @Test
    void readArticle() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles/" + ARTICLE.getId())
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("아티클 조회 실패 : 유효하지 않은 아이디인 경우")
    @Test
    void readArticle_invalidId_exception() {
        long articleId = Long.MAX_VALUE;

        ExceptionResponse response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles/" + articleId)
                .then().log().all()
                .statusCode(400)
                .extract()
                .as(ExceptionResponse.class);

        assertThat(response.message()).isEqualTo(ExceptionCode.ARTICLE_NOT_FOUND.getMessage());
    }

    @DisplayName("아티클 목록 조회 성공")
    @Test
    void readArticles() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("최신 아티클 조회 성공")
    @Test
    void readLatestArticles() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles/latest")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("아티클 삭제 성공")
    @Test
    void deleteArticle() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().delete("/articles/" + ARTICLE.getId())
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("아티클 삭제 실패: 유저가 아닌 경우")
    @Test
    void deleteArticle_notUser_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().delete("/articles/" + ARTICLE.getId())
                .then().log().all()
                .statusCode(401);
    }
}
