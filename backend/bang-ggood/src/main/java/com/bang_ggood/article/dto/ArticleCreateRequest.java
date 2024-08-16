package com.bang_ggood.article.dto;

import com.bang_ggood.article.domain.Article;
import jakarta.validation.constraints.NotBlank;

public record ArticleCreateRequest(@NotBlank(message = "제목을 입력해야 합니다.") String title, String content) {

    public Article toEntity() {
        return new Article(title, content);
    }
}
