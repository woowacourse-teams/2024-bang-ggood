package com.bang_ggood.like.repository;

import com.bang_ggood.like.domain.BuildingLike;
import com.bang_ggood.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingLikeRepository extends JpaRepository<BuildingLike, Long> {

    boolean existsByUserAndBuildingId(User user, Long buildingId);

    void deleteByUserAndBuildingId(User user, Long buildingId);
}
