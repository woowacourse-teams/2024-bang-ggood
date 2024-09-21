package com.bang_ggood.global;

import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.option.domain.Option;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.room.dto.request.RoomRequest;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class DefaultChecklistService {

    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;
    private final ChecklistManageService checklistManageService;

    public DefaultChecklistService(CustomChecklistQuestionRepository customChecklistQuestionRepository,
                                   ChecklistManageService checklistManageService) {
        this.customChecklistQuestionRepository = customChecklistQuestionRepository;
        this.checklistManageService = checklistManageService;
    }

    @Transactional
    public void createDefaultChecklistQuestions(User user) {
        List<CustomChecklistQuestion> checklistQuestions = Question.findDefaultQuestions()
                .stream()
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();

        customChecklistQuestionRepository.saveAll(checklistQuestions);
    }

    @Transactional
    public void createDefaultChecklist(User user) {
        RoomRequest roomRequest = createDefaultRoomRequest();
        List<Integer> options = createDefaultOptions();
        List<QuestionRequest> questionRequests = createDefaultQuestionRequest();

        ChecklistRequest checklistRequest = new ChecklistRequest(roomRequest, options, questionRequests);
        checklistManageService.createChecklist(user, checklistRequest);
    }

    private RoomRequest createDefaultRoomRequest() {
        return new RoomRequest(
                "예시용 체크리스트", "방끗시 집잘구하구 행복하동", "방방하우스", "잠실", 10,
                3000, 60, 5, List.of(1, 3), "지상", 14, "분리형 원룸", 9.5,
                12, 9, "초", "방끗공인중개사",
                "이곳에 필요한 메모를 작성하세요.", "이곳에 한줄평을 남겨 보세요.");
    }

    private List<Integer> createDefaultOptions() {
        return List.of(
                Option.INDUCTION.getId(),
                Option.AIR_CONDITIONER.getId(),
                Option.SINK.getId(),
                Option.BED.getId());
    }

    private List<QuestionRequest> createDefaultQuestionRequest() {
        return List.of(
                new QuestionRequest(Question.ROOM_CONDITION_1.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.ROOM_CONDITION_2.getId(), Answer.BAD.name()),
                new QuestionRequest(Question.ROOM_CONDITION_3.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.WINDOW_1.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.WINDOW_2.getId(), Answer.BAD.name()),
                new QuestionRequest(Question.BATHROOM_1.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.BATHROOM_2.getId(), Answer.GOOD.name()));
    }
}
