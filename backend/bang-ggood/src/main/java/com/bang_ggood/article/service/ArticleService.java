package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.ArticleBriefResponse;
import com.bang_ggood.article.dto.ArticleResponse;
import com.bang_ggood.article.dto.ArticlesBriefResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public ArticleResponse readArticle(Long id) {
        Article article = articleRepository.getById(id);
        return ArticleResponse.from(article);
    }

    public ArticlesBriefResponse readArticles() {
        List<ArticleBriefResponse> articles = articleRepository.findAll().stream()
                .map(ArticleBriefResponse::from)
                .toList();
        return new ArticlesBriefResponse(articles);
    }
}
