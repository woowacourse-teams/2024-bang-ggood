package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import java.time.LocalDateTime;

public record ChecklistPreviewResponse(
        Long checklistId, String roomName, String address, String buildingName,
        SubwayStationResponse station, Integer walkingTime,
        Integer deposit, Integer rent, LocalDateTime createdAt,
        String summary, boolean isLiked) {

    public static ChecklistPreviewResponse of(Checklist checklist, SubwayStationResponse station, boolean isLiked) {
        return new ChecklistPreviewResponse(
                checklist.getId(),
                checklist.getName(),
                checklist.getBuildingAddress(),
                checklist.getBuildingName(),
                station,
                checklist.getBuildingWalkingTime(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getCreatedAt(),
                checklist.getSummary(),
                isLiked);
    }
}
