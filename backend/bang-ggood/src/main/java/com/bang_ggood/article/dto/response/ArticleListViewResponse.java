package com.bang_ggood.article.dto.response;

import com.bang_ggood.article.domain.Article;
import java.time.LocalDateTime;

public record ArticleListViewResponse(Long articleId, String title, String keyword, String summary, String thumbnail,
                                      LocalDateTime createdAt) {

    public static ArticleListViewResponse from(Article article) {
        return new ArticleListViewResponse(
                article.getId(),
                article.getTitle(),
                article.getKeyword(),
                article.getSummary(),
                article.getThumbnail(),
                article.getCreatedAt()
        );
    }
}
