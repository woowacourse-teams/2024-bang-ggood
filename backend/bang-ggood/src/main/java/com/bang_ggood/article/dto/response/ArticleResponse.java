package com.bang_ggood.article.dto.response;

import com.bang_ggood.article.domain.Article;
import java.time.LocalDateTime;

public record ArticleResponse(Long articleId, String title, String content, String keyword, String summary, LocalDateTime createdAt) {

    public static ArticleResponse from(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getKeyword(),
                article.getSummary(),
                article.getCreatedAt()
        );
    }
}
