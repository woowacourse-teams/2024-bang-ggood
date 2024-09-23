package com.bang_ggood.article.dto.response;

import com.bang_ggood.article.domain.Article;

public record ArticleCardViewResponse(Long articleId, String title, String keyword, String thumbnail) {

    public static ArticleCardViewResponse from(Article article) {
        return new ArticleCardViewResponse(
                article.getId(),
                article.getTitle(),
                article.getKeyword(),
                article.getThumbnail()
        );
    }
}
