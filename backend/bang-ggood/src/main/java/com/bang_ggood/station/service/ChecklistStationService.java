package com.bang_ggood.station.service;

import com.bang_ggood.station.repository.ChecklistStationRepository;
import org.springframework.stereotype.Service;

@Service
public class ChecklistStationService {

    private final ChecklistStationRepository checklistStationRepository;

    public ChecklistStationService(ChecklistStationRepository checklistStationRepository) {
        this.checklistStationRepository = checklistStationRepository;
    }
}
