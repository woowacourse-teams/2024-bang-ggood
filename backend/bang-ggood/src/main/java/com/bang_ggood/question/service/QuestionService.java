package com.bang_ggood.question.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.Highlight;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.HighlightRepository;
import com.bang_ggood.question.repository.QuestionRepository;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    private final HighlightRepository highlightRepository;

    @Cacheable(cacheNames = "category", key = "'allCategories'")
    @Transactional(readOnly = true)
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Category> findAllCustomQuestionCategories(User user) {
        return categoryRepository.findAllCustomQuestionCategoriesByUserId(user.getId());
    }

    @Cacheable(cacheNames = "question", key = "'defaultQuestions'")
    @Transactional(readOnly = true)
    public List<Question> findDefaultQuestions() {
        return questionRepository.findAllByIsDefaultTrue();
    }

    @Cacheable(cacheNames = "category", key = "#categoryId")
    @Transactional(readOnly = true)
    public Category readCategory(Integer categoryId) {
        return categoryRepository.getById(categoryId);
    }

    @Cacheable(cacheNames = "question", key = "#questionId")
    @Transactional(readOnly = true)
    public Question readQuestion(Integer questionId) {
        return questionRepository.getById(questionId);
    }

    @Transactional(readOnly = true)
    public List<Question> readAllQuestionByIds(List<Integer> questionIds) {
        validateQuestionsEmpty(questionIds);
        validateQuestionsDuplication(questionIds);

        List<Question> questions = questionRepository.findAllByIdIn(questionIds);
        validateAllQuestionsSelected(questionIds, questions);
        return questions;
    }

    private void validateQuestionsEmpty(List<Integer> ids) {
        if (ids.isEmpty()) {
            throw new BangggoodException(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY); // TODO 예외 메시지 변경
        }
    }

    private void validateQuestionsDuplication(List<Integer> ids) {
        if (ids.size() != Set.copyOf(ids).size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
        }
    }

    private void validateAllQuestionsSelected(List<Integer> ids, List<Question> questions) {
        if (ids.size() != questions.size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_INVALID);
        }
    }

    @Cacheable(cacheNames = "highlight", key = "#questionId")
    @Transactional(readOnly = true)
    public List<Highlight> readHighlights(Integer questionId) {
        return highlightRepository.findAllByQuestionId(questionId);
    }

    @Cacheable(cacheNames = "question", key = "#category")
    @Transactional(readOnly = true)
    public List<Question> readQuestionsByCategory(Category category) {
        return questionRepository.findAllByCategoryId(category.getId());
    }
}
