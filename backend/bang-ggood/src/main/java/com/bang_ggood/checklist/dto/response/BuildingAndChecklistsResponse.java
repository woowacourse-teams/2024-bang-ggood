package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.station.dto.response.SubwayStationResponses;

public record BuildingAndChecklistsResponse(Long buildingId, String buildingName, String address,
                                            Double latitude, Double longitude, Integer checklistCount,
                                            SubwayStationResponses subwayStationResponses, boolean isLiked,
                                            ChecklistBuildingResponses checklists) {

    public static BuildingAndChecklistsResponse of(Building building, Integer checklistCount,
                                                   SubwayStationResponses subwayStationResponses, boolean isLiked, ChecklistBuildingResponses checklists) {
        return new BuildingAndChecklistsResponse(
                building.getId(), building.getName(), building.getAddress(),
                building.getLatitude(), building.getLongitude(), checklistCount,
                subwayStationResponses, isLiked, checklists);
    }
}
