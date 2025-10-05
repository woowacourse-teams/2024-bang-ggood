package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.station.dto.response.SubwayStationResponses;

public record BuildingResponse(Long buildingId, String buildingName, String address,
                               Double latitude, Double longitude, Integer checklistCount,
                               SubwayStationResponses subwayStationResponses, boolean isLiked) {

    public static BuildingResponse of (Building building, Integer checklistCount, SubwayStationResponses subwayStationResponses, boolean isLiked) {
        return new BuildingResponse(
                building.getId(), building.getName(), building.getAddress(),
                building.getLatitude(), building.getLongitude(), checklistCount,
                subwayStationResponses, isLiked);
    }
}
