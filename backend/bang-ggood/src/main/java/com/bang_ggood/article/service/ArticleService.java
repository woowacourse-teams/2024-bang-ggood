package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.response.ArticleListViewResponse;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.dto.response.ArticlesListViewResponse;
import com.bang_ggood.article.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ArticleService {

    private static final int MAX_ARTICLE_CARDS = 3;
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Transactional
    public long createArticle(ArticleCreateRequest request) {
        Article article = request.toEntity();
        articleRepository.save(article);
        return article.getId();
    }

    @Transactional(readOnly = true)
    public ArticleResponse readArticle(Long id) {
        Article article = articleRepository.getById(id);
        return ArticleResponse.from(article);
    }

    @Transactional(readOnly = true)
    public ArticlesListViewResponse readArticlesListView() {
        List<ArticleListViewResponse> articles = articleRepository.findLatestArticles().stream()
                .map(ArticleListViewResponse::from)
                .toList();
        return new ArticlesListViewResponse(articles);
    }

    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
