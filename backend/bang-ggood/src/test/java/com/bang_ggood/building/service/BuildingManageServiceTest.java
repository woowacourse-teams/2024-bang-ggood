package com.bang_ggood.building.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.dto.response.BuildingResponse;
import com.bang_ggood.building.repository.BuildingImageRepository;
import com.bang_ggood.building.repository.BuildingRepository;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.station.repository.BuildingStationRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class BuildingManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private BuildingManageService buildingManageService;

    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private BuildingImageRepository buildingImageRepository;
    @Autowired
    private BuildingStationRepository buildingStationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChecklistRepository checklistRepository;

    @DisplayName("빌딩 조회 성공")
    @Test
    void readBuilding() {
        // given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_2());
        User user = userRepository.save(UserFixture.USER1());
        checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
        buildingImageRepository.save(BuildingFixture.BUILDING_IMAGE1(building));
        buildingStationRepository.save(BuildingFixture.BUILDING_Station1(building));

        // when
        BuildingResponse buildingResponse = buildingManageService.readBuilding(building.getId());

        // then
        assertAll(
                () -> assertThat(buildingResponse.buildingId()).isEqualTo(building.getId()),
                () -> assertThat(buildingResponse.checklistCount()).isEqualTo(1),
                () -> assertThat(buildingResponse.stations().getStations().size()).isEqualTo(1),
                () -> assertThat(buildingResponse.photos().size()).isEqualTo(1)
        );
    }
}
