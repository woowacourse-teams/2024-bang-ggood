package com.bang_ggood.question.repository;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    default Question getById(Integer id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.QUESTION_INVALID));
    }

    List<Question> findAllByCategoryId(Integer id);

    List<Question> findByIsDefaultTrue();
}
