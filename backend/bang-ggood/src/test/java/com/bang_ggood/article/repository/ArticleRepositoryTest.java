package com.bang_ggood.article.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.article.ArticleFixture;
import com.bang_ggood.article.domain.Article;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class ArticleRepositoryTest extends IntegrationTestSupport {

    @Autowired
    ArticleRepository articleRepository;

    @DisplayName("아티클 조회 성공")
    @Test
    void getById() {
        // given
        Article article = articleRepository.save(ArticleFixture.ARTICLE());

        // when & then
        assertThatCode(() -> articleRepository.getById(article.getId()))
                .doesNotThrowAnyException();
    }

    @DisplayName("아티클 조회 실패: 삭제된 경우")
    @Test
    void getById_deleted_exception() {
        // given
        Article article = articleRepository.save(ArticleFixture.ARTICLE());
        articleRepository.deleteById(article.getId());

        // when & then
        assertThatThrownBy(() -> articleRepository.getById(article.getId()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ARTICLE_NOT_FOUND.getMessage());
    }

    @DisplayName("아티클 조회 실패: 해당 id 아티클이 없는 경우")
    @Test
    void getById_notFound_exception() {
        // given & when & then
        assertThatThrownBy(() -> articleRepository.getById(Long.MAX_VALUE))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ARTICLE_NOT_FOUND.getMessage());
    }

    @DisplayName("아티클 목록 최신순 조회 성공")
    @Test
    void findLatestArticles() {
        // given
        Article article1 = articleRepository.save(ArticleFixture.ARTICLE_1());
        Article article2 = articleRepository.save(ArticleFixture.ARTICLE_2());

        // when & then
        assertThat(articleRepository.findLatestArticles()).containsExactly(article2, article1);
    }

    @DisplayName("아티클 목록 최신순 조회 성공: 삭제된 아티클 제외")
    @Test
    void findLatestArticles_exceptDeletedArticle() {
        // given
        Article article1 = articleRepository.save(ArticleFixture.ARTICLE_1());
        Article article2 = articleRepository.save(ArticleFixture.ARTICLE_2());
        Article article3 = articleRepository.save(ArticleFixture.ARTICLE_3());
        articleRepository.deleteById(ArticleFixture.ARTICLE_1().getId());

        // when & then
        assertThat(articleRepository.findLatestArticles()).containsExactly(article3, article2, article1);
    }
}
