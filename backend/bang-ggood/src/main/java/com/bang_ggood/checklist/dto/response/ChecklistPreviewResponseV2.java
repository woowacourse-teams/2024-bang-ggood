package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import java.time.LocalDateTime;

public record ChecklistPreviewResponseV2(
        Long checklistId, String thumbnailImageUrl, String roomName, String address, String buildingName,
        SubwayStationResponse station, Integer walkingTime,
        Integer deposit, Integer rent, LocalDateTime createdAt,
        String summary, boolean isLiked) {

    public static ChecklistPreviewResponseV2 of(Checklist checklist, String thumbnailImageUrl, SubwayStationResponse station, boolean isLiked) {
        return new ChecklistPreviewResponseV2(
                checklist.getId(),
                thumbnailImageUrl,
                checklist.getRoomName(),
                checklist.getRoomAddress(),
                checklist.getRoomBuildingName(),
                station,
                checklist.getRoomWalkingTime(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getCreatedAt(),
                checklist.getSummary(),
                isLiked);
    }
}
