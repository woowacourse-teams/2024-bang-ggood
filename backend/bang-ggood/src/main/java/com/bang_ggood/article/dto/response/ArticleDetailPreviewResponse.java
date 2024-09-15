package com.bang_ggood.article.dto.response;

import com.bang_ggood.article.domain.Article;
import java.time.LocalDateTime;

public record ArticleDetailPreviewResponse(Long articleId, String title, String keyword, String summary, String thumbnail,
                                           LocalDateTime createdAt) {

    public static ArticleDetailPreviewResponse from(Article article) {
        return new ArticleDetailPreviewResponse(
                article.getId(),
                article.getTitle(),
                article.getKeyword(),
                article.getSummary(),
                article.getThumbnail(),
                article.getCreatedAt()
        );
    }
}
