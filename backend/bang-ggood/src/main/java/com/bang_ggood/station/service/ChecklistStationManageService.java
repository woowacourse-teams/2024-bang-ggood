package com.bang_ggood.station.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.request.ChecklistStationRequest;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChecklistStationManageService {

    private final ChecklistStationService checklistStationService;

    public ChecklistStationManageService(ChecklistStationService checklistStationService) {
        this.checklistStationService = checklistStationService;
    }

    public void createChecklistStations(Checklist checklist, ChecklistStationRequest geolocation) {
        checklistStationService.createChecklistStations(checklist, geolocation.latitude(), geolocation.longitude());
    }

    public SubwayStationResponses readStationsByChecklist(Checklist checklist) {
        List<ChecklistStation> checklistStations = checklistStationService.readChecklistStationsByChecklist(checklist);
        List<SubwayStationResponse> stationResponses = checklistStations.stream()
                .map(SubwayStationResponse::from)
                .toList();

        return SubwayStationResponses.from(stationResponses);
    }
}
