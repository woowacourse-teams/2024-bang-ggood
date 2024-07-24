package com.bang_ggood.checklist.dto;

import java.time.LocalDateTime;
import java.util.List;

public record UserChecklistPreviewResponse(
        Long checklistId, String roomName, String address,
        Integer deposit, Integer rent, LocalDateTime createdAt,
        List<BadgeResponse> badge) {
}
