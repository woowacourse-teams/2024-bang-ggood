package com.bang_ggood.question.service;

import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.Highlight;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.HighlightRepository;
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
    private final HighlightRepository highlightRepository;

    @Transactional(readOnly = true)
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Category> findAllCustomQuestionCategories(User user) {
        return categoryRepository.findAllCustomQuestionCategoriesByUserId(user.getId());
    }

    @Transactional(readOnly = true)
    public List<Question> findAllDefaultQuestions() {
        return questionRepository.findByIsDefaultTrue();
    }

    @Transactional(readOnly = true)
    public Question readQuestion(Integer questionId) {
        return questionRepository.getById(questionId);
    }

    @Transactional(readOnly = true)
    public List<Highlight> readHighlights(Integer questionId) {
        return highlightRepository.findAllByQuestionId(questionId);
    }

    @Transactional(readOnly = true)
    public List<Question> readQuestionsByCategory(Category category) {
        return questionRepository.findAllByCategoryId(category.getId());
    }
}
