package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.ChecklistRequestV1;
import com.bang_ggood.checklist.dto.response.ChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.ChecklistPreviewResponseV1;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponseV1;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponseV1;
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
import com.bang_ggood.question.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.SelectedQuestionResponse;
import com.bang_ggood.question.service.ChecklistQuestionService;
import com.bang_ggood.question.service.QuestionService;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import com.bang_ggood.room.service.RoomService;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.request.ChecklistStationRequest;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import com.bang_ggood.station.service.ChecklistStationService;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistManageService {

    private final RoomService roomService;
    private final ChecklistService checklistService;
    private final ChecklistOptionService checklistOptionService;
    private final ChecklistQuestionService checklistQuestionService;
    private final ChecklistMaintenanceService checklistMaintenanceService;
    private final ChecklistLikeService checklistLikeService;
    private final ChecklistStationService checklistStationService;
    private final QuestionService questionService;

    @Transactional
    public Long createChecklist(User user, ChecklistRequest checklistRequest) {
        Room room = roomService.createRoom(checklistRequest.toRoomEntity());
        Checklist checklist = checklistService.createChecklist(checklistRequest.toChecklistEntity(room, user));
        createChecklistOptions(checklistRequest, checklist);
        createChecklistQuestions(checklistRequest, checklist);
        createChecklistMaintenances(checklistRequest, checklist);
        return checklist.getId();
    }

    @Transactional
    public Long createChecklistV1(User user, ChecklistRequestV1 checklistRequestV1) {
        ChecklistRequest checklistRequest = checklistRequestV1.toChecklistRequest();

        Room room = roomService.createRoom(checklistRequest.toRoomEntity());
        Checklist checklist = checklistService.createChecklist(checklistRequest.toChecklistEntity(room, user));
        createChecklistOptions(checklistRequest, checklist);
        createChecklistQuestions(checklistRequest, checklist);
        createChecklistMaintenances(checklistRequest, checklist);
        createChecklistStation(checklistRequestV1, checklist);
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
                        questionService.readQuestion(question.questionId()),
                        Answer.from(question.answer())))
                .toList();
        checklistQuestionService.createQuestions(checklistQuestions);
    }

    private void createChecklistMaintenances(ChecklistRequest checklistRequest, Checklist checklist) {
        List<ChecklistMaintenance> checklistMaintenances =
                checklistRequest.room().includedMaintenances().stream()
                        .map(maintenanceId -> new ChecklistMaintenance(checklist,
                                MaintenanceItem.fromId(maintenanceId)))
                        .toList();
        checklistMaintenanceService.createMaintenances(checklistMaintenances);
    }

    private void createChecklistStation(ChecklistRequestV1 checklistRequestV1, Checklist checklist) {
        ChecklistStationRequest geolocation = checklistRequestV1.geolocation();
        checklistStationService.createChecklistStations(checklist, geolocation.latitude(), geolocation.longitude());
    }

    @Transactional(readOnly = true)
    public SelectedChecklistResponse readChecklist(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);

        List<Integer> maintenances = readChecklistMaintenances(checklist);
        List<SelectedOptionResponse> options = readChecklistOptions(checklist);
        List<SelectedCategoryQuestionsResponse> questions = readChecklistQuestions(checklist);
        SelectedRoomResponse room = SelectedRoomResponse.of(checklist, maintenances);
        boolean isLiked = checklistLikeService.isLikedChecklist(checklist);

        return SelectedChecklistResponse.of(room, options, questions, isLiked);
    }

    @Transactional(readOnly = true)
    public SelectedChecklistResponseV1 readChecklistV1(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);

        List<Integer> maintenances = readChecklistMaintenances(checklist);
        List<SelectedOptionResponse> options = readChecklistOptions(checklist);
        List<SelectedCategoryQuestionsResponse> questions = readChecklistQuestions(checklist);
        SelectedRoomResponse room = SelectedRoomResponse.of(checklist, maintenances);
        boolean isLiked = checklistLikeService.isLikedChecklist(checklist);
        SubwayStationResponses stations = readChecklistStations(checklist);

        return SelectedChecklistResponseV1.of(room, options, questions, isLiked, stations);
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

        return questionService.findAllCategories().stream()
                .map(category -> categorizeChecklistQuestions(category, checklistQuestions))
                .filter(selectedCategoryQuestionsResponse -> !selectedCategoryQuestionsResponse.questions().isEmpty())
                .toList();
    }

    private SelectedCategoryQuestionsResponse categorizeChecklistQuestions(Category category,
                                                                           List<ChecklistQuestion> checklistQuestions) {
        List<SelectedQuestionResponse> selectedQuestionResponse = checklistQuestionService.categorizeChecklistQuestions(category, checklistQuestions)
                .stream()
                .map(checklistQuestion -> new SelectedQuestionResponse(checklistQuestion, questionService.readHighlights(checklistQuestion.getQuestionId())))
                .toList();

        return SelectedCategoryQuestionsResponse.of(category, selectedQuestionResponse);
    }

    private SubwayStationResponses readChecklistStations(Checklist checklist) {
        List<ChecklistStation> checklistStations = checklistStationService.readChecklistStationsByChecklist(checklist);
        List<SubwayStationResponse> stations = checklistStations.stream()
                .map(SubwayStationResponse::from)
                .toList();

        return SubwayStationResponses.from(stations);
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
    public ChecklistsPreviewResponseV1 readLikedChecklistsPreviewV1(User user) {
        List<Checklist> likedChecklists = checklistService.readLikedChecklistsPreview(user);
        List<ChecklistPreviewResponseV1> responses = likedChecklists.stream()
                .map(this::mapToChecklistPreviewV1)
                .toList();
        return ChecklistsPreviewResponseV1.from(responses);
    }

    @Transactional
    public void deleteChecklistById(User user, Long id) {
        Checklist checklist = checklistService.readChecklist(user, id);
        checklistQuestionService.deleteAllByChecklistId(checklist.getId());
        checklistOptionService.deleteAllByChecklistId(checklist.getId());
        checklistMaintenanceService.deleteAllByChecklistId(checklist.getId());
        checklistService.deleteById(id);
        roomService.deleteById(checklist.getRoomId());
        checklistStationService.deleteChecklistStation(checklist.getId());
        checklistLikeService.deleteLike(user, checklist);
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

    @Transactional(readOnly = true)
    public ChecklistsPreviewResponseV1 readAllChecklistsPreviewV1(User user) {
        List<Checklist> checklists = checklistService.readAllChecklistsOrderByLatest(user);
        List<ChecklistPreviewResponseV1> responses = checklists.stream()
                .map(this::mapToChecklistPreviewV1)
                .toList();

        return ChecklistsPreviewResponseV1.from(responses);
    }

    private ChecklistPreviewResponseV1 mapToChecklistPreviewV1(Checklist checklist) {
        boolean isLiked = checklistLikeService.isLikedChecklist(checklist);
        SubwayStationResponse stationResponse = readNearestStation(checklist);
        return ChecklistPreviewResponseV1.of(checklist, stationResponse, isLiked);
    }

    private SubwayStationResponse readNearestStation(Checklist checklist) {
        List<ChecklistStation> checklistStations = checklistStationService.readChecklistStationsByChecklist(checklist);
        List<SubwayStationResponse> stationResponses = checklistStations.stream()
                .map(SubwayStationResponse::from)
                .toList();
        SubwayStationResponses subwayStationResponses = SubwayStationResponses.from(stationResponses);

        return subwayStationResponses.getNearestStation();
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

    @Transactional
    public void updateChecklistByIdV1(User user, Long checklistId, ChecklistRequestV1 checklistRequestV1) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);

        ChecklistRequest checklistRequest = checklistRequestV1.toChecklistRequest();
        roomService.updateRoom(checklist.getRoom(), checklistRequest.toRoomEntity());
        checklistService.updateChecklist(checklist, checklistRequest.toChecklistEntity(checklist.getRoom(), user));

        updateChecklistOptions(checklistRequest, checklist);
        updateChecklistQuestions(checklistRequest, checklist);
        updateChecklistMaintenances(checklistRequest, checklist);
        updateChecklistStations(checklistRequestV1, checklist);
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
                        questionService.readQuestion(question.questionId()),
                        Answer.from(question.answer())))
                .toList();
        checklistQuestionService.updateQuestions(questions, updateQuestions);
    }

    private void updateChecklistMaintenances(ChecklistRequest checklistRequest, Checklist checklist) {

        List<ChecklistMaintenance> checklistMaintenances =
                checklistRequest.room().includedMaintenances().stream()
                        .map(maintenanceId -> new ChecklistMaintenance(checklist,
                                MaintenanceItem.fromId(maintenanceId)))
                        .toList();
        checklistMaintenanceService.updateMaintenances(checklist.getId(), checklistMaintenances);
    }

    private void updateChecklistStations(ChecklistRequestV1 checklistRequestV1, Checklist checklist) {
        double latitude = checklistRequestV1.geolocation().latitude();
        double longitude = checklistRequestV1.geolocation().longitude();
        checklistStationService.updateChecklistStation(checklist, latitude, longitude);
    }
}
