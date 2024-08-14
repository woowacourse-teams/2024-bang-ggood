package com.bang_ggood.article.dto;

import com.bang_ggood.article.domain.Article;

public record ArticleBriefResponse(Long id, String title) {

    public static ArticleBriefResponse from(Article article) {
        return new ArticleBriefResponse(article.getId(), article.getTitle());
    }
}
