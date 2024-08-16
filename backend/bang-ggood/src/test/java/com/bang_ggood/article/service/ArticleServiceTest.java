package com.bang_ggood.article.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.response.ArticlePreviewResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static com.bang_ggood.article.ArticleFixture.ARTICLE;
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
                .isEqualTo("제목");
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
        Article article1 = new Article("제목1", "내용1", "키워드1", "요약1");
        Article article2 = new Article("제목2", "내용2", "키워드2", "요약2");
        Article article3 = new Article("제목3", "내용3", "키워드3", "요약3");
        Article article4 = new Article("제목4", "내용4", "키워드4", "요약4");
        articleRepository.save(article1);
        articleRepository.save(article2);
        articleRepository.save(article3);
        articleRepository.save(article4);

        // when
        List<String> articleTitles = articleService.readLatestArticles().articles().stream()
                .map(ArticlePreviewResponse::title)
                .toList();

        // then
        assertThat(articleTitles).containsExactly("제목4", "제목3", "제목2");
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
