package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChecklistQuestionRepository extends JpaRepository<ChecklistQuestion, Long> {

    List<ChecklistQuestion> findByChecklistId(long checklistId);
}
