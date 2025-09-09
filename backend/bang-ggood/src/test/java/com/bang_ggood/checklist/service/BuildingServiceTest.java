package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.repository.BuildingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class BuildingServiceTest extends IntegrationTestSupport {

    @Autowired
    private BuildingService buildingService;

    @Autowired
    private BuildingRepository buildingRepository;

    @DisplayName("빌딩 생성 혹은 반환 성공: 동일 좌표의 빌딩이 이미 존재하는 경우")
    @Test
    void createOrFindBuilding_buildingExists() {
        // given
        Building existing = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building target = BuildingFixture.BUILDING_1();
        long beforeCount = buildingRepository.count();

        // when
        Building result = buildingService.createOrFindBuilding(target);
        long afterCount = buildingRepository.count();

        // then
        assertAll(
                () -> assertThat(result.getId()).isEqualTo(existing.getId()),
                () -> assertThat(beforeCount).isEqualTo(afterCount)
        );
    }

    @DisplayName("빌딩 생성 혹은 반환 성공: 동일 좌표의 빌딩이 존재하지 않는 경우")
    @Test
    void createOrFindBuilding_buildingNotExists() {
        // given
        Building target = BuildingFixture.BUILDING_2();
        long beforeCount = buildingRepository.count();

        // when
        Building result = buildingService.createOrFindBuilding(target);
        long afterCount = buildingRepository.count();

        // then
        assertAll(
                () -> assertThat(result.getId()).isNotNull(),
                () ->  assertThat(afterCount).isEqualTo(beforeCount + 1)
        );
    }

    @DisplayName("빌딩 이름 업데이트 성공: 동일 좌표의 빌딩이 존재하지만 이름이 다른 경우")
    @Test
    void createOrFindBuilding_buildingExistsWithDifferentName_updatesName() {
        // given
        Building existing = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building target = BuildingFixture.BUILDING_1_WITH_OTHER_NAME();

        // when
        Building result = buildingService.createOrFindBuilding(target);

        // then
        assertAll(
                () -> assertThat(result.getId()).isEqualTo(existing.getId()),
                () -> assertThat(result.getName()).isEqualTo(target.getName()),
                () -> assertThat(buildingRepository.findById(existing.getId())
                        .orElseThrow()
                        .getName()).isEqualTo(target.getName())
        );
    }
}
