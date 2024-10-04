package com.bang_ggood.station.repository;

import com.bang_ggood.station.domain.ChecklistStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ChecklistStationRepository extends JpaRepository<ChecklistStation, Long> {

    @Query("SELECT cs FROM ChecklistStation cs " +
            "where cs.checklistId = :checklistId " +
            "and cs.deleted = false")
    List<ChecklistStation> findByChecklistId(Long checklistId);
}
