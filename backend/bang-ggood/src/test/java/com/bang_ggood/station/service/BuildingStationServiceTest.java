package com.bang_ggood.station.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.BuildingRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.station.domain.BuildingStation;
import com.bang_ggood.station.repository.BuildingStationRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class BuildingStationServiceTest extends IntegrationTestSupport {

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BuildingStationService buildingStationService;

    @Autowired
    private BuildingStationRepository buildingStationRepository;

    private User user;
    private Building building;
    private Checklist checklist;

    @BeforeEach
    void setUp() {
        user = userRepository.save(UserFixture.USER1());
        building = buildingRepository.save(BuildingFixture.BUILDING_1());
        checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
    }

    @DisplayName("BuildingStation 객체 생성 성공")
    @Test
    void createBuildingStations() {
        // given & when
        buildingStationService.createBuildingStations(checklist, 37.517406150696104, 127.10333134512422);

        // then
        assertThat(buildingStationRepository.findByBuilding(building)).isNotEmpty();
    }

    @DisplayName("BuildingStation 조회 성공")
    @Test
    void readBuildingStations() {
        // given
        BuildingStation buildingStation1 = new BuildingStation(building, "잠실", "2호선", 5);
        BuildingStation buildingStation2 = new BuildingStation(building, "잠실", "8호선", 6);
        buildingStationRepository.saveAll(List.of(buildingStation1, buildingStation2));

        // when & then
        assertThat(buildingStationService.readBuildingStationsByChecklist(checklist))
                .containsExactlyInAnyOrder(buildingStation1, buildingStation2);
    }
}
