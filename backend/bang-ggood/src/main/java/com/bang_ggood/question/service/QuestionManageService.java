package com.bang_ggood.question.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.ChecklistQuestions;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.question.dto.request.QuestionCreateRequest;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionResponse;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.ComparisonCategorizedQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.QuestionResponse;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionManageService {

    private final ChecklistService checklistService;
    private final ChecklistQuestionService checklistQuestionService;
    private final QuestionService questionService;
    private final CustomChecklistQuestionService customChecklistQuestionService;
    private final UserRepository userRepository;

    @Transactional
    public Integer createQuestion(QuestionCreateRequest questionCreateRequest, User user) {
        Category category = questionService.readCategory(questionCreateRequest.categoryId());
        Question question = questionCreateRequest.toQuestionEntity(category, user);
        Question savedQuestion = questionService.createQuestion(question);

        CustomChecklistQuestion customChecklistQuestion = questionCreateRequest.toCustomChecklistEntity(user,
                savedQuestion);
        CustomChecklistQuestion savedCustomChecklistQuestion = customChecklistQuestionService.createCustomChecklistQuestion(
                customChecklistQuestion);
        return savedCustomChecklistQuestion.getQuestionId();
    }

    @Transactional
    public void createDefaultCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = questionService.findDefaultQuestions()
                .stream()
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();

        checklistQuestionService.createDefaultCustomQuestions(customChecklistQuestions);
    }

    @Transactional(readOnly = true)
    public CustomChecklistQuestionsResponse readCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = checklistQuestionService.readCustomChecklistQuestions(
                user);
        List<CategoryQuestionsResponse> categoryQuestionsResponses = categorizeCustomChecklistQuestions(user,
                customChecklistQuestions).stream()
                .filter(categoryQuestionsResponse -> !categoryQuestionsResponse.questions().isEmpty())
                .toList();

        return new CustomChecklistQuestionsResponse(categoryQuestionsResponses);
    }

    private List<CategoryQuestionsResponse> categorizeCustomChecklistQuestions(User user,
                                                                               List<CustomChecklistQuestion> customChecklistQuestions) {
        List<CategoryQuestionsResponse> categoryQuestionsResponses = new ArrayList<>();

        for (Category category : questionService.readAllCustomQuestionCategories(user)) {
            List<QuestionResponse> questionResponses = customChecklistQuestions.stream()
                    .filter(customChecklistQuestion -> customChecklistQuestion.isSameCategory(category))
                    .map(customChecklistQuestion -> new QuestionResponse(customChecklistQuestion.getQuestion(),
                            questionService.readHighlights(customChecklistQuestion.getQuestionId())))
                    .toList();

            categoryQuestionsResponses.add(CategoryQuestionsResponse.of(category, questionResponses));
        }

        return categoryQuestionsResponses;
    }

    @Transactional(readOnly = true)
    public CategoryCustomChecklistQuestionsResponse readAllCustomChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = checklistQuestionService.readCustomChecklistQuestions(
                user);
        return categorizeAllQuestionsWithSelected(customChecklistQuestions, user);
    }

    private CategoryCustomChecklistQuestionsResponse categorizeAllQuestionsWithSelected(
            List<CustomChecklistQuestion> customChecklistQuestions, User user) {
        User admin = userRepository.findUserByUserType(UserType.ADMIN).get(0);

        return CategoryCustomChecklistQuestionsResponse.of(
                categorizeCustomQuestions(customChecklistQuestions, admin),
                categorizeCustomQuestions(customChecklistQuestions, user));
    }

    private List<CategoryCustomChecklistQuestionResponse> categorizeCustomQuestions(
            List<CustomChecklistQuestion> customChecklistQuestions, User user) {
        List<CategoryCustomChecklistQuestionResponse> response = new ArrayList<>();
        for (Category category : questionService.readAllCategories()) {
            List<Question> categoryQuestions = questionService.readQuestionsByCategoryAndUser(category, user);
            List<CustomChecklistQuestionResponse> questions = categoryQuestions.stream()
                    .map(question -> new CustomChecklistQuestionResponse(
                            question,
                            questionService.readHighlights(question.getId()),
                            question.isSelected(customChecklistQuestions)))
                    .toList();
            response.add(CategoryCustomChecklistQuestionResponse.of(category, questions));
        }
        return response;
    }

    @Transactional(readOnly = true)
    public ComparisonCategorizedQuestionsResponse readComparisonChecklistQuestionsByCategory(User user,
                                                                                             Long checklistId,
                                                                                             Integer categoryId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);
        Category category = questionService.readCategory(categoryId);
        ChecklistQuestions checklistQuestions = new ChecklistQuestions(
                checklistQuestionService.readChecklistQuestionsByCategory(checklist, category));

        List<QuestionResponse> good = categorizeQuestionsByAnswer(checklistQuestions, Answer.GOOD);
        List<QuestionResponse> bad = categorizeQuestionsByAnswer(checklistQuestions, Answer.BAD);
        List<QuestionResponse> none = categorizeQuestionsByAnswer(checklistQuestions, Answer.NONE);

        return ComparisonCategorizedQuestionsResponse.of(good, bad, none);
    }

    private List<QuestionResponse> categorizeQuestionsByAnswer(ChecklistQuestions checklistQuestions, Answer answer) {
        return checklistQuestions.filterByAnswer(answer)
                .stream()
                .map(checklistQuestion -> new QuestionResponse(checklistQuestion.getQuestion(),
                        questionService.readHighlights(checklistQuestion.getQuestionId())))
                .toList();
    }

    @Transactional
    public void updateCustomChecklist(User user, CustomChecklistUpdateRequest request) {
        List<Question> questions = questionService.readAllQuestionByIds(request.questionIds());
        checklistQuestionService.updateCustomChecklist(user, questions);
    }

    @Transactional
    public void deleteQuestion(User user, Integer questionId) {
        Question question = questionService.readQuestion(questionId);
        CustomChecklistQuestion customChecklistQuestion = customChecklistQuestionService.readByQuestion(question);
        validateUserQuestion(user, question);

        questionService.deleteByQuestion(question);
        customChecklistQuestionService.deleteByCustomChecklistQuestion(customChecklistQuestion);
    }

    private void validateUserQuestion(User user, Question question) {
        if (!question.isOwnedBy(user)) {
            throw new BangggoodException(ExceptionCode.QUESTION_NOT_OWNED_BY_USER);
        }
    }
}
