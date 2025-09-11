package com.bang_ggood.question.repository;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    default Question getById(Integer id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.QUESTION_INVALID));
    }

    List<Question> findAllByIsDefaultTrue();

    @Query("SELECT q FROM Question q WHERE q.id IN :questionIds AND q.deleted = false ")
    List<Question> findAllByIdIn(List<Integer> questionIds);

    @Query("""
            SELECT q FROM Question q
            WHERE q.category.id = :categoryId
            AND q.user.id = :userId""")
    List<Question> findAllByCategoryIdAndUserId(@Param("categoryId") Integer categoryId,
                                                @Param("userId") Long userId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("UPDATE Question q "
            + "SET q.deleted = true "
            + "WHERE q.id = :id")
    void deleteById(@Param("id") Integer id);
}
