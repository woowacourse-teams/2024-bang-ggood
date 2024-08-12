package com.bang_ggood.article.dto;

import com.bang_ggood.article.domain.Article;

public record ArticleResponseDto(Long id, String title, String content) {

    public static ArticleResponseDto from(Article article) {
        return new ArticleResponseDto(article.getId(), article.getTitle(), article.getContent());
    }
}
