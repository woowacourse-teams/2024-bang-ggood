package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.repository.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;

    @Transactional
    public Building createOrFindBuilding(Building targetBuilding) {
        Optional<Building> building = buildingRepository.findByCoordinate(targetBuilding.getLatitude(), targetBuilding.getLongitude());
        return building.orElseGet(() -> buildingRepository.save(targetBuilding));
    }
}
