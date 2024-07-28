package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.CategoryQuestionsResponse;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.CategoryScoreReadResponse;
import com.bang_ggood.checklist.dto.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.ChecklistInfo;
import com.bang_ggood.checklist.dto.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.QuestionCreateRequest;
import com.bang_ggood.checklist.dto.QuestionResponse;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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


    /*@Transactional
    public long createChecklist(ChecklistCreateRequest checklistCreateRequest) {
        Room room = roomRepository.save(checklistCreateRequest.toRoomEntity());

        ChecklistInfo checklistInfo = checklistCreateRequest.toChecklistInfo();
        Checklist checklist = new Checklist(new User(1L, "방방이"), room, checklistInfo.deposit(), checklistInfo.rent(),
                checklistInfo.contractTerm(), checklistInfo.realEstate());
        checklistRepository.save(checklist);

        createChecklistOptions(checklistCreateRequest, checklist);
        createChecklistQuestions(checklistCreateRequest, checklist);
        return checklist.getId();
    }*/

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
                throw new BangggoodException(ExceptionCode.OPTION_INVALID);
            }
        }
    }

    /*private void createChecklistQuestions(ChecklistCreateRequest checklistCreateRequest, Checklist checklist) {
        List<QuestionCreateRequest> questions = checklistCreateRequest.questions();
        validateQuestion(questions);
        for (QuestionCreateRequest questionCreateRequest : questions) {
            Integer questionId = questionCreateRequest.questionId();
            ChecklistQuestion checklistQuestion = new ChecklistQuestion(checklist, questionId,
                    questionCreateRequest.answer());
            checklistQuestionRepository.save(checklistQuestion);
        }
    }*/

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
                throw new BangggoodException(ExceptionCode.QUESTION_INVALID);
            }
        }
    }

    /*@Transactional
    public UserChecklistsPreviewResponse readUserChecklistsPreview() {
        User user = new User(1L, "방방이");
        List<Checklist> checklists = checklistRepository.findByUser(user);

        List<UserChecklistPreviewResponse> responses = checklists.stream()
                .map(checklist -> UserChecklistPreviewResponse.of(
                        checklist,
                        createBadges(checklist.getQuestions())))
                .toList();

        return new UserChecklistsPreviewResponse(responses);
    }*/

    /*private List<BadgeResponse> createBadges(List<ChecklistQuestion> questions) {
        return Category.getBadges(questions).stream()
                .map(BadgeResponse::from)
                .toList();
    }*/

    @Transactional
    public ChecklistQuestionsResponse readChecklistQuestions() {
        List<CategoryQuestionsResponse> categoryQuestionsResponses = new ArrayList<>();
        for (Category category : Category.values()) {
            List<QuestionResponse> questionsByCategory = Question.findQuestionsByCategory(category)
                    .stream()
                    .map(QuestionResponse::of)
                    .toList();
            categoryQuestionsResponses.add(CategoryQuestionsResponse.of(category, questionsByCategory));
        }
        return new ChecklistQuestionsResponse(categoryQuestionsResponses);
    }

    //TODO 테스트해야 함
    /*@Transactional
    public WrittenChecklistResponse readChecklistById(long id) {
        Checklist checklist = checklistRepository.getById(id);

        WrittenRoomResponse writtenRoomResponse = WrittenRoomResponse.of(checklist.getRoom(), checklist.getDeposit(),
                checklist.getRent(), checklist.getContractTerm(), checklist.getRealEstate());
        List<Integer> optionIds = readOptionsByChecklistId(id);
        List<WrittenCategoryQuestionsResponse> writtenCategoryQuestionsResponses =
                readCategoryQuestionsByChecklistId(id);

        return new WrittenChecklistResponse(writtenRoomResponse, optionIds, writtenCategoryQuestionsResponses);
    }*/

    private List<Integer> readOptionsByChecklistId(long checklistId) {
        return checklistOptionRepository.findByChecklistId(checklistId)
                .stream()
                .map(ChecklistOption::getOptionId)
                .toList();
    }

    /*private List<WrittenCategoryQuestionsResponse> readCategoryQuestionsByChecklistId(long checklistId) {
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findByChecklistId(checklistId);
        return Arrays.stream(Category.values())
                .map(category -> readQuestionsByCategory(category, checklistQuestions))
                .collect(Collectors.toList());
    }
*/
    /*private WrittenCategoryQuestionsResponse readQuestionsByCategory(Category category,
                                                                     List<ChecklistQuestion> checklistQuestions) {
        //TODO 리팩토링 필요
        List<WrittenQuestionResponse> writtenQuestionResponses = new ArrayList<>();
        for (ChecklistQuestion checklistQuestion : checklistQuestions) {
            int questionId = checklistQuestion.getQuestionId();
            if (category.isQuestionIn(questionId)) {
                writtenQuestionResponses.add(
                        new WrittenQuestionResponse(questionId, Question.getTitleByQuestionId(questionId),
                                questionList.getSubtitleByQuestionId(questionId), checklistQuestion.getAnswer()));
            }
        }
        return new WrittenCategoryQuestionsResponse(category.getId(), category.getDescription(),
                writtenQuestionResponses);
    }*/

    /*@Transactional
    public ChecklistsComparisonReadResponse readChecklistsComparison(List<Long> checklistIds) {
        User user = new User(1L, "방끗");

        List<ChecklistComparisonReadResponse> responses = checklistRepository.findByUserAndIdIn(user, checklistIds)
                .stream()
                .map(checklist -> {
                    // 카테고리별 총점
                    List<CategoryScoreReadResponse> categoryScores = calculateCategoryScores(checklist);

                    // 체크리스트 총점
                    int checklistScore = calculateChecklistScore(categoryScores);

                    // 옵션 개수
                    int checklistOptionCount = checklistOptionRepository.countByChecklist(checklist);

                    return ChecklistComparisonReadResponse.of(
                            checklist, checklistOptionCount, checklistScore, categoryScores);})
                .sorted(Comparator.comparing(ChecklistComparisonReadResponse::score).reversed())
                .toList();

        return new ChecklistsComparisonReadResponse(responses);
    }*/

    /*private List<CategoryScoreReadResponse> calculateCategoryScores(Checklist checklist) {
        List<CategoryScoreReadResponse> categoryScores = new ArrayList<>();

        for (Category category : Category.values()) {
            int categoryScore = category.calculateTotalScore(checklist.getQuestions());
            if (categoryScore != 0) {
                categoryScores.add(new CategoryScoreReadResponse(
                        category.getId(),
                        category.getDescription(),
                        categoryScore
                ));
            }
        }

        return categoryScores;
    }*/

    private int calculateChecklistScore(List<CategoryScoreReadResponse> categoryScores) {
        return categoryScores.stream()
                .mapToInt(CategoryScoreReadResponse::score)
                .sum() / categoryScores.size();
    }
}
