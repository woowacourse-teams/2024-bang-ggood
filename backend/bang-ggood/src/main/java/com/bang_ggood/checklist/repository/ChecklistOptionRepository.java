package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChecklistOptionRepository extends JpaRepository<ChecklistOption, Long> {

    @Query("SELECT co FROM ChecklistOption co "
            + "where co.checklist.id = :checklistId "
            + "AND co.deleted = false")
    List<ChecklistOption> findByChecklistId(@Param("checklistId") long checklistId);

    Integer countByChecklist(Checklist checklist);
}
