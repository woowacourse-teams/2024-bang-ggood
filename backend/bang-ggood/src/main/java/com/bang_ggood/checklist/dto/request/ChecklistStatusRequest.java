package com.bang_ggood.checklist.dto.request;

import com.bang_ggood.checklist.domain.Status;

public record ChecklistStatusRequest(String status) {

    public Status getChecklistStatus() {
        return Status.from(status);
    }
}
