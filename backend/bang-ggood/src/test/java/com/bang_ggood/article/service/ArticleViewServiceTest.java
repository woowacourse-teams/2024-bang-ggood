package com.bang_ggood.article.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.article.ArticleFixture;
import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import java.time.Instant;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;

@EnableScheduling
class ArticleViewServiceTest extends IntegrationTestSupport {

    @Autowired
    private ArticleManageService articleManageService;

    @Autowired
    private ArticleViewService articleViewService;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private TaskScheduler taskScheduler;

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

    @DisplayName("캐시된 조회수를 DB에 동기화 성공")
    @Test
    void syncViewCounts() throws ExecutionException, InterruptedException {
        // given
        Long articleId = articleRepository.save(ArticleFixture.ARTICLE()).getId();
        articleManageService.readArticle(articleId);
        articleManageService.readArticle(articleId);

        // when
        taskScheduler.schedule(
                () -> articleViewService.syncViewCounts(),
                Instant.parse("2025-01-01T00:00:00Z")
        ).get();

        // then
        Article article = articleRepository.getById(articleId);
        assertThat(article.getViewCount()).isEqualTo(2);
    }
}
