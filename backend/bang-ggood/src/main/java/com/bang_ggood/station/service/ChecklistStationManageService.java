package com.bang_ggood.station.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.request.ChecklistStationRequest;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChecklistStationManageService {

    private final ChecklistStationService checklistStationService;
    private final SubwayStationService subwayStationService;

    public ChecklistStationManageService(ChecklistStationService checklistStationService, SubwayStationService subwayStationService) {
        this.checklistStationService = checklistStationService;
        this.subwayStationService = subwayStationService;
    }

    public void createChecklistStations(Checklist checklist, ChecklistStationRequest geolocation) {
        checklistStationService.createChecklistStations(checklist, geolocation.latitude(), geolocation.longitude());
    }

    public List<SubwayStationResponse> readStationsByChecklist(Checklist checklist) {
        List<ChecklistStation> checklistStations = checklistStationService.readChecklistStationsByChecklist(checklist);
        List<SubwayStationResponse> stationResponses = checklistStations.stream()
                .map(SubwayStationResponse::of)
                .toList();

        return subwayStationService.mergeTransferStations(stationResponses);
    }
}
