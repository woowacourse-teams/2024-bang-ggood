package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.dto.response.ArticlesResponse;
import com.bang_ggood.article.dto.response.ArticlesResponses;
import com.bang_ggood.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static com.bang_ggood.global.config.cache.CacheName.ARTICLE;

@RequiredArgsConstructor
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Transactional
    public long createArticle(ArticleCreateRequest request) {
        Article article = request.toEntity();
        articleRepository.save(article);
        return article.getId();
    }

    @Cacheable(cacheNames = ARTICLE, key = "#id")
    @Transactional(readOnly = true)
    public ArticleResponse readArticle(Long id) {
        Article article = articleRepository.getById(id);
        return ArticleResponse.from(article);
    }

    @Transactional(readOnly = true)
    public ArticlesResponses readArticles() {
        List<ArticlesResponse> articles = articleRepository.findLatestArticles().stream()
                .map(ArticlesResponse::from)
                .toList();
        return new ArticlesResponses(articles);
    }

    @CacheEvict(cacheNames = ARTICLE, key = "#id")
    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
