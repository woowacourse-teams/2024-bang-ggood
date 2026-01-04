package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.building.repository.BuildingRepository;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.building.domain.Building;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.Status;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class BuildingRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChecklistRepository checklistRepository;

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

    @DisplayName("건물에 속한 체크리스트 갯수 조회 성공")
    @Test
    void countChecklistsByBuilding() {
        // given
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user1 = userRepository.save(UserFixture.USER1());
        User user2 = userRepository.save(UserFixture.USER2());
        checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user1, building1));
        checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(user2, building1));

        // when
        Integer result = buildingRepository.countChecklistsByBuilding(building1.getId());

        // then
        Assertions.assertThat(result).isEqualTo(2);
    }

    @DisplayName("건물에 속한 체크리스트 반환 성공")
    @Test
    void findChecklistsByCursor() {
        // given
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1(user, building1);
        checklist1.changeStatus(Status.OPEN);
        Checklist checklist2 = ChecklistFixture.CHECKLIST2_USER1(user, building1);
        checklist2.changeStatus(Status.OPEN);
        checklistRepository.save(checklist1);
        checklistRepository.save(checklist2);

        Pageable pageable = Pageable.ofSize(10);
        LocalDateTime createdAt = LocalDateTime.now();

        // when
        List<Checklist> checklists = buildingRepository.findChecklistsByCursor(createdAt, building1.getId(), pageable);

        // then
        assertAll(
                () -> assertThat(checklists.get(0)).isEqualTo(checklist2),
                () -> assertThat(checklists.get(1)).isEqualTo(checklist1)
        );
    }
}
