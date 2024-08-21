package com.bang_ggood.article.dto.request;

import com.bang_ggood.article.domain.Article;
import jakarta.validation.constraints.NotBlank;

public record ArticleCreateRequest(@NotBlank(message = "제목을 입력해야 합니다.") String title, String content, String keyword,
                                   String summary) {

    public Article toEntity() {
        return new Article(title, content, keyword, summary);
    }
}
