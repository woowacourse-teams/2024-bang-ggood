package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ChecklistMaintenanceRepository extends JpaRepository<ChecklistMaintenance, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE ChecklistMaintenance cm "
            + "SET cm.deleted = true "
            + "WHERE cm.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
