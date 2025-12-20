package com.bang_ggood.building.service;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.repository.BuildingRepository;
import com.bang_ggood.building.service.image.BuildingImageService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
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

    @Transactional(readOnly = true)
    public Building readBuilding(Long buildingId) {
        return buildingRepository.findById(buildingId)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.BUILDING_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Integer countChecklists(Building building) {
        return buildingRepository.countChecklistsByBuilding(building.getId());
    }
}
