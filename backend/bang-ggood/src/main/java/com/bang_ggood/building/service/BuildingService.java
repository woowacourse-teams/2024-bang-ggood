package com.bang_ggood.building.service;

import com.bang_ggood.building.domain.BuildingImage;
import com.bang_ggood.building.repository.BuildingImageRepository;
import com.bang_ggood.building.service.image.BuildingImageClient;
import com.bang_ggood.building.service.image.BuildingImageRequest;
import com.bang_ggood.building.service.image.PhotoURI;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.repository.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Supplier;

@RequiredArgsConstructor
@Service
public class BuildingService {

    private final BuildingImageClient buildingImageClient;
    private final BuildingImageRepository buildingImageRepository;
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
            saveBuildingImages(savedBuilding);
            return savedBuilding;
        };
    }

    private void saveBuildingImages(Building building) {
        if (building.isNameEmpty()) return;

        BuildingImageRequest buildingImageRequest = new BuildingImageRequest(building.getName(), building.getAddress());
        Optional<List<PhotoURI>> photoURIS = buildingImageClient.requestBuildingImages(buildingImageRequest);

        if (photoURIS.isEmpty()) return;

        List<BuildingImage> buildingImages = photoURIS.get()
                .stream()
                .map(each -> new BuildingImage(building, each.photoUri()))
                .toList();
        buildingImageRepository.saveAll(buildingImages);
    }

    private void updateBuildingName(Building targetBuilding, Building building) {
        if (Objects.equals(building.getName(), targetBuilding.getName())) {
            return;
        }
        building.changeName(targetBuilding.getName());
        buildingRepository.save(building);
    }
}
