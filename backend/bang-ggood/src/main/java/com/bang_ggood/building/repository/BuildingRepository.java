package com.bang_ggood.building.repository;

import com.bang_ggood.building.domain.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface BuildingRepository extends JpaRepository<Building, Long> {

    @Query("SELECT b FROM Building b " +
            "WHERE b.deleted = false "
            + "AND b.latitude = :latitude "
            + "AND b.longitude = :longitude")
    Optional<Building> findByCoordinate(@Param("latitude") Double latitude,
                                        @Param("longitude") Double longitude);

    @Query("SELECT COUNT(c) FROM Checklist c " +
            "WHERE c.building.id = :buildingId " +
            "AND c.deleted = false")
    Integer countChecklistsByBuilding(@Param("buildingId") Long buildingId);
}
