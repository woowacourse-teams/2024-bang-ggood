package com.bang_ggood.question.repository;

import com.bang_ggood.question.domain.ChecklistQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class BulkChecklistQuestionRepository {

    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void saveAll(List<ChecklistQuestion> checklistQuestions) {
        String sql = "INSERT INTO checklist_question (checklist_id, question, question_id, answer) " +
                "VALUES (?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(
                sql,
                checklistQuestions,
                checklistQuestions.size(),
                (ps, checklistQuestion) -> {
                    ps.setLong(1, checklistQuestion.getChecklistId());
                    ps.setString(2, checklistQuestion.getQuestion().name());
                    ps.setLong(3, checklistQuestion.getQuestionEntity().getId());
                    ps.setString(4, checklistQuestion.getAnswer().name());
                });
    }
}
