package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistShare;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.response.ChecklistCompareResponse;
import com.bang_ggood.checklist.dto.response.ChecklistCompareResponses;
import com.bang_ggood.checklist.dto.response.ChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.ChecklistShareResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
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
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.question.dto.response.CategoryScoreResponse;
import com.bang_ggood.question.dto.response.CategoryScoreResponses;
import com.bang_ggood.question.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.SelectedQuestionResponse;
import com.bang_ggood.question.service.ChecklistQuestionService;
import com.bang_ggood.question.service.QuestionService;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.request.RoomRequest;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import com.bang_ggood.room.service.RoomService;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import com.bang_ggood.station.service.ChecklistStationService;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistManageService {

    private static final int CHECKLIST_COMPARE_COUNT = 2;

    private final RoomService roomService;
    private final ChecklistService checklistService;
    private final ChecklistOptionService checklistOptionService;
    private final ChecklistQuestionService checklistQuestionService;
    private final ChecklistMaintenanceService checklistMaintenanceService;
    private final ChecklistLikeService checklistLikeService;
    private final ChecklistStationService checklistStationService;
    private final QuestionService questionService;
    private final ChecklistShareService checklistShareService;
    private final ChecklistImageService checklistImageService;

    @Transactional
    public Long createChecklist(User user, ChecklistRequest checklistRequest) {
        Room room = roomService.createRoom(checklistRequest.toRoomEntity());
        Checklist checklist = checklistService.createChecklist(checklistRequest.toChecklistEntity(room, user));
        createChecklistOptions(checklistRequest.options(), checklist);
        createChecklistQuestions(checklistRequest.questions(), checklist);
        createChecklistMaintenances(checklistRequest.room(), checklist);
        createChecklistStation(checklistRequest.room(), checklist);
        return checklist.getId();
    }

    @Transactional
    public Long createChecklistV2(User user, ChecklistRequest checklistRequest, List<MultipartFile> images) {
        Room room = roomService.createRoom(checklistRequest.toRoomEntity());
        Checklist checklist = checklistService.createChecklist(checklistRequest.toChecklistEntity(room, user));
        createChecklistOptions(checklistRequest.options(), checklist);
        createChecklistQuestions(checklistRequest.questions(), checklist);
        createChecklistMaintenances(checklistRequest.room(), checklist);
        createChecklistStation(checklistRequest.room(), checklist);
        createChecklistImage(images, checklist);
        return checklist.getId();
    }

    private void createChecklistOptions(List<Integer> options, Checklist checklist) {
        List<ChecklistOption> checklistOptions = options.stream()
                .map(option -> new ChecklistOption(checklist, option))
                .toList();
        checklistOptionService.createOptions(checklistOptions);
    }

    private void createChecklistQuestions(List<QuestionRequest> questions, Checklist checklist) {
        List<ChecklistQuestion> checklistQuestions = questions.stream()
                .map(question -> new ChecklistQuestion(
                        checklist,
                        questionService.readQuestion(question.questionId()),
                        Answer.from(question.answer())))
                .toList();
        checklistQuestionService.createQuestions(checklistQuestions);
    }

    private void createChecklistMaintenances(RoomRequest room, Checklist checklist) {
        List<ChecklistMaintenance> checklistMaintenances =
                room.includedMaintenances().stream()
                        .map(maintenanceId -> new ChecklistMaintenance(checklist,
                                MaintenanceItem.fromId(maintenanceId)))
                        .toList();
        checklistMaintenanceService.createMaintenances(checklistMaintenances);
    }

    private void createChecklistStation(RoomRequest roomRequest, Checklist checklist) {
        checklistStationService.createChecklistStations(checklist, roomRequest.latitude(), roomRequest.longitude());
    }

    private void createChecklistImage(List<MultipartFile> images, Checklist checklist) {
        checklistImageService.createChecklistImages(checklist, images);
    }

    @Transactional
    public ChecklistShareResponse createChecklistShare(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);
        ChecklistShare checklistShare = checklistShareService.createChecklistShare(checklist);

        return ChecklistShareResponse.from(checklistShare);
    }

    @Transactional(readOnly = true)
    public SelectedChecklistResponse readChecklist(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);

        return assembleChecklistResponse(checklist);
    }

    @Transactional(readOnly = true)
    public SelectedChecklistResponse readSharedChecklist(String token) {
        ChecklistShare checklistShare = checklistShareService.readChecklistShare(token);
        Checklist checklist = checklistShare.getChecklist();

        return assembleChecklistResponse(checklist);

    }

    private SelectedChecklistResponse assembleChecklistResponse(Checklist checklist) {
        List<Integer> maintenances = readChecklistMaintenances(checklist);
        List<SelectedOptionResponse> options = readChecklistOptions(checklist);
        List<SelectedCategoryQuestionsResponse> questions = readChecklistQuestions(checklist);
        SelectedRoomResponse room = SelectedRoomResponse.of(checklist, maintenances);
        boolean isLiked = checklistLikeService.isLikedChecklist(checklist);
        SubwayStationResponses stations = readChecklistStations(checklist);

        return SelectedChecklistResponse.of(room, options, questions, isLiked, stations);
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

        return questionService.readAllCategories().stream()
                .map(category -> categorizeChecklistQuestions(category, checklistQuestions))
                .filter(selectedCategoryQuestionsResponse -> !selectedCategoryQuestionsResponse.questions().isEmpty())
                .toList();
    }

    private SelectedCategoryQuestionsResponse categorizeChecklistQuestions(Category category,
                                                                           List<ChecklistQuestion> checklistQuestions) {
        List<SelectedQuestionResponse> selectedQuestionResponse = checklistQuestionService.categorizeChecklistQuestions(
                        category, checklistQuestions)
                .stream()
                .map(checklistQuestion -> new SelectedQuestionResponse(checklistQuestion,
                        questionService.readHighlights(checklistQuestion.getQuestionId())))
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
        List<ChecklistPreviewResponse> responses = likedChecklists.stream()
                .map(this::mapToChecklistPreview)
                .toList();
        return ChecklistsPreviewResponse.from(responses);
    }

    @Transactional(readOnly = true)
    public ChecklistCompareResponses compareChecklists(User user, List<Long> checklistIds) {
        validateChecklistCompareCount(checklistIds);
        List<ChecklistCompareResponse> checklistCompareResponses = checklistIds.stream()
                .map(checklistId -> compareChecklist(user, checklistId))
                .toList();
        return new ChecklistCompareResponses(checklistCompareResponses);
    }

    private void validateChecklistCompareCount(List<Long> checklistIds) {
        if (checklistIds.size() != CHECKLIST_COMPARE_COUNT) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_COMPARE_INVALID_COUNT);
        }
    }

    private ChecklistCompareResponse compareChecklist(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);
        List<ChecklistOption> options = checklistOptionService.readChecklistOptions(checklist);
        List<ChecklistStation> checklistStations = checklistStationService.readChecklistStationsByChecklist(checklist);
        List<ChecklistMaintenance> maintenances = checklistMaintenanceService.readChecklistMaintenances(checklist);
        CategoryScoreResponses categoryScoreResponses = compareCategories(user, checklistId);
        return ChecklistCompareResponse.of(checklist, options, checklistStations, maintenances,
                categoryScoreResponses);
    }

    private CategoryScoreResponses compareCategories(User user, Long checklistId) {
        List<CategoryScoreResponse> categoryScoreResponses = new ArrayList<>();
        List<Category> categories = checklistQuestionService.findCategories(user, checklistId);
        for (Category category : categories) {
            Integer score = checklistQuestionService.calculateCategoryScore(checklistId, category.getId());
            categoryScoreResponses.add(new CategoryScoreResponse(category.getId(), category.getName(), score));
        }
        return new CategoryScoreResponses(categoryScoreResponses);
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
        checklistShareService.deleteChecklistShare(checklist);
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
        SubwayStationResponse stationResponse = readNearestStation(checklist);
        return ChecklistPreviewResponse.of(checklist, stationResponse, isLiked);
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
        updateChecklistStations(checklistRequest.room(), checklist);
    }

    @Transactional
    public void updateChecklistByIdV2(User user, long checklistId, ChecklistRequest checklistRequest, List<MultipartFile> updateImages) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);

        roomService.updateRoom(checklist.getRoom(), checklistRequest.toRoomEntity());
        checklistService.updateChecklist(checklist, checklistRequest.toChecklistEntity(checklist.getRoom(), user));

        updateChecklistOptions(checklistRequest, checklist);
        updateChecklistQuestions(checklistRequest, checklist);
        updateChecklistMaintenances(checklistRequest, checklist);
        updateChecklistStations(checklistRequest.room(), checklist);
        updateChecklistImage(updateImages, checklist);
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

    private void updateChecklistStations(RoomRequest roomRequest, Checklist checklist) {
        Double latitude = roomRequest.latitude();
        Double longitude = roomRequest.longitude();
        checklistStationService.updateChecklistStation(checklist, latitude, longitude);
    }

    private void updateChecklistImage(List<MultipartFile> images, Checklist checklist) {
        checklistImageService.updateChecklistImage(checklist, images);
    }

    @Transactional
    public void deleteChecklistImageById(User user, long checklistId, long imageId) {
        checklistService.readChecklist(user, checklistId);
        checklistImageService.deleteById(checklistId, imageId);
    }
}
