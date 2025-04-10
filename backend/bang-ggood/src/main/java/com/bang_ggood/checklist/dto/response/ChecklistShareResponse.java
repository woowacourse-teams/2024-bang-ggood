package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.ChecklistShare;

public record ChecklistShareResponse(String shareUrl) {

    public static final String DOMAIN_URL = "https://bang-ggood.com/checklists/share/";

    public static ChecklistShareResponse from(ChecklistShare checklistShare) {
        return new ChecklistShareResponse(DOMAIN_URL + checklistShare.getToken());
    }
}
