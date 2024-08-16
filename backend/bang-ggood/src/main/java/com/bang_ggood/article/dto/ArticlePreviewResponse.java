package com.bang_ggood.article.dto;

import com.bang_ggood.article.domain.Article;

public record ArticlePreviewResponse(Long id, String title) {

    public static ArticlePreviewResponse from(Article article) {
        return new ArticlePreviewResponse(article.getId(), article.getTitle());
    }
}
