package com.bang_ggood.question.repository;

import com.bang_ggood.question.domain.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HighlightRepository extends JpaRepository<Highlight, Integer> {

    List<Highlight> findAllByQuestionId(Integer id);
}
