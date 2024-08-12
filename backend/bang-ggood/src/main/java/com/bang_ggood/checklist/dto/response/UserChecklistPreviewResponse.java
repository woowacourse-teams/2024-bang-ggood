package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import java.time.LocalDateTime;

public record UserChecklistPreviewResponse(
        Long checklistId, String roomName, String address,
        Integer deposit, Integer rent, LocalDateTime createdAt,
        String summary, boolean isLiked) {

    public static UserChecklistPreviewResponse of(Checklist checklist, boolean isLiked) {
        return new UserChecklistPreviewResponse(
                checklist.getId(),
                checklist.getRoomName(),
                checklist.getRoomAddress(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getCreatedAt(),
                checklist.getSummary(),
                isLiked);
    }
}
