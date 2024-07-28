package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Badge;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.CategoryQuestionsResponse;
import com.bang_ggood.category.dto.WrittenCategoryQuestionsResponse;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.domain.Questionlist;
import com.bang_ggood.checklist.dto.response.BadgeResponse;
import com.bang_ggood.checklist.dto.response.CategoryScoreReadResponse;
import com.bang_ggood.checklist.dto.response.ChecklistWithScoreReadResponse;
import com.bang_ggood.checklist.dto.request.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.ChecklistInfo;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
import com.bang_ggood.checklist.dto.request.QuestionCreateRequest;
import com.bang_ggood.checklist.dto.response.QuestionResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.WrittenChecklistResponse;
import com.bang_ggood.checklist.dto.response.WrittenQuestionResponse;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;
    private final Questionlist questionList;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository, Questionlist questionList) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
        this.questionList = questionList;
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
        List<QuestionCreateRequest> questions = checklistCreateRequest.questions();
        validateQuestion(questions);
        for (QuestionCreateRequest questionCreateRequest : questions) {
            Question question = questionList.findById(questionCreateRequest.questionId());
            ChecklistQuestion checklistQuestion = new ChecklistQuestion(checklist, questionCreateRequest.questionId(),
                    questionCreateRequest.answer());
            checklistQuestionRepository.save(checklistQuestion);
        }
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
            if (!questionList.contains(questionCreateRequest.questionId())) {
                throw new BangggoodException(ExceptionCode.INVALID_QUESTION);
            }
        }
    }

    @Transactional
    public UserChecklistsPreviewResponse readUserChecklistsPreview() {
        User user = new User(1L, "방방이");
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
                .map(category -> category.provideBadge(questionList, questions))
                .filter(badge -> badge != Badge.NONE)
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
        category.getQuestionIds().stream()
                .map(questionId -> new QuestionResponse(questionId,
                        questionList.getTitleByQuestionId(questionId),
                        questionList.getSubtitleByQuestionId(questionId)))
                .forEach(questionResponses::add);
        return questionResponses;
    }

    //TODO 테스트해야 함
    @Transactional
    public WrittenChecklistResponse readChecklistById(long id) {
        Checklist checklist = checklistRepository.getById(id);

        WrittenRoomResponse writtenRoomResponse = WrittenRoomResponse.of(checklist.getRoom(), checklist.getDeposit(),
                checklist.getRent(), checklist.getContractTerm(), checklist.getRealEstate());
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
                .collect(Collectors.toList());
    }

    private WrittenCategoryQuestionsResponse readQuestionsByCategory(Category category,
                                                                     List<ChecklistQuestion> checklistQuestions) {
        //TODO 리팩토링 필요
        List<WrittenQuestionResponse> writtenQuestionResponses = new ArrayList<>();
        for (ChecklistQuestion checklistQuestion : checklistQuestions) {
            int questionId = checklistQuestion.getQuestionId();
            if (category.isQuestionIn(questionList, questionId)) {
                writtenQuestionResponses.add(
                        new WrittenQuestionResponse(questionId, questionList.getTitleByQuestionId(questionId),
                                questionList.getSubtitleByQuestionId(questionId), checklistQuestion.getAnswer()));
            }
        }
        return new WrittenCategoryQuestionsResponse(category.getId(), category.getDescription(),
                writtenQuestionResponses);
    }

    @Transactional
    public ChecklistsWithScoreReadResponse readChecklistsComparison(List<Long> checklistIds) {
        User user = new User(1L, "방끗");

        List<ChecklistWithScoreReadResponse> responses = checklistRepository.findByUserAndIdIn(user, checklistIds)
                .stream()
                .map(this::getChecklistWithScore)
                .sorted(Comparator.comparing(ChecklistWithScoreReadResponse::score).reversed())
                .toList();

        return new ChecklistsWithScoreReadResponse(responses);
    }

    private ChecklistWithScoreReadResponse getChecklistWithScore(Checklist checklist) {
        List<CategoryScoreReadResponse> categoryScores = getCategoryScores(checklist);
        int checklistScore = calculateChecklistScore(categoryScores);
        int checklistOptionCount = checklistOptionRepository.countByChecklist(checklist);

        return ChecklistWithScoreReadResponse.of(checklist, checklistOptionCount, checklistScore, categoryScores);
    }

    private List<CategoryScoreReadResponse> getCategoryScores(Checklist checklist) {
        return Arrays.stream(Category.values())
                .map(category -> CategoryScoreReadResponse.of(category, category.calculateTotalScore(questionList, checklist.getQuestions())))
                .filter(response -> response.score() == 0)
                .toList();
    }

    private int calculateChecklistScore(List<CategoryScoreReadResponse> categoryScores) {
        return categoryScores.stream()
                .mapToInt(CategoryScoreReadResponse::score)
                .sum() / categoryScores.size();
    }
}
