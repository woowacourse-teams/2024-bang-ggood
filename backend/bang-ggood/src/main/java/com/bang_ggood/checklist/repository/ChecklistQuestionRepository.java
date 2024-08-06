package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChecklistQuestionRepository extends JpaRepository<ChecklistQuestion, Long> {

    @Query("SELECT cq FROM ChecklistQuestion cq "
            + "WHERE cq.checklist.id = :checklistId "
            + "AND cq.deleted = false")
    List<ChecklistQuestion> findByChecklistId(@Param("checklistId") long checklistId);
}
