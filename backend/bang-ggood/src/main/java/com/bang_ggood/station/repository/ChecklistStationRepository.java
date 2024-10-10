package com.bang_ggood.station.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.station.domain.ChecklistStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ChecklistStationRepository extends JpaRepository<ChecklistStation, Long> {

    @Query("SELECT cs FROM ChecklistStation cs " +
            "where cs.checklist = :checklist " +
            "and cs.deleted = false")
    List<ChecklistStation> findByChecklist(@Param("checklist") Checklist checklist);
}
