package com.bang_ggood.question.repository;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value = "SELECT distinct c.* FROM category c "
            + "JOIN question q ON q.category_id = c.id "
            + "JOIN custom_checklist_question ccq ON ccq.question_id = q.id "
            + "WHERE ccq.user_id = :userId AND ccq.deleted = false ",
            nativeQuery = true)
    List<Category> findAllCustomQuestionCategoriesByUserId(@Param("userId") Long userId);

    default Category getById(Integer categoryId){
        return findById(categoryId).orElseThrow(() -> new BangggoodException(ExceptionCode.CATEGORY_NOT_FOUND));
    }
}
