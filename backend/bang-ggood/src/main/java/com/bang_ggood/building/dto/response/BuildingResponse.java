package com.bang_ggood.building.dto.response;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import java.time.LocalDateTime;
import java.util.List;

public record BuildingResponse(Long buildingId, String buildingName, String address,
                               Double latitude, Double longitude, Integer checklistCount,
                               List<SubwayStationResponse> stations, List<String> photos,
                               boolean isLiked, List<BuildingChecklistResponse> checklists, LocalDateTime lastCursor) {

    public static BuildingResponse of(Building building, Integer checklistCount,
                                      SubwayStationResponses stationResponses, List<String> photos,
                                      boolean isLiked, List<BuildingChecklistResponse> checklists, LocalDateTime lastCursor) {
        return new BuildingResponse(
                building.getId(), building.getName(), building.getAddress(),
                building.getLatitude(), building.getLongitude(), checklistCount,
                stationResponses.getStations(), photos, isLiked, checklists, lastCursor);
    }
}
