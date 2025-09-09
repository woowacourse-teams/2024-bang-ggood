package com.bang_ggood.station.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.domain.BuildingStation;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.repository.BuildingStationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistStationService {

    private final BuildingStationRepository buildingStationRepository;
    private final SubwayStationService subwayStationService;

    @Transactional
    public void createChecklistStations(Checklist checklist, Double latitude, Double longitude) {
        saveChecklistStations(checklist, latitude, longitude);
    }

    @Transactional(readOnly = true)
    public List<BuildingStation> readChecklistStationsByChecklist(Checklist checklist) {
        return buildingStationRepository.findByBuilding(checklist.getBuilding());
    }

    @Transactional
    public void updateChecklistStation(Checklist checklist, Double latitude, Double longitude) {
        buildingStationRepository.deleteAllByBuildingId(checklist.getId());
        saveChecklistStations(checklist, latitude, longitude);
    }

    @Transactional
    public void deleteChecklistStation(Long checklistId) {
        buildingStationRepository.deleteAllByBuildingId(checklistId);
    }

    private void saveChecklistStations(Checklist checklist, Double latitude, Double longitude) {
        if (latitude == null || longitude == null) {
            return;
        }
        List<SubwayStationResponse> responses = subwayStationService.readNearestStation(latitude, longitude)
                .getStations();
        List<BuildingStation> buildingStations = new ArrayList<>();

        for (SubwayStationResponse response : responses) {
            for (String stationLine : response.getStationLine()) {
                buildingStations.add(new BuildingStation(checklist.getBuilding(), response.getStationName(), stationLine,
                        response.getWalkingTime()));
            }
        }

        buildingStationRepository.saveAll(buildingStations);
    }
}
