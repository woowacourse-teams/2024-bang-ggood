package com.bang_ggood.like.service;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.service.BuildingService;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class BuildingLikeManageService {

    private final BuildingService buildingService;
    private final BuildingLikeService buildingLikeService;

    @Transactional
    public void createLike(User user, Long buildingId) {
        Building building = buildingService.findBuilding(buildingId);
        buildingLikeService.createLike(user, building);
    }

    @Transactional
    public void deleteLike(User user, Long buildingId) {
        buildingLikeService.deleteLike(user, buildingId);
    }
}
