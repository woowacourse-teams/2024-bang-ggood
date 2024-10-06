package com.bang_ggood.station.service;

import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.SubwayStationResponse;
import com.bang_ggood.station.dto.request.ChecklistStationRequest;
import com.bang_ggood.station.repository.ChecklistStationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChecklistStationService {

    private final ChecklistStationRepository checklistStationRepository;
    private final SubwayStationService subwayStationService;

    public ChecklistStationService(ChecklistStationRepository checklistStationRepository, SubwayStationService subwayStationService) {
        this.checklistStationRepository = checklistStationRepository;
        this.subwayStationService = subwayStationService;
    }

    @Transactional
    public void createChecklistStations(Long checklistId, ChecklistStationRequest request) {
        List<SubwayStationResponse> responses = subwayStationService.readNearestStation(request.latitude(), request.longitude());
        List<ChecklistStation> checklistStations = new ArrayList<>();

        for (SubwayStationResponse response : responses) {
            for (String stationLine : response.getStationLine()) {
                checklistStations.add(new ChecklistStation(checklistId, response.getStationName(), stationLine, response.getWalkingTime()));
            }
        }

        checklistStationRepository.saveAll(checklistStations);
    }

    @Transactional(readOnly = true)
    public List<ChecklistStation> readChecklistStationsByChecklistId(Long checklistId) {
        return checklistStationRepository.findByChecklistId(checklistId);
    }
}
