package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistQuestionRepository extends JpaRepository<ChecklistQuestion, Long> {
}
