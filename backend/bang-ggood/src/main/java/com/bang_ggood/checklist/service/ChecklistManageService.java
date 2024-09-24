package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.response.ChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.like.service.ChecklistLikeService;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;
import com.bang_ggood.maintenance.service.ChecklistMaintenanceService;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.dto.response.SelectedOptionResponse;
import com.bang_ggood.option.service.ChecklistOptionService;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.SelectedQuestionResponse;
import com.bang_ggood.question.service.ChecklistQuestionService;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import com.bang_ggood.room.service.RoomService;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChecklistManageService {

    private final RoomService roomService;
    private final ChecklistService checklistService;
    private final ChecklistOptionService checklistOptionService;
    private final ChecklistQuestionService checklistQuestionService;
    private final ChecklistMaintenanceService checklistMaintenanceService;
    private final ChecklistLikeService checklistLikeService;

    public ChecklistManageService(RoomService roomService, ChecklistService checklistService,
                                  ChecklistOptionService checklistOptionService,
                                  ChecklistQuestionService checklistQuestionService,
                                  ChecklistMaintenanceService checklistMaintenanceService,
                                  ChecklistLikeService checklistLikeService) {
        this.roomService = roomService;
        this.checklistService = checklistService;
        this.checklistOptionService = checklistOptionService;
        this.checklistQuestionService = checklistQuestionService;
        this.checklistMaintenanceService = checklistMaintenanceService;
        this.checklistLikeService = checklistLikeService;
    }

    @Transactional
    public Long createChecklist(User user, ChecklistRequest checklistRequest) {
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

    @Transactional(readOnly = true)
    public SelectedChecklistResponse readChecklist(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);

        List<Integer> maintenances = readChecklistMaintenances(checklist);
        List<SelectedOptionResponse> options = readChecklistOptions(checklist);
        List<SelectedCategoryQuestionsResponse> questions = readChecklistQuestions(checklist);
        SelectedRoomResponse room = SelectedRoomResponse.of(checklist, maintenances);
        boolean isLiked = false; // TODO 좋아요 이후 리팩토링 필요

        return SelectedChecklistResponse.of(room, options, questions, isLiked);
    }

    private List<Integer> readChecklistMaintenances(Checklist checklist) {
        return checklistMaintenanceService.readChecklistMaintenances(checklist)
                .stream()
                .map(ChecklistMaintenance::getMaintenanceItemId)
                .toList();
    }

    private List<SelectedOptionResponse> readChecklistOptions(Checklist checklist) {
        return checklistOptionService.readChecklistOptions(checklist)
                .stream()
                .map(SelectedOptionResponse::from)
                .toList();
    }

    private List<SelectedCategoryQuestionsResponse> readChecklistQuestions(Checklist checklist) {
        List<ChecklistQuestion> checklistQuestions = checklistQuestionService.readChecklistQuestions(checklist);

        return Arrays.stream(Category.values())
                .map(category -> categorizeChecklistQuestions(category, checklistQuestions))
                .toList();
    }

    private SelectedCategoryQuestionsResponse categorizeChecklistQuestions(Category category,
                                                                           List<ChecklistQuestion> checklistQuestions) {
        List<SelectedQuestionResponse> selectedQuestionResponse = Question.filter(category, checklistQuestions)
                .stream()
                .map(SelectedQuestionResponse::new)
                .toList();

        return SelectedCategoryQuestionsResponse.of(category, selectedQuestionResponse);
    }

    @Transactional(readOnly = true)
    public ChecklistsPreviewResponse readLikedChecklistsPreview(User user) {
        List<Checklist> likedChecklists = checklistService.readLikedChecklistsPreview(user);
        List<ChecklistPreviewResponse> responses = mapToChecklistPreviewResponses(
                likedChecklists);
        return ChecklistsPreviewResponse.from(responses);
    }

    private List<ChecklistPreviewResponse> mapToChecklistPreviewResponses(List<Checklist> likedChecklists) {
        return likedChecklists.stream()
                .map(checklist -> ChecklistPreviewResponse.of(checklist, true))
                .toList();
    }

    @Transactional(readOnly = true)
    public ChecklistsPreviewResponse readAllChecklistsPreview(User user) {
        List<Checklist> checklists = checklistService.readAllChecklistsOrderByLatest(user);

        List<ChecklistPreviewResponse> responses = checklists.stream()
                .map(this::mapToChecklistPreview)
                .toList();
        return ChecklistsPreviewResponse.from(responses);
    }

    private ChecklistPreviewResponse mapToChecklistPreview(Checklist checklist) {
        boolean isLiked = checklistLikeService.isLikedChecklist(checklist);
        return ChecklistPreviewResponse.of(checklist, isLiked);
    }

    @Transactional
    public void updateChecklistById(User user, Long checklistId, ChecklistRequest checklistRequest) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);

        roomService.updateRoom(checklist.getRoom(), checklistRequest.toRoomEntity());
        checklistService.updateChecklist(checklist, checklistRequest.toChecklistEntity(checklist.getRoom(), user));

        updateChecklistOptions(checklistRequest, checklist);
        updateChecklistQuestions(checklistRequest, checklist);
        updateChecklistMaintenances(checklistRequest, checklist);
    }

    private void updateChecklistOptions(ChecklistRequest checklistRequest, Checklist checklist) {
        List<ChecklistOption> checklistOptions = checklistRequest.options().stream()
                .map(option -> new ChecklistOption(checklist, option))
                .toList();
        checklistOptionService.updateOptions(checklist.getId(), checklistOptions);
    }

    private void updateChecklistQuestions(ChecklistRequest checklistRequest, Checklist checklist) {
        List<ChecklistQuestion> questions = checklist.getQuestions();
        List<ChecklistQuestion> updateQuestions = checklistRequest.questions().stream()
                .map(question -> new ChecklistQuestion(
                        checklist,
                        Question.fromId(question.questionId()),
                        Answer.from(question.answer())))
                .toList();
        checklistQuestionService.updateQuestions(questions, updateQuestions);
    }

    private void updateChecklistMaintenances(ChecklistRequest checklistRequest, Checklist checklist) {

        List<ChecklistMaintenance> checklistMaintenances =
                checklistRequest.room().includedMaintenances().stream()
                        .map(maintenanceId -> new ChecklistMaintenance(checklist,
                                MaintenanceItem.fromId(maintenanceId)))
                        .collect(Collectors.toList());
        checklistMaintenanceService.updateMaintenances(checklist.getId(), checklistMaintenances);
    }
}
