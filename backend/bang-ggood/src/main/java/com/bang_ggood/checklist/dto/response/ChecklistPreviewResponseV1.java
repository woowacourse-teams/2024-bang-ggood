package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import java.time.LocalDateTime;

public record ChecklistPreviewResponseV1(
        Long checklistId, String roomName, String address, String buildingName,
        SubwayStationResponse station, Integer walkingTime,
        Integer deposit, Integer rent, LocalDateTime createdAt,
        String summary, boolean isLiked) {

    public static ChecklistPreviewResponseV1 of(Checklist checklist, SubwayStationResponse station, boolean isLiked) {
        return new ChecklistPreviewResponseV1(
                checklist.getId(),
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
