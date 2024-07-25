package com.bang_ggood.checklist.dto;

public record CategoryScoreReadResponse(
        Integer categoryId, String categoryName, Integer score
) {
}
