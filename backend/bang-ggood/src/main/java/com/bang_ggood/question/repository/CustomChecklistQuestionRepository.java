package com.bang_ggood.question.repository;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

public interface CustomChecklistQuestionRepository extends JpaRepository<CustomChecklistQuestion, Long> {

    default CustomChecklistQuestion getByQuestionId(Integer id) {
        return findByQuestionId(id).orElseThrow(() -> new BangggoodException(ExceptionCode.CUSTOM_CHECKLIST_NOT_FOUND));
    }

    @Query("SELECT c FROM CustomChecklistQuestion c WHERE c.user.id = :#{#user.id} AND c.deleted = false ")
    List<CustomChecklistQuestion> findAllByUser(@Param("user") User user);

    @Query("SELECT c FROM CustomChecklistQuestion c WHERE c.id = :id AND c.deleted = false ")
    Optional<CustomChecklistQuestion> findById(@Param("id") Long id);

    @Query("SELECT c FROM CustomChecklistQuestion c WHERE c.question.id = :questionId AND c.deleted = false ")
    Optional<CustomChecklistQuestion> findByQuestionId(@Param("questionId") Integer questionId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE CustomChecklistQuestion SET deleted = true WHERE user.id = :#{#user.id}")
    void deleteAllByUser(@Param("user") User user);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("UPDATE CustomChecklistQuestion cq SET cq.deleted = true WHERE cq.id = :id")
    void deleteById(@Param("id") Long id);
}
