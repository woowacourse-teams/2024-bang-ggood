package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.response.ArticleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import static com.bang_ggood.global.config.cache.CacheName.ARTICLE;

@RequiredArgsConstructor
@Service
public class ArticleViewService {

    private final CacheManager cacheManager;

    public void increaseViewCount(long id) {
        Cache cache = cacheManager.getCache(ARTICLE);
        if (cache != null) {
            handleViewCount(id, cache);
        }
    }

    private void handleViewCount(long id, Cache cache) {
        Article article = cache.get(id, Article.class);
        if (article != null) {
            article.increaseViewCount();
            cache.put(id, article);
        }
    }
}
