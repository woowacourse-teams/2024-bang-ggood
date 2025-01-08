package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static com.bang_ggood.global.config.cache.CacheName.ARTICLE;

@RequiredArgsConstructor
@Service
public class ArticleViewService {

    private final CacheManager cacheManager;
    private final ArticleRepository articleRepository;
    private final Set<Long> cacheArticleIds = new HashSet<>();

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
            cacheArticleIds.add(id);
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void syncViewCounts() {
        Cache cache = cacheManager.getCache(ARTICLE);
        if (cache != null) {
            syncAllArticleViewCounts(cache);
            cache.clear();
        }
    }

    private void syncAllArticleViewCounts(Cache cache) {
        cacheArticleIds.stream()
                .map(id -> cache.get(id, Article.class))
                .filter(Objects::nonNull)
                .forEach(article -> articleRepository.updateViewCount(article.getId(), article.getViewCount()));
    }
}
