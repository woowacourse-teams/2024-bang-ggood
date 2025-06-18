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

import static com.bang_ggood.global.config.cache.CacheName.CATEGORY;
import static com.bang_ggood.global.config.cache.CacheName.HIGHLIGHT;
import static com.bang_ggood.global.config.cache.CacheName.QUESTION;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    private final HighlightRepository highlightRepository;

    @Transactional
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Cacheable(cacheNames = CATEGORY, key = "'allCategories'")
    @Transactional(readOnly = true)
    public List<Category> readAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Category> readAllCustomQuestionCategories(User user) {
        return categoryRepository.findAllCustomQuestionCategoriesByUserId(user.getId());
    }

    @Cacheable(cacheNames = QUESTION, key = "'defaultQuestions'")
    @Transactional(readOnly = true)
    public List<Question> findDefaultQuestions() {
        return questionRepository.findAllByIsDefaultTrue();
    }

    @Cacheable(cacheNames = CATEGORY, key = "#categoryId")
    @Transactional(readOnly = true)
    public Category readCategory(Integer categoryId) {
        return categoryRepository.getById(categoryId);
    }

    @Cacheable(cacheNames = QUESTION, key = "#questionId")
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

    @Cacheable(cacheNames = HIGHLIGHT, key = "#questionId")
    @Transactional(readOnly = true)
    public List<Highlight> readHighlights(Integer questionId) {
        return highlightRepository.findAllByQuestionId(questionId);
    }

    @Cacheable(cacheNames = QUESTION, key = "#category")
    @Transactional(readOnly = true)
    public List<Question> readQuestionsByCategoryAndUserAndAdmin(Category category, User user, User admin) {
        return questionRepository.findAllByCategoryIdAndUserIdAndAdminId(category.getId(), user.getId(), admin.getId());
    }

    @Transactional
    public void deleteByQuestion(Question question) {
        questionRepository.deleteById(question.getId());
    }
}
