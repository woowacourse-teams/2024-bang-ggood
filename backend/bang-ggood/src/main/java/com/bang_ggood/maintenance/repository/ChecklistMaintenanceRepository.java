package com.bang_ggood.maintenance.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface ChecklistMaintenanceRepository extends JpaRepository<ChecklistMaintenance, Long> {

    @Query("SELECT cm FROM ChecklistMaintenance cm "
            + "WHERE cm.checklist.id =:checklistId and cm.deleted = false ")
    List<ChecklistMaintenance> findAllByChecklistId(@Param("checklistId") Long checklistId);


    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("UPDATE ChecklistMaintenance cm "
            + "SET cm.deleted = true "
            + "WHERE cm.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
