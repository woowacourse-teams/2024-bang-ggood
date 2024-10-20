package com.bang_ggood.question.repository;

import com.bang_ggood.question.domain.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {

    @Query(value = "SELECT distinct c.* FROM category c "
            + "JOIN question q ON q.category_id = c.id "
            + "JOIN custom_checklist_question ccq ON ccq.question_id = q.id "
            + "WHERE ccq.user_id = :id AND ccq.deleted = false ",
            nativeQuery = true)
    List<CategoryEntity> findAllCustomQuestionCategoriesById(@Param("id") Long id);
}
