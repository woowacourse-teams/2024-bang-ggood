package com.bang_ggood.like.service;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.like.domain.BuildingLike;
import com.bang_ggood.like.repository.BuildingLikeRepository;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class BuildingLikeService {

    private final BuildingLikeRepository buildingLikeRepository;

    @Transactional
    public void createLike(User user, Building building) {
        if (isAlreadyLiked(user, building)) {
            return;
        }
        buildingLikeRepository.save(new BuildingLike(user, building));
    }

    private boolean isAlreadyLiked(User user, Building building) {
        return buildingLikeRepository.existsByUserAndBuildingId(user, building.getId());
    }

    @Transactional
    public void deleteLike(User user, long buildingId) {
        buildingLikeRepository.deleteByUserAndBuildingId(user, buildingId);
    }
}
