package com.bang_ggood.question.repository;

import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.ChecklistQuestion;
import jakarta.persistence.criteria.CriteriaBuilder.In;
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

    @Query("SELECT DISTINCT cq.question.category FROM ChecklistQuestion cq "
            + "JOIN cq.checklist cl "
            + "WHERE cl.id = :checklistId "
            + "AND cl.user.id = :userId "
            + "AND cq.deleted = false")
    List<Category> findAllQuestionCategoriesByUserIdAndChecklistId(@Param("userId") Long userId, @Param("checklistId") Long checklistId);

    @Query("SELECT COUNT(cq) FROM ChecklistQuestion cq "
            + "WHERE cq.checklist.id = :checklistId "
            + "AND cq.deleted = false "
            + "AND cq.answer <> 'NONE' "
            + "AND cq.question.category.id = :categoryId")
    Integer countAnsweredQuestionsByChecklistIdAndCategoryId(@Param("checklistId") Long checklistId,
                                                             @Param("categoryId") Integer categoryId);

    @Query(" SELECT COUNT(cq) FROM ChecklistQuestion cq "
            + "WHERE cq.checklist.id = :checklistId "
            + "AND cq.deleted = false "
            + "AND cq.answer = :answer "
            + "AND cq.question.category.id = :categoryId ")
    Integer countAnsweredQuestionsByChecklistIdAndCategoryIdAndAnswer(@Param("checklistId") Long checklistId,
                                                                      @Param("categoryId") Integer categoryId,
                                                                      @Param("answer") Answer answer);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("UPDATE ChecklistQuestion cq "
            + "SET cq.deleted = true "
            + "WHERE cq.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
