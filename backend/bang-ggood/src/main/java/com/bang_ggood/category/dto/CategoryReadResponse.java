package com.bang_ggood.category.dto;

import com.bang_ggood.category.domain.Category;

public record CategoryReadResponse(Integer categoryId, String categoryName) {

    public static CategoryReadResponse from(Category category) {
        return new CategoryReadResponse(category.getId(), category.getDescription());
    }
}
