package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.ChecklistShare;

public record ChecklistShareResponse(String token) {

    public static ChecklistShareResponse from(ChecklistShare checklistShare) {
        return new ChecklistShareResponse(checklistShare.getToken());
    }
}
