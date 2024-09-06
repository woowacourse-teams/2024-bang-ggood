package com.bang_ggood.article.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.bang_ggood.article.ArticleFixture.ARTICLE;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_1;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_2;
import static com.bang_ggood.article.ArticleFixture.ARTICLE_3;
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
        articleRepository.save(ARTICLE);

        // when & then
        assertThatCode(() -> articleRepository.getById(ARTICLE.getId()))
                .doesNotThrowAnyException();
    }

    @DisplayName("아티클 조회 실패: 삭제된 경우")
    @Test
    void getById_deleted_exception() {
        // given
        articleRepository.save(ARTICLE);
        articleRepository.deleteById(ARTICLE.getId());

        // when & then
        assertThatThrownBy(() -> articleRepository.getById(ARTICLE.getId()))
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

    @DisplayName("아티클 목록 조회 성공")
    @Test
    void findAll() {
        // given
        articleRepository.save(ARTICLE_1);
        articleRepository.save(ARTICLE_2);

        // when & then
        assertThat(articleRepository.findAll()).containsExactly(ARTICLE_1, ARTICLE_2);
    }

    @DisplayName("아티클 목록 조회 성공: 삭제된 아티클 제외")
    @Test
    void findAll_exceptDeletedArticle() {
        // given
        articleRepository.save(ARTICLE_1);
        articleRepository.save(ARTICLE_2);
        articleRepository.save(ARTICLE_3);
        articleRepository.deleteById(ARTICLE_1.getId());

        // when & then
        assertThat(articleRepository.findAll()).containsExactly(ARTICLE_2, ARTICLE_3);
    }

    @DisplayName("아티클 목록 최신순 조회 성공")
    @Test
    void findLatest() {
        // given
        articleRepository.save(ARTICLE_1);
        articleRepository.save(ARTICLE_2);

        // when & then
        assertThat(articleRepository.findLatest(1)).containsExactly(ARTICLE_2);
    }

    @DisplayName("아티클 목록 최신순 조회 성공: 삭제된 아티클 제외")
    @Test
    void findLatest_exceptDeletedArticle() {
        // given
        articleRepository.save(ARTICLE_1);
        articleRepository.save(ARTICLE_2);
        articleRepository.save(ARTICLE_3);
        articleRepository.deleteById(ARTICLE_3.getId());

        // when & then
        assertThat(articleRepository.findLatest(2)).containsExactly(ARTICLE_2, ARTICLE_1);
    }
}
