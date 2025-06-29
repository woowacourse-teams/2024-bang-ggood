package com.bang_ggood.checklist.dto.response;

import java.util.List;

public record ChecklistsPreviewResponseV2(List<ChecklistPreviewResponseV2> checklists) {

    public static ChecklistsPreviewResponseV2 from(List<ChecklistPreviewResponseV2> checklists) {
        return new ChecklistsPreviewResponseV2(checklists);
    }
}
