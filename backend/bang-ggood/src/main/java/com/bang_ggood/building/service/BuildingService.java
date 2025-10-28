package com.bang_ggood.building.service;

import com.bang_ggood.building.service.image.BuildingImageService;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.repository.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Supplier;

@RequiredArgsConstructor
@Service
public class BuildingService {

    private final BuildingImageService buildingImageService;
    private final BuildingRepository buildingRepository;

    @Transactional
    public Building createOrFindBuilding(Building targetBuilding) {
        Optional<Building> foundBuilding = buildingRepository.findByCoordinate(targetBuilding.getLatitude(),
                targetBuilding.getLongitude());
        Building building = foundBuilding.orElseGet(() -> saveBuildingAndImages(targetBuilding).get());
        updateBuildingName(targetBuilding, building);
        return building;
    }

    private Supplier<Building> saveBuildingAndImages(Building building) {
        return () -> {
            Building savedBuilding = buildingRepository.save(building);
            buildingImageService.saveBuildingImagesAsync(savedBuilding);
            return savedBuilding;
        };
    }

    private void updateBuildingName(Building targetBuilding, Building building) {
        if (Objects.equals(building.getName(), targetBuilding.getName())) {
            return;
        }
        building.changeName(targetBuilding.getName());
        buildingRepository.save(building);
    }
}
