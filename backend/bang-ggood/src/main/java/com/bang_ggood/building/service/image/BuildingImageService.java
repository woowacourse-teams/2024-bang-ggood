package com.bang_ggood.building.service.image;

import com.bang_ggood.building.domain.BuildingImage;
import com.bang_ggood.building.repository.BuildingImageRepository;
import com.bang_ggood.building.domain.Building;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Service
public class BuildingImageService {

    private final BuildingImageClient buildingImageClient;
    private final BuildingImageRepository buildingImageRepository;

    @Transactional
    public void saveBuildingImagesAsync(Building building) {
        if (building.isNameEmpty()) return;

        BuildingImageRequest buildingImageRequest = new BuildingImageRequest(building.getName(), building.getAddress());

        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                CompletableFuture<Optional<List<PhotoURI>>> photoURIS = buildingImageClient.requestBuildingImages(buildingImageRequest);
                photoURIS.thenAccept(result -> {
                    if (result.isEmpty()) return;

                    List<BuildingImage> buildingImages = result.get()
                            .stream()
                            .map(each -> new BuildingImage(building, each.photoUri()))
                            .toList();
                    buildingImageRepository.saveAll(buildingImages);
               });
            }
        });
    }
}
