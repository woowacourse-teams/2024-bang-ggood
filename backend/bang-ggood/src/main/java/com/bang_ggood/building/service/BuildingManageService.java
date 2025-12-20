package com.bang_ggood.building.service;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.domain.BuildingImage;
import com.bang_ggood.building.dto.response.BuildingResponse;
import com.bang_ggood.building.service.image.BuildingImageService;
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
    private final BuildingImageService buildingImageService;
    private final BuildingStationService buildingStationService;

    @Transactional(readOnly = true)
    public BuildingResponse readBuilding(Long buildingId) {
        Building building = buildingService.readBuilding(buildingId);
        Integer checklistCount = buildingService.countChecklists(building);
        // TODO 좋아요 여부
        SubwayStationResponses stations = readSubwayStations(building);
        List<String> photos = readBuildingImages(building);
        return BuildingResponse.of(building, checklistCount, stations, photos, false);
    }

    private SubwayStationResponses readSubwayStations(Building building) {
        List<SubwayStationResponse> subwayStations = buildingStationService.readBuildingStations(building)
                .stream()
                .map(SubwayStationResponse::from)
                .toList();
        return SubwayStationResponses.from(subwayStations);
    }

    private List<String> readBuildingImages(Building building) {
        return buildingImageService.readBuildingImages(building)
                .stream()
                .map(BuildingImage::getImageUrl)
                .toList();
    }
}
