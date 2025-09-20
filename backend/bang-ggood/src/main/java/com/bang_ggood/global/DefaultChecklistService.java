package com.bang_ggood.global;

import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.RoomRequest;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.option.domain.Option;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.question.service.QuestionManageService;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class DefaultChecklistService {

    private static final RoomRequest DEFAULT_ROOM_REQUEST = createDefaultRoomRequest();
    private static final List<Integer> DEFAULT_OPTIONS = createDefaultOptions();
    private static final List<QuestionRequest> DEFAULT_QUESTION_REQUEST = createDefaultQuestionRequest();

    private final QuestionManageService questionManageService;
    private final ChecklistManageService checklistManageService;

    public DefaultChecklistService(QuestionManageService questionManageService,
                                   ChecklistManageService checklistManageService) {
        this.questionManageService = questionManageService;
        this.checklistManageService = checklistManageService;
    }

    private static RoomRequest createDefaultRoomRequest() {
        return new RoomRequest(
                "예시용 체크리스트", "방끗시 집잘구하구 행복하동", "방방하우스", "잠실", 10,
                3000, 60, 5, List.of(1, 3), "지상", 14, "분리형 원룸", 9.5,
                37.5153, 127.1030,
                12, 9, "초", "방끗공인중개사",
                "이곳에 필요한 메모를 작성하세요.", "이곳에 한줄평을 남겨 보세요.");
    }

    private static List<Integer> createDefaultOptions() {
        return List.of(
                Option.INDUCTION.getId(),
                Option.AIR_CONDITIONER.getId(),
                Option.SINK.getId(),
                Option.BED.getId());
    }

    private static List<QuestionRequest> createDefaultQuestionRequest() { // TODO 수정 필요
        return List.of(
                new QuestionRequest(1, Answer.GOOD.name()),
                new QuestionRequest(2, Answer.BAD.name()),
                new QuestionRequest(3, Answer.GOOD.name()),
                new QuestionRequest(10, Answer.GOOD.name()),
                new QuestionRequest(11, Answer.BAD.name()),
                new QuestionRequest(16, Answer.GOOD.name()),
                new QuestionRequest(17, Answer.GOOD.name()));
    }

    @Transactional
    public void createDefaultChecklistAndQuestions(User user) {
        ChecklistRequest checklistRequest = new ChecklistRequest(
                DEFAULT_ROOM_REQUEST, DEFAULT_OPTIONS, DEFAULT_QUESTION_REQUEST);

        questionManageService.createDefaultCustomChecklistQuestions(user);
        checklistManageService.createChecklist(user, checklistRequest);
    }
}
