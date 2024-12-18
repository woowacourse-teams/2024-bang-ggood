package com.bang_ggood.article.dto.response;

import com.bang_ggood.article.domain.Article;
import java.time.LocalDateTime;

public record ArticleResponse(Long articleId, String title, String content, String keyword, String summary,
                              String thumbnail, LocalDateTime createdAt, Long viewCount) {

    public static ArticleResponse from(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getKeyword(),
                article.getSummary(),
                article.getThumbnail(),
                article.getCreatedAt(),
                article.getViewCount()
        );
    }
}
