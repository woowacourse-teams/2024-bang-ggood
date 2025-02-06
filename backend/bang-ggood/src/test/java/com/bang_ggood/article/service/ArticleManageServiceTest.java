package com.bang_ggood.article.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.article.ArticleFixture;
import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.request.ArticleUpdateRequest;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.dto.response.ArticlesResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

public class ArticleManageServiceTest extends IntegrationTestSupport {

    @Autowired
    ArticleManageService articleManageService;

    @Autowired
    ArticleRepository articleRepository;

    @DisplayName("아티클 생성 성공")
    @Test
    void createArticle() {
        // given
        ArticleCreateRequest request = ArticleFixture.ARTICLE_CREATE_REQUEST();

        // when
        Long articleId = articleManageService.createArticle(request);

        // then
        assertThat(articleRepository.getById(articleId).getTitle())
                .isEqualTo(ArticleFixture.ARTICLE_CREATE_REQUEST().title());
    }

    @DisplayName("아티클 조회 성공")
    @Test
    void readArticle() {
        // given
        Article article = articleRepository.save(ArticleFixture.ARTICLE());

        // when & then
        assertThatCode(() -> articleManageService.readArticle(article.getId()))
                .doesNotThrowAnyException();
    }

    @DisplayName("아티클 조회 실패 : 유효하지 않은 아이디인 경우")
    @Test
    void readArticle_invalidId_exception() {
        // given
        long articleId = Long.MAX_VALUE;

        // when & then
        assertThatThrownBy(() -> articleManageService.readArticle(articleId))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ARTICLE_NOT_FOUND.getMessage());
    }

    @DisplayName("아티클 목록 최신순 조회 성공")
    @Test
    void readArticles() {
        // given
        Article article1 = articleRepository.save(ArticleFixture.ARTICLE_1());
        Article article2 = articleRepository.save(ArticleFixture.ARTICLE_2());
        Article article3 = articleRepository.save(ArticleFixture.ARTICLE_3());
        Article article4 = articleRepository.save(ArticleFixture.ARTICLE_4());

        // when
        List<String> articleTitles = articleManageService.readArticles().articles().stream()
                .map(ArticlesResponse::title)
                .toList();

        // then
        assertThat(articleTitles).containsExactly(article4.getTitle(), article3.getTitle(), article2.getTitle(),
                article1.getTitle());
    }

    @DisplayName("아티클 업데이트 성공")
    @Test
    void updateArticle() {
        // given
        Article article = articleRepository.save(ArticleFixture.ARTICLE_1());
        ArticleUpdateRequest updateArticle = ArticleFixture.ARTICLE_UPDATE_REQUEST();
        Long articleId = article.getId();

        // when
        articleManageService.updateArticle(articleId, updateArticle);

        // then
        Article updatedArticle = articleRepository.getById(articleId);
        assertAll(
                () -> assertThat(updatedArticle.getTitle()).isEqualTo(updateArticle.title()),
                () -> assertThat(updatedArticle.getContent()).isEqualTo(updateArticle.content()),
                () -> assertThat(updatedArticle.getKeyword()).isEqualTo(updateArticle.keyword()),
                () -> assertThat(updatedArticle.getSummary()).isEqualTo(updateArticle.summary()),
                () -> assertThat(updatedArticle.getThumbnail()).isEqualTo(updateArticle.thumbnail())
        );
    }

    @DisplayName("아티클 삭제 성공")
    @Test
    void deleteArticle() {
        // given
        Article article = articleRepository.save(ArticleFixture.ARTICLE());

        // when
        articleManageService.deleteArticle(article.getId());

        //then
        assertThatThrownBy(() -> articleManageService.readArticle(article.getId()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ARTICLE_NOT_FOUND.getMessage());
    }

    @DisplayName("아티클 조회 시 조회수 증가 성공")
    @Test
    void increaseViewCount() {
        // given
        Long articleId = articleRepository.save(ArticleFixture.ARTICLE()).getId();

        // when
        ArticleResponse article = articleManageService.readArticle(articleId);

        // then
        assertThat(article.viewCount()).isEqualTo(1);
    }
}
