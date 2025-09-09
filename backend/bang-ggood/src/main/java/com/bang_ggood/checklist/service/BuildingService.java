package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.repository.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;

    @Transactional
    public Building createOrFindBuilding(Building targetBuilding) {
        Optional<Building> foundBuilding = buildingRepository.findByCoordinate(targetBuilding.getLatitude(),
                targetBuilding.getLongitude());
        Building building = foundBuilding.orElseGet(() -> buildingRepository.save(targetBuilding));
        updateBuildingName(targetBuilding, building);
        return building;
    }

    private void updateBuildingName(Building targetBuilding, Building building) {
        if (!Objects.equals(building.getName(), targetBuilding.getName())) {
            building.changeName(targetBuilding.getName());
        }
        buildingRepository.save(building);
    }
}
