package com.bang_ggood.global.cache;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.article.service.ArticleManageService;
import com.bang_ggood.article.service.ArticleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CacheTest {

    @MockBean
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleManageService articleManageService;

    private final Long cacheableArticleId = 1L;

    @BeforeEach
    void setUp() {
        Article article = new Article("이름", "내용", "키워드", "요약", "썸네일");
        Mockito.when(articleRepository.getById(cacheableArticleId))
                .thenReturn(article);
    }

    @DisplayName("캐시가 정상적으로 작동한다.")
    @Test
    void cacheTest() {
        ArticleResponse firstCallArticle = articleManageService.readArticle(cacheableArticleId);
        ArticleResponse secondCallArticle = articleManageService.readArticle(cacheableArticleId);

        Mockito.verify(articleRepository, Mockito.times(1)).getById(cacheableArticleId);

        assertThat(firstCallArticle)
                .usingRecursiveComparison()
                .ignoringFields("viewCount") // viewCount 필드 제외
                .isEqualTo(secondCallArticle);
    }
}


