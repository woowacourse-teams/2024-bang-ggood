package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistIncludedMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ChecklistIncludedMaintenanceRepository extends JpaRepository<ChecklistIncludedMaintenance, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE ChecklistIncludedMaintenance cim "
            + "SET cim.deleted = true "
            + "WHERE cim.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
