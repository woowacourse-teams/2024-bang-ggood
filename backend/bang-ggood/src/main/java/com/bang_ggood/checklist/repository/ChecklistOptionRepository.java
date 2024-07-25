package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistOptionRepository extends JpaRepository<ChecklistOption, Long> {

    Integer countByChecklist(Checklist checklist);
}
