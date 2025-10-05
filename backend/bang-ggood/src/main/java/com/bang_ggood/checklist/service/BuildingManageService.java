package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.dto.response.BuildingResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import com.bang_ggood.station.service.BuildingStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BuildingManageService {

    private final BuildingService buildingService;
    private final BuildingStationService buildingStationService;
    private final ChecklistService checklistService;

    @Transactional(readOnly = true)
    public BuildingResponse readBuilding(Long buildingId) {
        Building building = buildingService.readBuilding(buildingId);
        SubwayStationResponses subwayStationResponses = readSubwayStations(building);
        Integer checklistCount = checklistService.countChecklistBuilding(building);
        // 좋아요 여부
        // photos
        return BuildingResponse.of(building, checklistCount, subwayStationResponses, false);
    }

    private SubwayStationResponses readSubwayStations(Building building) {
        List<SubwayStationResponse> subwayStations = buildingStationService.readBuildingStations(building)
                .stream()
                .map(SubwayStationResponse::from)
                .toList();
        return SubwayStationResponses.from(subwayStations);
    }
}
