package com.bang_ggood.like.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.BuildingRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

class ChecklistLikeManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistLikeManageService checklistLikeManageService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @DisplayName("체크리스트 좋아요 추가 성공")
    @Test
    void createChecklistLike() {
        //given
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));

        // when
        checklistLikeManageService.createLike(user, checklist.getId());

        //then
        assertThat(checklistLikeRepository.existsByChecklist(checklist)).isTrue();
    }

    @DisplayName("체크리스트 좋아요 추가 시도 : 이미 좋아요가 추가가 된 체크리스트인 경우")
    @Test
    void createChecklistLike_checklistAlreadyLiked() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));

        // when
        checklistLikeManageService.createLike(user, checklist.getId());

        //then
        assertThat(checklistLikeRepository.count()).isEqualTo(1);
    }

    @DisplayName("체크리스트 좋아요 삭제 성공")
    @Test
    void deleteChecklistLikeByChecklistId() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));
        ChecklistLike checklistLike = checklistLikeRepository.save(ChecklistFixture.CHECKLIST1_LIKE(checklist));

        // when
        checklistLikeManageService.deleteLike(user, checklist.getId());

        // then
        assertThat(checklistLikeRepository.existsById(checklistLike.getId())).isFalse();
    }

    @DisplayName("체크리스트 좋아요 삭제 시도 : 체크리스트 좋아요가 없는 경우")
    @Test
    void deleteChecklistLikeByChecklistId_notFound() {
        // given-
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(user, building));

        // when & then
        assertThatCode(() -> checklistLikeManageService.deleteLike(user, checklist.getId()))
                .doesNotThrowAnyException();
    }
}
