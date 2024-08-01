package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Badge;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.category.dto.response.WrittenCategoryQuestionsResponse;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.ChecklistScore;
import com.bang_ggood.checklist.domain.CustomChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.request.ChecklistInfo;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.request.QuestionCreateRequest;
import com.bang_ggood.checklist.dto.response.BadgeResponse;
import com.bang_ggood.checklist.dto.response.CategoryScoreReadResponse;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.QuestionResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.WrittenChecklistResponse;
import com.bang_ggood.checklist.dto.response.WrittenQuestionResponse;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.response.WrittenRoomResponse;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;
    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository,
                            CustomChecklistQuestionRepository customChecklistQuestionRepository) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
        this.customChecklistQuestionRepository = customChecklistQuestionRepository;
    }

    @Transactional
    public long createChecklist(ChecklistCreateRequest checklistCreateRequest) {
        Room room = roomRepository.save(checklistCreateRequest.toRoomEntity());

        ChecklistInfo checklistInfo = checklistCreateRequest.toChecklistInfo();
        Checklist checklist = new Checklist(new User(1L, "방방이"), room, checklistInfo.deposit(), checklistInfo.rent(),
                checklistInfo.contractTerm(), checklistInfo.realEstate());
        checklistRepository.save(checklist);

        createChecklistOptions(checklistCreateRequest, checklist);
        createChecklistQuestions(checklistCreateRequest, checklist);
        return checklist.getId();
    }

    private void createChecklistOptions(ChecklistCreateRequest checklistCreateRequest, Checklist checklist) {
        List<Integer> optionIds = checklistCreateRequest.options();
        validateOptions(optionIds);
        List<ChecklistOption> checklistOptions = optionIds.stream()
                .map(option -> new ChecklistOption(checklist, option))
                .toList();
        checklistOptionRepository.saveAll(checklistOptions);
    }

    private void validateOptions(List<Integer> optionIds) {
        validateOptionDuplicate(optionIds);
        validateOptionInvalid(optionIds);
    }

    private void validateOptionDuplicate(List<Integer> optionIds) {
        Set<Integer> set = new HashSet<>();
        optionIds.forEach(id -> {
            if (!set.add(id)) {
                throw new BangggoodException(ExceptionCode.OPTION_DUPLICATED);
            }
        });
    }

    private void validateOptionInvalid(List<Integer> optionIds) {
        for (Integer optionId : optionIds) {
            if (!Option.contains(optionId)) {
                throw new BangggoodException(ExceptionCode.INVALID_OPTION);
            }
        }
    }

    private void createChecklistQuestions(ChecklistCreateRequest checklistCreateRequest, Checklist checklist) {
        validateQuestion(checklistCreateRequest.questions());
        Map<Integer, String> existQuestions = checklistCreateRequest.questions()
                .stream()
                .collect(Collectors.toMap(QuestionCreateRequest::questionId, QuestionCreateRequest::answer));

        List<ChecklistQuestion> checklistQuestions = Arrays.stream(Question.values())
                .map(question -> {
                    int questionId = question.getId();
                    return Optional.ofNullable(existQuestions.get(questionId))
                            .map(answer -> new ChecklistQuestion(checklist, Question.findById(questionId),
                                    Grade.from(answer)))
                            .orElseGet(() -> new ChecklistQuestion(checklist, Question.findById(questionId), null));
                })
                .collect(Collectors.toList());

        checklistQuestionRepository.saveAll(checklistQuestions);
    }

    @Transactional
    public ChecklistQuestionsResponse readChecklistQuestions() {
        User user = new User(1L, "방방이");
        List<CustomChecklistQuestion> customChecklistQuestions = customChecklistQuestionRepository.findByUser(user);

        Map<Category, List<Question>> categoryQuestions = customChecklistQuestions.stream()
                .map(CustomChecklistQuestion::getQuestion)
                .collect(Collectors.groupingBy(Question::getCategory));

        List<CategoryQuestionsResponse> categoryQuestionsResponses = categoryQuestions.entrySet().stream()
                .map(categoryQuestionEntry -> CategoryQuestionsResponse.of(
                        categoryQuestionEntry.getKey(),
                        categoryQuestionEntry.getValue().stream()
                                .map(QuestionResponse::of)
                                .toList()))
                .toList();

        return new ChecklistQuestionsResponse(categoryQuestionsResponses);
    }

    private void validateQuestion(List<QuestionCreateRequest> questions) {
        validateQuestionDuplicate(questions);
        validateQuestionInvalid(questions);
    }

    private void validateQuestionDuplicate(List<QuestionCreateRequest> questions) {
        Set<Integer> set = new HashSet<>();
        questions.forEach(question -> {
            if (!set.add(question.questionId())) {
                throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
            }
        });
    }

    private void validateQuestionInvalid(List<QuestionCreateRequest> questions) {
        for (QuestionCreateRequest questionCreateRequest : questions) {
            if (!Question.contains(questionCreateRequest.questionId())) {
                throw new BangggoodException(ExceptionCode.INVALID_QUESTION);
            }
        }
    }

    @Transactional
    public WrittenChecklistResponse readChecklistById(long id) {
        Checklist checklist = checklistRepository.getById(id);
        WrittenRoomResponse writtenRoomResponse = WrittenRoomResponse.of(checklist);

        List<Integer> optionIds = readOptionsByChecklistId(id);

        List<WrittenCategoryQuestionsResponse> writtenCategoryQuestionsResponses =
                readCategoryQuestionsByChecklistId(id);

        return new WrittenChecklistResponse(writtenRoomResponse, optionIds, writtenCategoryQuestionsResponses);
    }

    private List<Integer> readOptionsByChecklistId(long checklistId) {
        return checklistOptionRepository.findByChecklistId(checklistId)
                .stream()
                .map(ChecklistOption::getOptionId)
                .toList();
    }

    private List<WrittenCategoryQuestionsResponse> readCategoryQuestionsByChecklistId(long checklistId) {
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findByChecklistId(checklistId);
        return Arrays.stream(Category.values())
                .map(category -> readQuestionsByCategory(category, checklistQuestions))
                .toList();
    }

    private WrittenCategoryQuestionsResponse readQuestionsByCategory(Category category,
                                                                     List<ChecklistQuestion> checklistQuestions) {
        List<WrittenQuestionResponse> writtenQuestionResponses =
                Question.filter(category, checklistQuestions).stream()
                        .map(WrittenQuestionResponse::of)
                        .toList();

        return WrittenCategoryQuestionsResponse.of(category, writtenQuestionResponses);
    }

    @Transactional
    public UserChecklistsPreviewResponse readUserChecklistsPreview(User user) {
        List<Checklist> checklists = checklistRepository.findByUser(user);
        List<UserChecklistPreviewResponse> responses = checklists.stream()
                .map(this::getChecklistPreview)
                .toList();

        return new UserChecklistsPreviewResponse(responses);
    }

    private UserChecklistPreviewResponse getChecklistPreview(Checklist checklist) {
        return UserChecklistPreviewResponse.of(checklist, createBadges(checklist.getQuestions()));
    }

    private List<BadgeResponse> createBadges(List<ChecklistQuestion> questions) {
        return Arrays.stream(Category.values())
                .map(category -> category.provideBadge(questions))
                .filter(badge -> badge != Badge.NONE)
                .map(BadgeResponse::from)
                .toList();
    }

    @Transactional
    public ChecklistsWithScoreReadResponse readChecklistsComparison(List<Long> checklistIds) {
        User user = new User(1L, "방끗");

        validateChecklistComparison(checklistIds);

        List<ChecklistWithScoreReadResponse> responses = checklistRepository.findByUserAndIdIn(user, checklistIds)
                .stream()
                .map(this::getChecklistWithScore)
                .sorted(Comparator.comparing(ChecklistWithScoreReadResponse::score).reversed())
                .toList();

        return new ChecklistsWithScoreReadResponse(responses);
    }

    private void validateChecklistComparison(List<Long> checklistIds) {
        validateChecklistComparisonCount(checklistIds);
        validateChecklist(checklistIds);
    }

    private void validateChecklistComparisonCount(List<Long> checklistIds) {
        if (checklistIds.size() > 3) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_COMPARISON_INVALID_COUNT);
        }
    }

    private void validateChecklist(List<Long> checklistIds) {
        if (checklistRepository.countAllByIdIn(checklistIds) != checklistIds.size()) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_NOT_FOUND);
        }
    }


    private ChecklistWithScoreReadResponse getChecklistWithScore(Checklist checklist) {
        List<CategoryScoreReadResponse> categoryScores = getCategoryScores(checklist.getQuestions());
        int checklistScore = getChecklistScore(checklist.getQuestions());
        int checklistOptionCount = checklistOptionRepository.countByChecklist(checklist);

        return ChecklistWithScoreReadResponse.of(checklist, checklistOptionCount, checklistScore, categoryScores);
    }

    private List<CategoryScoreReadResponse> getCategoryScores(List<ChecklistQuestion> questions) {
        return Arrays.stream(Category.values())
                .map(category -> CategoryScoreReadResponse.of(category,
                        ChecklistScore.calculateCategoryScore(category, questions)))
                .filter(response -> response.score() != 0)
                .toList();
    }

    private int getChecklistScore(List<ChecklistQuestion> questions) {
        return ChecklistScore.calculateTotalScore(questions);
    }

    @Transactional
    public void updateCustomChecklist(CustomChecklistUpdateRequest request) {
        List<Integer> questionIds = request.questionIds();
        validateCustomChecklistQuestionsIsNotEmpty(questionIds);
        validateCustomChecklistQuestionsDuplication(questionIds);

        User user = new User(1L, "방방이");
        customChecklistQuestionRepository.deleteAllByUser(user);

        List<CustomChecklistQuestion> customChecklistQuestions = questionIds.stream()
                .map(Question::findById)
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();
        customChecklistQuestionRepository.saveAll(customChecklistQuestions);
    }

    private void validateCustomChecklistQuestionsIsNotEmpty(List<Integer> questionIds) {
        if (questionIds.isEmpty()) {
            throw new BangggoodException(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY);
        }
    }

    private void validateCustomChecklistQuestionsDuplication(List<Integer> questionIds) {
        if (questionIds.size() != Set.copyOf(questionIds).size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
        }
    }
}
