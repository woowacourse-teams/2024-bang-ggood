package com.bang_ggood.building.dto.response;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import java.util.List;

public record BuildingResponse(Long buildingId, String buildingName, String address,
                               Double latitude, Double longitude, Integer checklistCount,
                               SubwayStationResponses stations,
                               List<String> photos,
                               boolean isLiked) {

    public static BuildingResponse of (Building building, Integer checklistCount,
                                       SubwayStationResponses stations, List<String> photos,
                                       boolean isLiked) {
        return new BuildingResponse(
                building.getId(), building.getName(), building.getAddress(),
                building.getLatitude(), building.getLongitude(), checklistCount,
                stations, photos, isLiked);
    }
}
