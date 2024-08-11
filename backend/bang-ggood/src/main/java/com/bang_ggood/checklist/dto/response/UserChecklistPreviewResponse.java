package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import java.time.LocalDateTime;

public record UserChecklistPreviewResponse(
        Long checklistId, String roomName, String address,
        Integer deposit, Integer rent, LocalDateTime createdAt) {

    public static UserChecklistPreviewResponse of(Checklist checklist) {
        return new UserChecklistPreviewResponse(
                checklist.getId(),
                checklist.getRoomName(),
                checklist.getRoomAddress(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getCreatedAt());
    }
}
