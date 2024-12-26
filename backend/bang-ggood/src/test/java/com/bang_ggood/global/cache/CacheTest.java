package com.bang_ggood.global.cache;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.repository.ArticleRepository;
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
    private ArticleService articleService;

    private final Long cacheableArticleId = 1L;
    private Article article;

    @BeforeEach
    void setUp() {
        article = new Article("이름", "내용", "키워드", "요약", "썸네일");
        Mockito.when(articleRepository.getById(cacheableArticleId))
                .thenReturn(article);
    }

    @Disabled("캐싱을 이용할 경우 증가된 조회수도 불러올 수 없는 문제가 있습니다" +
            "[아티클 내용]과 [아티클 조회수]를 도메인 분리하면 캐싱 가능한데" +
            "어느 정도 효과가 있을 지는 의문이 있어 우선 캐시 제거했습니다")
    @DisplayName("캐시가 정상적으로 작동한다.")
    @Test
    void cacheTest() {
        ArticleResponse firstCallArticle = articleService.readArticle(cacheableArticleId);
        ArticleResponse secondCallArticle = articleService.readArticle(cacheableArticleId);

        Mockito.verify(articleRepository, Mockito.times(1)).getById(cacheableArticleId);

        assertThat(firstCallArticle).isEqualTo(secondCallArticle);
    }
}


