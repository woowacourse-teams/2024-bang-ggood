package com.bang_ggood.article.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.article.ArticleFixture;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class ArticleViewServiceTest extends IntegrationTestSupport {

    @Autowired
    ArticleManageService articleManageService;

    @Autowired
    ArticleRepository articleRepository;

    @DisplayName("아티클 조회 시 조회수 증가 성공 : DB에서 조회하는 경우")
    @Test
    void increaseViewCount_Db() {
        // given
        Long articleId = articleRepository.save(ArticleFixture.ARTICLE()).getId();

        // when
        ArticleResponse article = articleManageService.readArticle(articleId);

        // then
        assertThat(article.viewCount()).isEqualTo(1);
    }

    @DisplayName("아티클 조회 시 조회수 증가 성공 : 캐시에서 조회하는 경우")
    @Test
    void increaseViewCount_Cache() {
        // given
        Long articleId = articleRepository.save(ArticleFixture.ARTICLE()).getId();

        // when
        articleManageService.readArticle(articleId);
        ArticleResponse article = articleManageService.readArticle(articleId);

        // then
        assertThat(article.viewCount()).isEqualTo(2);
    }


}
