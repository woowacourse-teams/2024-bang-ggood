package com.bang_ggood.station.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.repository.ChecklistStationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistStationService {

    private final ChecklistStationRepository checklistStationRepository;
    private final SubwayStationService subwayStationService;

    @Transactional
    public void createChecklistStations(Checklist checklist, Double latitude, Double longitude) {
        saveChecklistStations(checklist, latitude, longitude);
    }

    @Transactional(readOnly = true)
    public List<ChecklistStation> readChecklistStationsByChecklist(Checklist checklist) {
        return checklistStationRepository.findByChecklist(checklist);
    }

    @Transactional
    public void updateChecklistStation(Checklist checklist, Double latitude, Double longitude) {
        checklistStationRepository.deleteAllByChecklistId(checklist.getId());
        saveChecklistStations(checklist, latitude, longitude);
    }

    @Transactional
    public void deleteChecklistStation(Long checklistId) {
        checklistStationRepository.deleteAllByChecklistId(checklistId);
    }

    private void saveChecklistStations(Checklist checklist, Double latitude, Double longitude) {
        if (latitude == null || longitude == null) {
            return;
        }
        List<SubwayStationResponse> responses = subwayStationService.readNearestStation(latitude, longitude)
                .getStations();
        List<ChecklistStation> checklistStations = new ArrayList<>();

        for (SubwayStationResponse response : responses) {
            for (String stationLine : response.getStationLine()) {
                checklistStations.add(new ChecklistStation(checklist, response.getStationName(), stationLine,
                        response.getWalkingTime()));
            }
        }

        checklistStationRepository.saveAll(checklistStations);
    }
}
