package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface ChecklistQuestionRepository extends JpaRepository<ChecklistQuestion, Long> {

    @Query("SELECT cq FROM ChecklistQuestion cq "
            + "WHERE cq.checklist.id = :checklistId "
            + "AND cq.deleted = false")
    List<ChecklistQuestion> findByChecklistId(@Param("checklistId") long checklistId);

    @Modifying
    @Transactional
    @Query("UPDATE ChecklistQuestion cq "
            + "SET cq.deleted = true "
            + "WHERE cq.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
