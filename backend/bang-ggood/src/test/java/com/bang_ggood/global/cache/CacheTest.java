package com.bang_ggood.global.cache;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.response.ArticlesResponses;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.article.service.ArticleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CacheTest {

    @MockBean
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        Article article = new Article("이름", "내용", "키워드", "요약", "썸네일");
        Mockito.when(articleRepository.findLatestArticles())
                .thenReturn(List.of(article));
    }

    @DisplayName("캐시가 정상적으로 작동한다.")
    @Test
    void cacheTest() {
        ArticlesResponses firstCallArticles = articleService.readArticles();
        ArticlesResponses secondCallArticles = articleService.readArticles();

        Mockito.verify(articleRepository, Mockito.times(1)).findLatestArticles();

        assertThat(firstCallArticles).isEqualTo(secondCallArticles);
    }
}


