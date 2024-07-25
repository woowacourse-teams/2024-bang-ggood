package com.bang_ggood.checklist.dto;

import com.bang_ggood.checklist.domain.Checklist;
import java.time.LocalDateTime;
import java.util.List;

public record UserChecklistPreviewResponse(
        Long checklistId, String roomName, String address,
        Integer deposit, Integer rent, LocalDateTime createdAt,
        List<BadgeResponse> badge) {

    public static UserChecklistPreviewResponse of(Checklist checklist, List<BadgeResponse> badges) {
        return new UserChecklistPreviewResponse(
                checklist.getId(),
                checklist.getRoomName(),
                checklist.getRoomAddress(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getCreatedAt(),
                badges);
    }
}
