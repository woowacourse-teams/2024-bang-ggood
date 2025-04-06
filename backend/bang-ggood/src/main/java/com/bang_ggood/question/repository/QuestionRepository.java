package com.bang_ggood.question.repository;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    default Question getById(Integer id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.QUESTION_INVALID));
    }

    List<Question> findAllByCategoryId(Integer id);

    List<Question> findAllByIsDefaultTrue();

    List<Question> findAllByIdIn(List<Integer> questionIds);

    @Query("""
        SELECT q FROM Question q
        WHERE q.category.id = :categoryId
        AND (q.user.id = :userId OR q.user.id = :adminId)""")
    List<Question> findAllByCategoryIdAndUserIdAndAdminId(@Param("categoryId") Integer categoryId,
                                                          @Param("userId") Long userId,
                                                          @Param("adminId") Long adminId);
}
