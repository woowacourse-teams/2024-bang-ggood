package com.bang_ggood.question.service;

import com.bang_ggood.question.domain.CategoryEntity;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionResponse;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.QuestionResponse;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionManageService {

    private final ChecklistQuestionService checklistQuestionService;
    private final QuestionService questionService;

    @Transactional
    public void createDefaultCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = Question.findDefaultQuestions()
                .stream()
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();

        checklistQuestionService.createDefaultCustomQuestions(customChecklistQuestions);
    }

    @Transactional(readOnly = true)
    public CustomChecklistQuestionsResponse readCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = checklistQuestionService.readCustomChecklistQuestions(
                user);
        List<CategoryQuestionsResponse> categoryQuestionsResponses = categorizeCustomChecklistQuestions(
                customChecklistQuestions);
        return new CustomChecklistQuestionsResponse(categoryQuestionsResponses);
    }

    private List<CategoryQuestionsResponse> categorizeCustomChecklistQuestions(
            List<CustomChecklistQuestion> customChecklistQuestions) {
        List<CategoryQuestionsResponse> categoryQuestionsResponses = new ArrayList<>();

        for (CategoryEntity category : questionService.findAllCategories()) {
            List<QuestionResponse> questionResponses = customChecklistQuestions.stream()
                    .filter(customChecklistQuestion -> customChecklistQuestion.getCategory().getName().equals(category.getName())) // TODO 리팩토링
                    .map(customChecklistQuestion -> new QuestionResponse(customChecklistQuestion.getQuestion()))
                    .toList();

            categoryQuestionsResponses.add(CategoryQuestionsResponse.of(category, questionResponses));
        }

        return categoryQuestionsResponses;
    }

    @Transactional(readOnly = true)
    public CategoryCustomChecklistQuestionsResponse readAllCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = checklistQuestionService.readCustomChecklistQuestions(
                user);
        return categorizeAllQuestionsWithSelected(customChecklistQuestions);
    }

    private CategoryCustomChecklistQuestionsResponse categorizeAllQuestionsWithSelected(
            List<CustomChecklistQuestion> customChecklistQuestions) {
        List<CategoryCustomChecklistQuestionResponse> response = new ArrayList<>();

        for (CategoryEntity category : questionService.findAllCategories()) {
            List<Question> categoryQuestions = Question.findQuestionsByCategory(category);
            List<CustomChecklistQuestionResponse> questions = categoryQuestions.stream()
                    .map(question -> new CustomChecklistQuestionResponse(question,
                            question.isSelected(customChecklistQuestions)))
                    .toList();
            response.add(CategoryCustomChecklistQuestionResponse.of(category, questions));
        }

        return CategoryCustomChecklistQuestionsResponse.from(response);
    }

    @Transactional
    public void updateCustomChecklist(User user, CustomChecklistUpdateRequest request) {
        List<Question> questions = request.questionIds().stream()
                .map(Question::fromId)
                .toList();

        checklistQuestionService.updateCustomChecklist(user, questions);
    }
}
