package com.bang_ggood.building.repository;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
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

    @Query("SELECT c FROM Checklist c "
            + "WHERE c.createdAt < :lastCursor "
            + "AND c.building.id = :buildingId "
            + "ORDER BY c.createdAt DESC ")
    List<Checklist> findChecklistsByCursor(
            @Param("lastCursor") LocalDateTime lastCursor,
            @Param("buildingId") Long buildingId,
            Pageable pageable
    );
}
