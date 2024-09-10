package com.bang_ggood.question.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionResponse;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionResponse;
import com.bang_ggood.question.repository.ChecklistQuestionRepository;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChecklistQuestionService {

    private final ChecklistQuestionRepository checklistQuestionRepository;
    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;

    public ChecklistQuestionService(ChecklistQuestionRepository checklistQuestionRepository, CustomChecklistQuestionRepository customChecklistQuestionRepository) {
        this.checklistQuestionRepository = checklistQuestionRepository;
        this.customChecklistQuestionRepository = customChecklistQuestionRepository;
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

    @Transactional(readOnly = true)
    public CategoryCustomChecklistQuestionsResponse readAllCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = customChecklistQuestionRepository.findAllByUser(user);
        List<CategoryCustomChecklistQuestionResponse> allCategoryCustomChecklistQuestions = getAllCategoryCustomChecklistQuestions(
                customChecklistQuestions);

        return new CategoryCustomChecklistQuestionsResponse(allCategoryCustomChecklistQuestions);
    }

    private List<CategoryCustomChecklistQuestionResponse> getAllCategoryCustomChecklistQuestions(
            List<CustomChecklistQuestion> customChecklistQuestions) {
        List<CategoryCustomChecklistQuestionResponse> response = new ArrayList<>();

        for (Category category : Category.values()) {
            List<Question> categoryQuestions = Question.findQuestionsByCategory(category);
            List<CustomChecklistQuestionResponse> questions = categoryQuestions.stream()
                    .map(question -> new CustomChecklistQuestionResponse(question,
                            question.isSelected(customChecklistQuestions)))
                    .toList();
            response.add(new CategoryCustomChecklistQuestionResponse(category.getId(), category.getName(), questions));
        }

        return response;
    }

    @Transactional
    public void updateCustomChecklist(User user, List<Question> questions) {
        validateCustomChecklistQuestionsIsNotEmpty(questions);
        validateCustomChecklistQuestionsDuplication(questions);

        customChecklistQuestionRepository.deleteAllByUser(user);

        List<CustomChecklistQuestion> customChecklistQuestions = questions.stream()
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();
        customChecklistQuestionRepository.saveAll(customChecklistQuestions);
    }

    private void validateCustomChecklistQuestionsIsNotEmpty(List<Question> questions) {
        if (questions.isEmpty()) {
            throw new BangggoodException(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY);
        }
    }

    private void validateCustomChecklistQuestionsDuplication(List<Question> questions) {
        if (questions.size() != Set.copyOf(questions).size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
        }
    }
}
