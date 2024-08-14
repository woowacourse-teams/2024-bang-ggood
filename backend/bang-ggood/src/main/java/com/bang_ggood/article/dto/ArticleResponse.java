package com.bang_ggood.article.dto;

import com.bang_ggood.article.domain.Article;

public record ArticleResponse(Long id, String title, String content) {

    public static ArticleResponse from(Article article) {
        return new ArticleResponse(article.getId(), article.getTitle(), article.getContent());
    }
}
