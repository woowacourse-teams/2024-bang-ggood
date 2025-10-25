package com.bang_ggood.building.repository;

import com.bang_ggood.building.domain.BuildingImage;
import com.bang_ggood.checklist.domain.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BuildingImageRepository extends JpaRepository<BuildingImage, Long> {

    List<BuildingImage> findAllByBuilding(Building building);
}
