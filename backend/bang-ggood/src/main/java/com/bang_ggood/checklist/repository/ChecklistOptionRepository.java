package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChecklistOptionRepository extends JpaRepository<ChecklistOption, Long> {

    List<ChecklistOption> findByChecklistId(long checklistId);

    Integer countByChecklist(Checklist checklist);
}
