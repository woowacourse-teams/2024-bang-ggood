package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.dto.response.ArticlesResponse;
import com.bang_ggood.article.dto.response.ArticlesResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ArticleManageService {

    private final ArticleService articleService;
    private final ArticleViewService articleViewService;

    @Transactional
    public Long createArticle(ArticleCreateRequest request) {
        Article article = request.toEntity();
        return articleService.createArticle(article);
    }

    @Transactional(readOnly = true)
    public ArticleResponse readArticle(Long id) {
        Article article = articleService.readArticle(id);
        articleViewService.increaseViewCount(id);
        return ArticleResponse.from(article);
    }

    @Transactional(readOnly = true)
    public ArticlesResponses readArticles() {
        List<ArticlesResponse> articles = articleService.readArticles().stream()
                .map(ArticlesResponse::from)
                .toList();
        return new ArticlesResponses(articles);
    }

    @Transactional
    public void deleteArticle(Long id) {
        articleService.deleteArticle(id);
    }
}
