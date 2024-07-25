package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.Option;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistOptionRepository extends JpaRepository<ChecklistOption, Long> {

    List<ChecklistOption> findByChecklistId(long checklistId);

    Integer countByChecklist(Checklist checklist);
}
