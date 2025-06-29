package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.ChecklistImage;

public record ChecklistImageResponse(Long imageId, String imageUrl) {
    public static ChecklistImageResponse from(ChecklistImage checklistImage) {
        return new ChecklistImageResponse(checklistImage.getId(), checklistImage.getImageUrl());
    }
}
