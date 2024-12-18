package com.bang_ggood.article.dto.response;

import com.bang_ggood.article.domain.Article;
import java.time.LocalDateTime;

public record ArticlesResponse(Long articleId, String title, String keyword, String summary,
                               LocalDateTime createdAt, Long viewCount) {

    public static ArticlesResponse from(Article article) {
        return new ArticlesResponse(
                article.getId(),
                article.getTitle(),
                article.getKeyword(),
                article.getSummary(),
                article.getCreatedAt(),
                article.getViewCount()
        );
    }
}
