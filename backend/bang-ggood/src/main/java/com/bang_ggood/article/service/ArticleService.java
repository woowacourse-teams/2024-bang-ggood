package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.response.ArticleDetailPreviewResponse;
import com.bang_ggood.article.dto.response.ArticlePreviewResponse;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.dto.response.ArticlesDetailPreviewResponse;
import com.bang_ggood.article.dto.response.ArticlesPreviewResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Transactional
    public Long createArticle(ArticleCreateRequest request) {
        Article article = request.toEntity();
        articleRepository.save(article);
        return article.getId();
    }

    public ArticleResponse readArticle(Long id) {
        Article article = articleRepository.getById(id);
        return ArticleResponse.from(article);
    }

    public ArticlesDetailPreviewResponse readArticles() {
        List<ArticleDetailPreviewResponse> articles = articleRepository.findAll().stream()
                .map(ArticleDetailPreviewResponse::from)
                .toList();
        return new ArticlesDetailPreviewResponse(articles);
    }

    public ArticlesPreviewResponse readLatestArticles() {
        List<ArticlePreviewResponse> articles = articleRepository.findLatestTop3().stream()
                .map(ArticlePreviewResponse::from)
                .toList();
        return new ArticlesPreviewResponse(articles);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
