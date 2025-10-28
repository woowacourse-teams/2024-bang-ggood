package com.bang_ggood.building.service.image;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.building.domain.BuildingImage;
import com.bang_ggood.building.repository.BuildingImageRepository;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.repository.BuildingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class BuildingImageServiceTest extends IntegrationTestSupport {

    @Autowired
    private BuildingImageRepository buildingImageRepository;
    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private BuildingImageService buildingImageService;
    @MockBean
    private BuildingImageClient buildingImageClient;

    @DisplayName("빌딩 이미지 생성 성공")
    @Transactional
    @Test
    void buildingImageSaveSuccess() {
        // given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_2());
        CompletableFuture<Optional<List<PhotoURI>>> photoURIS = CompletableFuture.completedFuture(
                Optional.of(List.of(new PhotoURI("name", "exampleURI"))));

        when(buildingImageClient.requestBuildingImages(any())).thenReturn(photoURIS);

        // when
        buildingImageService.saveBuildingImagesAsync(building);

        // then
       TransactionSynchronizationManager.getSynchronizations()
               .forEach(TransactionSynchronization::afterCommit);

        List<BuildingImage> results = buildingImageRepository.findAllByBuilding(building);
        assertThat(results).hasSize(1);
    }

    @DisplayName("빌딩 이미지 없으면 생성하지 않음")
    @Transactional
    @Test
    void buildingImageNotSave() {
        // given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_2());
        CompletableFuture<Optional<List<PhotoURI>>> photoURIS = CompletableFuture.completedFuture(
                Optional.empty());

        when(buildingImageClient.requestBuildingImages(any())).thenReturn(photoURIS);

        // when
        buildingImageService.saveBuildingImagesAsync(building);

        // then
        TransactionSynchronizationManager.getSynchronizations()
                .forEach(TransactionSynchronization::afterCommit);

        List<BuildingImage> results = buildingImageRepository.findAllByBuilding(building);
        assertThat(results).isEmpty();
    }
}
