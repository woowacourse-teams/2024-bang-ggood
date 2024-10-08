package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import java.time.LocalDateTime;

public record ChecklistPreviewResponse(
        Long checklistId, String roomName, String address, String buildingName,
        String station, Integer walkingTime,
        Integer deposit, Integer rent, LocalDateTime createdAt,
        String summary, boolean isLiked) {

    public static ChecklistPreviewResponse of(Checklist checklist, boolean isLiked) {
        return new ChecklistPreviewResponse(
                checklist.getId(),
                checklist.getRoomName(),
                checklist.getRoomAddress(),
                checklist.getRoomBuildingName(),
                checklist.getRoomStation(),
                checklist.getRoomWalkingTime(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getCreatedAt(),
                checklist.getSummary(),
                isLiked);
    }
}
