package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface ChecklistOptionRepository extends JpaRepository<ChecklistOption, Long> {

    @Query("SELECT co FROM ChecklistOption co " +
            "WHERE co.checklist.id = :checklistId " +
            "AND co.deleted = false")
    List<ChecklistOption> findByChecklistId(@Param("checklistId") Long checklistId);

    @Query("SELECT COUNT(co) FROM ChecklistOption co " +
            "WHERE co.checklist = :checklist " +
            "AND co.deleted = false")
    Integer countByChecklist(@Param("checklist") Checklist checklist);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("UPDATE ChecklistOption co "
            + "SET co.deleted = true "
            + "WHERE co.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
