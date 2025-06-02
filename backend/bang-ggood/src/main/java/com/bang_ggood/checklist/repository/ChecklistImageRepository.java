package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChecklistImageRepository extends JpaRepository<ChecklistImage, Long> {

    @Query("SELECT COUNT(ci) "
            + "FROM ChecklistImage ci "
            + "WHERE ci.checklist.id = :checklistId "
            + "AND ci.deleted = false")
    int countByChecklistId(@Param("checklistId") Long checklistId);
}
