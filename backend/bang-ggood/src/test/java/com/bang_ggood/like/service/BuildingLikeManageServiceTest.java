package com.bang_ggood.like.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.repository.BuildingRepository;
import com.bang_ggood.like.domain.BuildingLike;
import com.bang_ggood.like.repository.BuildingLikeRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

class BuildingLikeManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private BuildingLikeManageService buildingLikeManageService;
    @Autowired
    private BuildingLikeRepository buildingLikeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BuildingRepository buildingRepository;

    @DisplayName("빌딩 좋아요 추가 성공")
    @Test
    void createBuildingLike() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());

        // when
        buildingLikeManageService.createLike(user, building.getId());

        // then
        assertThat(buildingLikeRepository.existsByUserAndBuildingId(user, building.getId())).isTrue();
    }

    @DisplayName("빌딩 좋아요 추가 시도 : 이미 좋아요가 추가가 된 경우")
    @Test
    void createBuildingLike_alreadyLiked() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());

        // when
        buildingLikeManageService.createLike(user, building.getId());

        //then
        assertThat(buildingLikeRepository.count()).isEqualTo(1);
    }

    @DisplayName("빌딩 좋아요 삭제 성공")
    @Test
    void deleteBuildingLike() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        buildingLikeRepository.save(new BuildingLike(user, building));

        // when
        buildingLikeManageService.deleteLike(user, building.getId());

        // then
        assertThat(buildingLikeRepository.existsByUserAndBuildingId(user, building.getId())).isFalse();
    }

    @DisplayName("빌딩 좋아요 삭제 시도 : 빌딩 좋아요가 없는 경우")
    @Test
    void deleteBuildingLike_notFound() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());

        // when & then
        assertThatCode(() -> buildingLikeManageService.deleteLike(user, building.getId()))
                .doesNotThrowAnyException();
    }
}
