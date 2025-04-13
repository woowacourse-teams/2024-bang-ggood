package com.bang_ggood.question.service;

import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CustomChecklistQuestionService {

    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @Transactional
    public CustomChecklistQuestion createCustomChecklistQuestion(CustomChecklistQuestion customChecklistQuestion) {
        return customChecklistQuestionRepository.save(customChecklistQuestion);
    }

    @Transactional(readOnly = true)
    public CustomChecklistQuestion readByQuestion(Question question) {
        return customChecklistQuestionRepository.getByQuestionId(question.getId());
    }

    @Transactional
    public void deleteByCustomChecklistQuestion(CustomChecklistQuestion customChecklistQuestion) {
        customChecklistQuestionRepository.deleteById(customChecklistQuestion.getId());
    }
}
