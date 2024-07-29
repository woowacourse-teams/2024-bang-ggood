package com.bang_ggood.checklist.dto.response;

public record CategoryScoreReadResponse(
        Integer categoryId, String categoryName, Integer score
) {
}
