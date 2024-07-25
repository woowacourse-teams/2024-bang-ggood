package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.CategoryQuestionsResponse;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.Questionlist;
import com.bang_ggood.checklist.dto.BadgeResponse;
import com.bang_ggood.checklist.dto.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.ChecklistInfo;
import com.bang_ggood.checklist.dto.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.QuestionCreateRequest;
import com.bang_ggood.checklist.dto.QuestionResponse;
import com.bang_ggood.checklist.dto.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.UserChecklistsPreviewResponse;
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
            Integer questionId = questionCreateRequest.questionId();
            ChecklistQuestion checklistQuestion = new ChecklistQuestion(checklist, questionId,
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

    public ChecklistQuestionsResponse readChecklistQuestions () {
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
}
