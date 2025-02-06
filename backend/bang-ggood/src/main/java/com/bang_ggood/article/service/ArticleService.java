package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
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
    public long createArticle(Article article) {
        articleRepository.save(article);
        return article.getId();
    }

    @Cacheable(cacheNames = ARTICLE, key = "#id")
    @Transactional(readOnly = true)
    public Article readArticle(Long id) {
        return articleRepository.getById(id);
    }

    @Transactional(readOnly = true)
    public List<Article> readArticles() {
        return articleRepository.findLatestArticles();
    }

    @CachePut(cacheNames = ARTICLE, key = "#id")
    @Transactional
    public Article updateArticle(Long id, Article updateArticle) {
        Article article = articleRepository.getById(id);
        article.change(updateArticle);
        return article;
    }

    @CacheEvict(cacheNames = ARTICLE, key = "#id")
    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
