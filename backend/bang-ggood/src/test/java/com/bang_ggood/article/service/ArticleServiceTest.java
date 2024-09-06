package com.bang_ggood.article.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.response.ArticlePreviewResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static com.bang_ggood.article.ArticleFixture.ARTICLE;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_1;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_2;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_3;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_4;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_CREATE_REQUEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class ArticleServiceTest extends IntegrationTestSupport {

    @Autowired
    ArticleService articleService;
    @Autowired
    ArticleRepository articleRepository;

    @DisplayName("아티클 생성 성공")
    @Test
    void createArticle() {
        // given
        ArticleCreateRequest request = ARTICLE_CREATE_REQUEST;

        // when
        Long articleId = articleService.createArticle(request);

        // then
        assertThat(articleRepository.getById(articleId).getTitle())
                .isEqualTo(ARTICLE_CREATE_REQUEST.title());
    }

    @DisplayName("아티클 조회 성공")
    @Test
    void readArticle() {
        // given
        articleRepository.save(ARTICLE);

        // when & then
        assertThatCode(() -> articleService.readArticle(ARTICLE.getId()))
                .doesNotThrowAnyException();
    }

    @DisplayName("아티클 조회 실패 : 유효하지 않은 아이디인 경우")
    @Test
    void readArticle_invalidId_exception() {
        // given
        long articleId = Long.MAX_VALUE;

        // when & then
        assertThatThrownBy(() -> articleService.readArticle(articleId))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ARTICLE_NOT_FOUND.getMessage());
    }

    @DisplayName("최신 아티클 3건 조회 성공")
    @Test
    void readLatestArticles() {
        // given
        articleRepository.save(ARTICLE_1);
        articleRepository.save(ARTICLE_2);
        articleRepository.save(ARTICLE_3);
        articleRepository.save(ARTICLE_4);

        // when
        List<String> articleTitles = articleService.readLatestArticles().articles().stream()
                .map(ArticlePreviewResponse::title)
                .toList();

        // then
        assertThat(articleTitles).containsExactly(ARTICLE_4.getTitle(), ARTICLE_3.getTitle(), ARTICLE_2.getTitle());
    }

    @DisplayName("아티클 삭제 성공")
    @Test
    void deleteArticle() {
        // given
        articleRepository.save(ARTICLE);

        // when
        articleService.deleteArticle(ARTICLE.getId());

        //then
        assertThatThrownBy(() -> articleService.readArticle(ARTICLE.getId()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ARTICLE_NOT_FOUND.getMessage());
    }
}
