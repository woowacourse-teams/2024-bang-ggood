package com.bang_ggood.article.dto.response;

import com.bang_ggood.article.domain.Article;

public record ArticlePreviewResponse(Long articleId, String title, String keyword) {

    public static ArticlePreviewResponse from(Article article) {
        return new ArticlePreviewResponse(
                article.getId(),
                article.getTitle(),
                article.getKeyword()
        );
    }
}
