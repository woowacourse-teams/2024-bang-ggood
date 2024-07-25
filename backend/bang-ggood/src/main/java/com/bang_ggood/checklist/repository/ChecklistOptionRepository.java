package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistOptionRepository extends JpaRepository<ChecklistOption, Long> {

    List<ChecklistOption> findByChecklist(Checklist checklist);

    Integer countByChecklist(Checklist checklist);
}
