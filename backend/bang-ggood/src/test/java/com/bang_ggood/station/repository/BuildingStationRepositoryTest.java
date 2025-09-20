package com.bang_ggood.station.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.BuildingRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.station.domain.BuildingStation;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class BuildingStationRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private UserRepository userRepository;

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

    @DisplayName("체크리스트 아이디를 통한 조회 성공")
    @Test
    void findByBuildingId() {
        // given
        BuildingStation buildingStation1 = new BuildingStation(building, "잠실", "2호선", 5);
        BuildingStation buildingStation2 = new BuildingStation(building, "잠실", "8호선", 6);
        buildingStationRepository.saveAll(List.of(buildingStation1, buildingStation2));

        // when & then
        assertThat(buildingStationRepository.findByBuilding(building))
                .containsExactlyInAnyOrder(buildingStation1, buildingStation2);
    }

    @DisplayName("체크리스트 아이디를 통한 조회 실패: 저장된 값이 없는 경우")
    @Test
    void findByBuildingId_noData_exception() {
        // given & when & then
        assertThat(buildingStationRepository.findByBuilding(building))
                .isEmpty();
    }

    @DisplayName("체크리스트 아이디를 통한 삭제 성공")
    @Test
    void deleteAllByBuildingId_noData_exception() {
        // given
        BuildingStation buildingStation1 = new BuildingStation(building, "잠실", "2호선", 5);
        BuildingStation buildingStation2 = new BuildingStation(building, "잠실", "8호선", 6);
        buildingStationRepository.saveAll(List.of(buildingStation1, buildingStation2));

        // when
        buildingStationRepository.deleteAllByBuildingId(checklist.getId());

        // then
        assertThat(buildingStationRepository.findByBuilding(building)).isEmpty();
    }
}
