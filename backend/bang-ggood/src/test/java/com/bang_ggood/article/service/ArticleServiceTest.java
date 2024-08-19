package com.bang_ggood.article.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class ArticleServiceTest extends IntegrationTestSupport {

    @Autowired
    ArticleService articleService;
    @Autowired
    ArticleRepository articleRepository;

    @DisplayName("아티클 조회 성공")
    @Test
    void readArticle() {
        // given
        Article article = new Article("제목", "내용");
        articleRepository.save(article);

        // when & then
        assertThatCode(() -> articleService.readArticle(article.getId()))
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
}
