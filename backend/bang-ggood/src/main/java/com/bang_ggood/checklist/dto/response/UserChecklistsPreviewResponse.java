package com.bang_ggood.checklist.dto.response;

import java.util.List;

public record UserChecklistsPreviewResponse(List<UserChecklistPreviewResponse> checklists) {

    public static UserChecklistsPreviewResponse from(List<UserChecklistPreviewResponse> checklists) {
        return new UserChecklistsPreviewResponse(checklists);
    }
}
