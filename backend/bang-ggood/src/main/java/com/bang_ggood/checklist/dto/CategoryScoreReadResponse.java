package com.bang_ggood.checklist.dto;

import com.bang_ggood.category.domain.Category;

public record CategoryScoreReadResponse(
        Integer categoryId, String categoryName, Integer score
) {

    public static CategoryScoreReadResponse of(Category category, int score) {
        return new CategoryScoreReadResponse(category.getId(), category.getDescription(), score);
    }
}
