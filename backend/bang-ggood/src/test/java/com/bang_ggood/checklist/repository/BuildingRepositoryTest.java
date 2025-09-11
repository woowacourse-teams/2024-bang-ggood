package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.domain.Building;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class BuildingRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private BuildingRepository buildingRepository;

    @DisplayName("위도와 경도로 빌딩 조회 성공 : 존재하는 경우")
    @Test
    void findByCoordinate_present() {
        // given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());

        // when
        Optional<Building> found = buildingRepository.findByCoordinate(
                building.getLatitude(),
                building.getLongitude()
        );

        // then
        assertAll(
                () -> assertThat(found).isPresent(),
                () -> assertThat(found.get().getId()).isEqualTo(building.getId())
        );
    }

    @DisplayName("위도와 경도로 빌딩 조회 성공 : 존재하지 않는 경우")
    @Test
    void findByCoordinate_empty() {
        // given
        buildingRepository.save(BuildingFixture.BUILDING_1());

        // when
        Optional<Building> found = buildingRepository.findByCoordinate(99.99, 88.88);

        // then
        assertThat(found).isEmpty();
    }
}
