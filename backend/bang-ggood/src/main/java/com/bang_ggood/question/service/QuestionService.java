package com.bang_ggood.question.service;

import com.bang_ggood.question.domain.CategoryEntity;
import com.bang_ggood.question.domain.QuestionEntity;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.QuestionRepository;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;

    @Transactional(readOnly = true)
    public List<CategoryEntity> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<CategoryEntity> findAllCustomQuestionCategories(User user) {
        return categoryRepository.findAllCustomQuestionCategoriesByUserId(user.getId());
    }

    @Transactional(readOnly = true)
    public QuestionEntity readQuestion(Integer questionId) {
        return questionRepository.getById(questionId);
    }
}
