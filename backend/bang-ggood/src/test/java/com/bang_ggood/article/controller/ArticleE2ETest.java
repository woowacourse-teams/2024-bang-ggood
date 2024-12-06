package com.bang_ggood.article.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.article.ArticleFixture;
import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.exception.dto.ExceptionResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class ArticleE2ETest extends AcceptanceTest {

    @Autowired
    ArticleRepository articleRepository;

    @DisplayName("아티클 생성 성공")
    @Test
    void createArticle() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.adminHeaders)
                .body(ArticleFixture.ARTICLE_CREATE_REQUEST())
                .when().post("/articles")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("아티클 생성 실패: 유저가 아닌 경우")
    @Test
    void createArticle_notUser_exception() {
        ExceptionResponse response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(ArticleFixture.ARTICLE_CREATE_REQUEST())
                .when().post("/articles")
                .then().log().all()
                .statusCode(401)
                .extract()
                .as(ExceptionResponse.class);

        assertThat(response.message()).isEqualTo(ExceptionCode.AUTHENTICATION_TOKEN_EMPTY.getMessage());
    }

    @DisplayName("아티클 생성 실패: 제목이 비어있는 경우")
    @Test
    void createArticle_titleBlank_exception() {
        ArticleCreateRequest request = new ArticleCreateRequest("", "내용", "키워드", "요약", "썸네일");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.adminHeaders)
                .body(request)
                .when().post("/articles")
                .then().log().all()
                .statusCode(400);
    }

    @DisplayName("아티클 조회 성공")
    @Test
    void readArticle() {
        Article article = articleRepository.save(ArticleFixture.ARTICLE());
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles/" + article.getId())
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
    void readArticlesListView() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("아티클 삭제 성공")
    @Test
    void deleteArticle() {
        Article article = articleRepository.save(ArticleFixture.ARTICLE());
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.adminHeaders)
                .when().delete("/articles/" + article.getId())
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("아티클 삭제 실패: 유저가 아닌 경우")
    @Test
    void deleteArticle_notUser_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().delete("/articles/" + ArticleFixture.ARTICLE().getId())
                .then().log().all()
                .statusCode(401);
    }
}
