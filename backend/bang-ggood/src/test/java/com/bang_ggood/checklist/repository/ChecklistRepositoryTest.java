package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


class ChecklistRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 성공")
    @Test
    void findById() {
        //given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));

        //when
        Checklist foundChecklist = checklistRepository.getById(savedChecklist.getId());

        //then
        assertThat(foundChecklist.getId()).isEqualTo(savedChecklist.getId());
    }

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 실패 : 해당하는 체크리스트가 없을 경우")
    @Test
    void findById_notFound_exception() {
        assertThatThrownBy(() -> checklistRepository.getById(1L))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    @DisplayName("체크리스트 아이디 리스트 중 유저가 생성한 체크리스트 목록 갖고 오기 성공")
    @Test
    void findByUserAndIdIn() {
        //given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));

        assertThat(checklistRepository.findByUserAndIdIn(user, List.of(savedChecklist.getId())))
                .isEqualTo(List.of(savedChecklist));
    }

    @Transactional
    @DisplayName("체크리스트 리스트 조회 성공 : 논리적 삭제를 적용해서 체크리스트 리스트를 조회한다.")
    @Test
    void findAllByUser() {
        // given
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building building2 = buildingRepository.save(BuildingFixture.BUILDING_2());
        User user = UserFixture.USER1;
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building1));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(user, building2));
        checklistRepository.saveAll(List.of(checklist1, checklist2));

        checklistRepository.deleteById(checklist1.getId());

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserOrderByLatest(user);

        // then
        Assertions.assertThat(checklists).containsOnly(checklist2);
    }

    @DisplayName("체크리스트 리스트 조회 성공 : 체크리스트를 최신순으로 조회한다.")
    @Test
    void findAllByUser_OrderByLatest() {
        // given
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building building2 = buildingRepository.save(BuildingFixture.BUILDING_2());
        User user = UserFixture.USER1;
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building1));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(user, building2));

        checklistRepository.save(checklist1);
        checklistRepository.save(checklist2);

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserOrderByLatest(user);

        // then
        Assertions.assertThat(checklists).containsExactly(checklist2, checklist1);
    }

    @Transactional
    @DisplayName("체크리스트 리스트 조회 성공 : 사용자의 체크리스트만 조회한다.")
    @Test
    void findAllByUser_OnlyUserChecklists() {
        // given
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building building2 = buildingRepository.save(BuildingFixture.BUILDING_2());
        User user1 = UserFixture.USER1;
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user1, building1));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(user1, building2));

        User user2 = userRepository.save(UserFixture.USER2());
        Building building3 = buildingRepository.save(BuildingFixture.BUILDING_3());
        Checklist checklist3 = ChecklistFixture.CHECKLIST3_USER2(user2, building3);

        checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserOrderByLatest(user1);

        // then
        Assertions.assertThat(checklists).containsOnly(checklist1, checklist2);
    }

    @Transactional
    @DisplayName("체크리스트 좋아요 필터링 조회 성공")
    @Test
    void findAllByUserAndIsLiked() {
        // given
        Building building1 = buildingRepository.save(BuildingFixture.BUILDING_1());
        Building building2 = buildingRepository.save(BuildingFixture.BUILDING_2());
        Building building3 = buildingRepository.save(BuildingFixture.BUILDING_3());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building1));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building2));
        Checklist checklist3 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building3));
        checklistLikeRepository.save(ChecklistFixture.CHECKLIST1_LIKE(checklist1));
        checklistLikeRepository.save(ChecklistFixture.CHECKLIST2_LIKE(checklist2));

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserAndIsLiked(user);

        // then
        Assertions.assertThat(checklists)
                .containsOnly(checklist1, checklist2);
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 성공 : 존재하는 경우")
    @Test
    void existsById_true() {
        //given & when
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));

        //then
        assertThat(checklistRepository.existsById(savedChecklist.getId().longValue())).isTrue();
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 성공 : 존재하지 않는 경우")
    @Test
    void existsById_false() {
        //given & when & then
        assertThat(checklistRepository.existsById(1L)).isFalse();
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteById() {
        //given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));

        //when
        checklistRepository.deleteById(savedChecklist.getId());

        //then
        assertThat(checklistRepository.existsById(savedChecklist.getId())).isFalse();
    }
}
