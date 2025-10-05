package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.dto.response.BuildingAndChecklistsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistBuildingResponses;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import com.bang_ggood.station.service.BuildingStationService;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BuildingManageService {

    private final ChecklistManageService checklistManageService;
    private final BuildingService buildingService;
    private final BuildingStationService buildingStationService;
    private final ChecklistService checklistService;

    @Transactional(readOnly = true)
    public BuildingAndChecklistsResponse readBuildingAndChecklists(User user, Long buildingId) {
        Building building = buildingService.readBuilding(buildingId);
        SubwayStationResponses subwayStationResponses = readSubwayStations(building);
        Integer checklistCount = checklistService.countBuildingChecklist(building);
        // TODO 좋아요 여부
        // TODO photos
        ChecklistBuildingResponses checklists = checklistManageService.readBuildingChecklists(buildingId);
        return BuildingAndChecklistsResponse.of(building, checklistCount, subwayStationResponses, false, checklists);
    }

    private SubwayStationResponses readSubwayStations(Building building) {
        List<SubwayStationResponse> subwayStations = buildingStationService.readBuildingStations(building)
                .stream()
                .map(SubwayStationResponse::from)
                .toList();
        return SubwayStationResponses.from(subwayStations);
    }
}
