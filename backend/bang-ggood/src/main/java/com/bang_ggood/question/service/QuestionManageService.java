package com.bang_ggood.question.service;

import com.bang_ggood.question.domain.Category;
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
        List<CustomChecklistQuestion> customChecklistQuestions = questionService.findAllDefaultQuestions()
                .stream()
                .map(question -> new CustomChecklistQuestion(user, questionService.readQuestion(question.getId()))) // TODO : 변경필요
                .toList();

        checklistQuestionService.createDefaultCustomQuestions(customChecklistQuestions);
    }

    @Transactional(readOnly = true)
    public CustomChecklistQuestionsResponse readCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = checklistQuestionService.readCustomChecklistQuestions(
                user);
        List<CategoryQuestionsResponse> categoryQuestionsResponses = categorizeCustomChecklistQuestions(user, customChecklistQuestions).stream()
                .filter(categoryQuestionsResponse -> !categoryQuestionsResponse.questions().isEmpty())
                .toList();

        return new CustomChecklistQuestionsResponse(categoryQuestionsResponses);
    }

    private List<CategoryQuestionsResponse> categorizeCustomChecklistQuestions(
            User user,
            List<CustomChecklistQuestion> customChecklistQuestions) {
        List<CategoryQuestionsResponse> categoryQuestionsResponses = new ArrayList<>();

        for (Category category : questionService.findAllCustomQuestionCategories(user)) {
            List<QuestionResponse> questionResponses = customChecklistQuestions.stream()
                    .filter(customChecklistQuestion -> customChecklistQuestion.isSameCategory(category)) // TODO 리팩토링
                    .map(customChecklistQuestion -> new QuestionResponse(customChecklistQuestion.getQuestion(), questionService.readHighlights(customChecklistQuestion.getQuestionId())))
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

        for (Category category : questionService.findAllCategories()) {
            List<Question> categoryQuestions = questionService.readQuestionsByCategory(category);
            List<CustomChecklistQuestionResponse> questions = categoryQuestions.stream()
                    .map(question -> new CustomChecklistQuestionResponse(
                            question,
                            questionService.readHighlights(question.getId()),
                            question.isSelected(customChecklistQuestions)))
                    .toList();
            response.add(CategoryCustomChecklistQuestionResponse.of(category, questions));
        }

        return CategoryCustomChecklistQuestionsResponse.from(response);
    }

    @Transactional
    public void updateCustomChecklist(User user, CustomChecklistUpdateRequest request) {
        List<Question> questions = questionService.readAllQuestionByIds(request.questionIds());
        checklistQuestionService.updateCustomChecklist(user, questions);
    }
}
