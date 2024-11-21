package com.bang_ggood.question.repository;

import com.bang_ggood.question.domain.ChecklistQuestion;
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
    List<ChecklistQuestion> findAllByChecklistId(@Param("checklistId") Long checklistId);

    @Query("SELECT cq FROM ChecklistQuestion cq "
            + "JOIN FETCH cq.question "
            + "WHERE cq.checklist.id = :checklistId "
            + "AND cq.question.category.id = :categoryId "
            + "AND cq.deleted = false")
    List<ChecklistQuestion> findAllByChecklistIdAndCategoryId(@Param("checklistId") Long checklistId, @Param("categoryId") Integer categoryId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("UPDATE ChecklistQuestion cq "
            + "SET cq.deleted = true "
            + "WHERE cq.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
