package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;
import com.bang_ggood.maintenance.service.ChecklistMaintenanceService;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.service.ChecklistOptionService;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.service.ChecklistQuestionService;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.service.RoomService;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChecklistManageService {

    private final RoomService roomService;
    private final ChecklistService checklistService;
    private final ChecklistOptionService checklistOptionService;
    private final ChecklistQuestionService checklistQuestionService;
    private final ChecklistMaintenanceService checklistMaintenanceService;

    public ChecklistManageService(RoomService roomService, ChecklistService checklistService,
                                  ChecklistOptionService checklistOptionService,
                                  ChecklistQuestionService checklistQuestionService,
                                  ChecklistMaintenanceService checklistMaintenanceService) {
        this.roomService = roomService;
        this.checklistService = checklistService;
        this.checklistOptionService = checklistOptionService;
        this.checklistQuestionService = checklistQuestionService;
        this.checklistMaintenanceService = checklistMaintenanceService;
    }

    @Transactional
    public long createChecklist(User user, ChecklistRequest checklistRequest) {
        Room room = roomService.createRoom(checklistRequest.toRoomEntity());
        Checklist checklist = checklistService.createChecklist(checklistRequest.toChecklistEntity(room, user));
        createChecklistOptions(checklistRequest, checklist);
        createChecklistQuestions(checklistRequest, checklist);
        createChecklistMaintenances(checklistRequest, checklist);
        return checklist.getId();
    }

    private void createChecklistOptions(ChecklistRequest checklistRequest, Checklist checklist) {
        List<ChecklistOption> checklistOptions = checklistRequest.options().stream()
                .map(option -> new ChecklistOption(checklist, option))
                .toList();
        checklistOptionService.createOptions(checklistOptions);
    }

    private void createChecklistQuestions(ChecklistRequest checklistRequest, Checklist checklist) {
        List<ChecklistQuestion> checklistQuestions = checklistRequest.questions().stream()
                .map(question -> new ChecklistQuestion(
                        checklist,
                        Question.fromId(question.questionId()),
                        Answer.from(question.answer())))
                .collect(Collectors.toList());
        checklistQuestionService.createQuestions(checklistQuestions);
    }

    private void createChecklistMaintenances(ChecklistRequest checklistRequest, Checklist checklist) {
        List<ChecklistMaintenance> checklistMaintenances =
                checklistRequest.room().includedMaintenances().stream()
                        .map(maintenanceId -> new ChecklistMaintenance(checklist,
                                MaintenanceItem.fromId(maintenanceId)))
                        .collect(Collectors.toList());
        checklistMaintenanceService.createMaintenances(checklistMaintenances);
    }
}
