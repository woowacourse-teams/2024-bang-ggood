package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.BuildingRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;


class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistManageService checklistManageService;

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(user, building);

        //when
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //then
        assertAll(
                () -> assertThat(savedChecklist.getRealEstate()).isEqualTo(checklist.getRealEstate()),
                () -> assertThat(savedChecklist.getMemo()).isEqualTo(checklist.getMemo()),
                () -> assertThat(savedChecklist.getSummary()).isEqualTo(checklist.getSummary())
        );
    }

    @DisplayName("체크리스트 수정 성공")
    @Test
    void updateChecklist() {
        //given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistService.createChecklist(ChecklistFixture.CHECKLIST1_USER1(user, building));

        //when
        Checklist updateChecklist = ChecklistFixture.CHECKLIST1_USER1_UPDATE(user, building);
        checklistService.updateChecklist(savedChecklist, updateChecklist);

        //then
        assertAll(
                () -> assertThat(savedChecklist.getRealEstate()).isEqualTo(updateChecklist.getRealEstate()),
                () -> assertThat(savedChecklist.getMemo()).isEqualTo(updateChecklist.getMemo()),
                () -> assertThat(savedChecklist.getSummary()).isEqualTo(updateChecklist.getSummary())
        );
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteById() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(user, building);
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //when
        checklistService.deleteById(checklist.getId());

        //then
        assertThat(checklistRepository.findById(checklist.getId()).isEmpty()).isTrue();
    }

    @DisplayName("체크리스트 리스트 최신순으로 조회 성공")
    @Test
    void readAllChecklistsOrderByLatest() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building building2 = buildingRepository.save(BuildingFixture.BUILDING_2());

        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1(user, building1);
        Checklist checklist2 = ChecklistFixture.CHECKLIST3_USER2(user, building2);

        checklistService.createChecklist(checklist1);
        checklistService.createChecklist(checklist2);

        // when
        List<Checklist> checklists = checklistService.readAllChecklistsOrderByLatest(user);

        // then
        assertThat(checklists).containsExactly(checklist2, checklist1);
    }

    @DisplayName("좋아요된 체크리스트 리스트 최신순 조회 성공")
    @Test
    void readLikedChecklistsPreview() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building building2 = buildingRepository.save(BuildingFixture.BUILDING_2());
        Building building3 = buildingRepository.save(BuildingFixture.BUILDING_3());
        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1(user, building1);
        Checklist checklist2 = ChecklistFixture.CHECKLIST3_USER2(user, building2);
        Checklist checklist3 = ChecklistFixture.CHECKLIST3_USER2(user, building3);

        checklistRepository.saveAll(
                List.of(checklist1, checklist2, checklist3)
        );
        checklistLikeRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_LIKE(checklist1),
                        ChecklistFixture.CHECKLIST2_LIKE(checklist2))
        );

        //when
        List<Checklist> checklists = checklistService.readLikedChecklistsPreview(user);

        //then
        assertAll(
                () -> assertThat(checklists.size()).isEqualTo(2),
                () -> assertThat(checklists.get(0).getId()).isEqualTo(checklist2.getId()),
                () -> assertThat(checklists.get(1).getId()).isEqualTo(checklist1.getId())
        );
    }
}
