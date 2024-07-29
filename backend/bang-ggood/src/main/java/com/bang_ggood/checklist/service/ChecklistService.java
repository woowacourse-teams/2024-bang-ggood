package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.CategoryQuestionsResponse;
import com.bang_ggood.category.dto.WrittenCategoryQuestionsResponse;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.domain.Score;
import com.bang_ggood.checklist.dto.BadgeResponse;
import com.bang_ggood.checklist.dto.CategoryScoreReadResponse;
import com.bang_ggood.checklist.dto.ChecklistComparisonReadResponse;
import com.bang_ggood.checklist.dto.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.ChecklistInfo;
import com.bang_ggood.checklist.dto.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.ChecklistsComparisonReadResponse;
import com.bang_ggood.checklist.dto.ChecklistQuestionCreateRequest;
import com.bang_ggood.checklist.dto.QuestionResponse;
import com.bang_ggood.checklist.dto.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.WrittenChecklistResponse;
import com.bang_ggood.checklist.dto.WrittenQuestionResponse;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.WrittenRoomResponse;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
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
        List<ChecklistQuestionCreateRequest> questionCreateRequests = checklistCreateRequest.questions();
        validateChecklistQuestion(questionCreateRequests);

        List<ChecklistQuestion> checklistQuestions = questionCreateRequests.stream()
                .map(checklistQuestion -> new ChecklistQuestion(
                        checklist,
                        Question.findById(checklistQuestion.questionId()),
                        Grade.getInstance(checklistQuestion.answer())))
                .toList();

        checklistQuestionRepository.saveAll(checklistQuestions);
    }

    private void validateChecklistQuestion(List<ChecklistQuestionCreateRequest> questions) {
        validateQuestionDuplicate(questions);
        validateQuestionInvalid(questions);
    }

    private void validateQuestionDuplicate(List<ChecklistQuestionCreateRequest> questions) {
        Set<Integer> set = new HashSet<>();
        questions.forEach(question -> {
            if (!set.add(question.questionId())) {
                throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
            }
        });
    }

    private void validateQuestionInvalid(List<ChecklistQuestionCreateRequest> questions) {
        for (ChecklistQuestionCreateRequest checklistQuestionCreateRequest : questions) {
            if (!Question.contains(checklistQuestionCreateRequest.questionId())) {
                throw new BangggoodException(ExceptionCode.INVALID_QUESTION);
            }
        }
    }

    @Transactional
    public UserChecklistsPreviewResponse readUserChecklistsPreview() {
        User user = new User(1L, "방방이");
        List<Checklist> checklists = checklistRepository.findByUser(user);

        List<UserChecklistPreviewResponse> responses = checklists.stream()
                .map(checklist -> UserChecklistPreviewResponse.of(
                        checklist,
                        createBadges(checklist.getQuestions())))
                .toList();

        return new UserChecklistsPreviewResponse(responses);
    }

    private List<BadgeResponse> createBadges(List<ChecklistQuestion> questions) {
        return Category.getBadges(questions).stream()
                .map(BadgeResponse::from)
                .toList();
    }

    @Transactional
    public ChecklistQuestionsResponse readChecklistQuestions() {
        List<CategoryQuestionsResponse> categoryQuestionsResponses = new ArrayList<>();
        for (Category category : Category.values()) {
            CategoryQuestionsResponse categoryQuestionsResponse =
                    new CategoryQuestionsResponse(category.getId(), category.getDescription(),
                            readChecklistQuestion(category));
            categoryQuestionsResponses.add(categoryQuestionsResponse);
        }
        return new ChecklistQuestionsResponse(categoryQuestionsResponses);
    }

    private List<QuestionResponse> readChecklistQuestion(Category category) {
        List<QuestionResponse> questionResponses = new ArrayList<>();
        Question.findByCategory(category).stream()
                .map(question -> new QuestionResponse(question.getId(),
                                question.getTitle(),
                                question.getSubtitle()))
                .forEach(questionResponses::add);
        return questionResponses;
    }

    //TODO 테스트해야 함
    @Transactional
    public WrittenChecklistResponse readChecklistById(long id) {
        Checklist checklist = checklistRepository.getById(id);

        WrittenRoomResponse writtenRoomResponse = WrittenRoomResponse.of(checklist);
        List<ChecklistOption> checklistOptions = readOptionsByChecklistId(checklist);
        List<WrittenCategoryQuestionsResponse> writtenCategoryQuestionsResponses =
                readCategoryQuestionsByChecklistId(id);

        return WrittenChecklistResponse.of(writtenRoomResponse, checklistOptions, writtenCategoryQuestionsResponses);
    }

    private List<ChecklistOption> readOptionsByChecklistId(Checklist checklist) {
        return checklistOptionRepository.findByChecklist(checklist);
    }

    private List<WrittenCategoryQuestionsResponse> readCategoryQuestionsByChecklistId(long checklistId) {
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findByChecklistId(checklistId);
        return Arrays.stream(Category.values())
                .map(category -> readQuestionsByCategory(category, checklistQuestions))
                .toList();
    }

    private WrittenCategoryQuestionsResponse readQuestionsByCategory(Category category,
                                                                     List<ChecklistQuestion> checklistQuestions) {
        //TODO 리팩토링 필요 / Question과 Grade를 함께 가지는 객체가 있으면 굉장히 편할듯?
        List<WrittenQuestionResponse> writtenQuestionResponses = checklistQuestions.stream()
                .filter(checklistQuestion -> checklistQuestion.getQuestion().isCategory(category))
                .map(WrittenQuestionResponse::of)
                .toList();

        return WrittenCategoryQuestionsResponse.of(category, writtenQuestionResponses);
    }

    @Transactional
    public ChecklistsComparisonReadResponse readChecklistsComparison(List<Long> checklistIds) {
        User user = new User(1L, "방끗");

        List<ChecklistComparisonReadResponse> responses = checklistRepository.findByUserAndIdIn(user, checklistIds)
                .stream()
                .map(checklist -> {
                    // 카테고리별 총점
                    Map<Category, Score> categoryScoreMap = calculateCategoryScores(checklist);

                    List<CategoryScoreReadResponse> categoryScores = categoryScoreMap.entrySet().stream()
                            .map(entry -> {
                                Category category = entry.getKey();
                                Score score = entry.getValue();

                                return new CategoryScoreReadResponse(category.getId(),
                                        category.name(),
                                        score.intValue(10));
                            })
                            .toList();

                    // 체크리스트 총점
                    int checklistScore = calculateChecklistScore(categoryScoreMap);

                    // 옵션 개수
                    int checklistOptionCount = checklistOptionRepository.countByChecklist(checklist);

                    return ChecklistComparisonReadResponse.of(
                            checklist, checklistOptionCount, checklistScore, categoryScores);})
                .sorted(Comparator.comparing(ChecklistComparisonReadResponse::score).reversed())
                .toList();

        return new ChecklistsComparisonReadResponse(responses);
    }

    private Map<Category, Score> calculateCategoryScores(Checklist checklist) {
        Map<Category, Score> categoryScores = new HashMap<>();

        for (Category category : Category.values()) {
            Score score = checklist.getQuestions().stream()
                    .filter(checklistQuestion -> checklistQuestion.getQuestion().isCategory(category))
                    .map(checklistQuestion -> Score.from(checklistQuestion.getGrade()))
                    .reduce(Score::sum)
                    .orElse(Score.getInstance());

            categoryScores.put(category, score);
        }

        return categoryScores;
    }

    private int calculateChecklistScore(Map<Category, Score> categoryScores) {
        return categoryScores.values().stream()
                .mapToInt(score -> score.intValue(100))
                .sum() / categoryScores.size();
    }
}
