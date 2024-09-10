package com.bang_ggood.question.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.repository.ChecklistQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChecklistQuestionService {

    private final ChecklistQuestionRepository checklistQuestionRepository;

    public ChecklistQuestionService(ChecklistQuestionRepository checklistQuestionRepository) {
        this.checklistQuestionRepository = checklistQuestionRepository;
    }

    @Transactional
    public void createQuestions(List<ChecklistQuestion> checklistQuestions) {
        validateQuestionDuplicate(checklistQuestions);
        checklistQuestionRepository.saveAll(checklistQuestions);
    }

    private void validateQuestionDuplicate(List<ChecklistQuestion> questions) {
        Set<Integer> set = new HashSet<>();
        questions.forEach(question -> {
            if (!set.add(question.getQuestionId())) {
                throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
            }
        });
    }
}
