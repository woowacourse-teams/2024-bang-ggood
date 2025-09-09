package com.bang_ggood.station.repository;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.station.domain.BuildingStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface BuildingStationRepository extends JpaRepository<BuildingStation, Long> {

    @Query("SELECT bs FROM BuildingStation bs " +
            "where bs.building = :building " +
            "and bs.deleted = false")
    List<BuildingStation> findByBuilding(@Param("building") Building building);

    @Transactional
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE BuildingStation bs " +
            "SET bs.deleted = true " +
            "WHERE bs.building.id = :buildingId")
    void deleteAllByBuildingId(@Param("buildingId") Long buildingId);
}
