package com.bang_ggood.checklist.dto.response;

import java.util.List;

public record ChecklistsPreviewResponse(List<ChecklistPreviewResponse> checklists) {

    public static ChecklistsPreviewResponse from(List<ChecklistPreviewResponse> checklists) {
        return new ChecklistsPreviewResponse(checklists);
    }
}
