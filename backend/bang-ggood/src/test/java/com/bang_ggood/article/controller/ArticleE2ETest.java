package com.bang_ggood.article.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.ArticleCreateRequest;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.exception.dto.ExceptionResponse;
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
        ArticleCreateRequest request = new ArticleCreateRequest("제목1", "내용");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/articles")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("아티클 조회 성공")
    @Test
    void readArticle() {
        Article article = new Article("제목", "내용");
        articleRepository.save(article);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles/" + article.getId())
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("아티클 조회 실패 : 유효하지 않은 아이디인 경우")
    @Test
    void readArticle_invalidId_exception() {
        Article article = new Article("제목", "내용");
        articleRepository.save(article);

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
        Article article = new Article("제목", "내용");
        articleRepository.save(article);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/articles")
                .then().log().all()
                .statusCode(200);
    }
}
