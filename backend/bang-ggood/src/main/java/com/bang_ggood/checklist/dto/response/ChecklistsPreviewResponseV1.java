package com.bang_ggood.checklist.dto.response;

import java.util.List;

public record ChecklistsPreviewResponseV1(List<ChecklistPreviewResponseV1> checklists) {

    public static ChecklistsPreviewResponseV1 from(List<ChecklistPreviewResponseV1> checklists) {
        return new ChecklistsPreviewResponseV1(checklists);
    }
}
