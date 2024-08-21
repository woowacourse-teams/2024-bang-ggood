package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.category.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.checklist.domain.Answer;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistLike;
import com.bang_ggood.checklist.domain.ChecklistMaintenance;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.CustomChecklistQuestion;
import com.bang_ggood.checklist.domain.MaintenanceItem;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.request.QuestionRequest;
import com.bang_ggood.checklist.dto.response.CategoryCustomChecklistQuestionResponse;
import com.bang_ggood.checklist.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.CustomChecklistQuestionResponse;
import com.bang_ggood.checklist.dto.response.QuestionResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.SelectedOptionResponse;
import com.bang_ggood.checklist.dto.response.SelectedQuestionResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.repository.ChecklistLikeRepository;
import com.bang_ggood.checklist.repository.ChecklistMaintenanceRepository;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;
    private final ChecklistMaintenanceRepository checklistMaintenanceRepository;
    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;
    private final ChecklistLikeRepository checklistLikeRepository;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository,
                            ChecklistMaintenanceRepository checklistMaintenanceRepository,
                            CustomChecklistQuestionRepository customChecklistQuestionRepository,
                            ChecklistLikeRepository checklistLikeRepository) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
        this.checklistMaintenanceRepository = checklistMaintenanceRepository;
        this.customChecklistQuestionRepository = customChecklistQuestionRepository;
        this.checklistLikeRepository = checklistLikeRepository;
    }

    @Transactional
    public long createChecklist(User user, ChecklistRequest checklistRequest) {
        Room room = roomRepository.save(checklistRequest.toRoomEntity());

        Checklist checklist = checklistRequest.toChecklistEntity(room, user);
        checklistRepository.save(checklist);

        createChecklistOptions(checklistRequest, checklist);
        createChecklistQuestions(checklistRequest, checklist);
        createChecklistIncludedMaintenances(checklistRequest, checklist);
        return checklist.getId();
    }

    private void createChecklistOptions(ChecklistRequest checklistRequest, Checklist checklist) {
        List<Integer> optionIds = checklistRequest.options();
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

    private void createChecklistQuestions(ChecklistRequest checklistRequest, Checklist checklist) {
        validateQuestion(checklistRequest.questions());
        List<ChecklistQuestion> checklistQuestions = checklistRequest.questions().stream()
                .map(question -> new ChecklistQuestion(
                        checklist,
                        Question.fromId(question.questionId()),
                        Answer.from(question.answer())))
                .collect(Collectors.toList());
        checklistQuestionRepository.saveAll(checklistQuestions);
    }

    private void createChecklistIncludedMaintenances(ChecklistRequest checklistRequest, Checklist checklist) {
        validateIncludedMaintenance(checklistRequest.room().includedMaintenances());
        List<ChecklistMaintenance> checklistMaintenances =
                checklistRequest.room().includedMaintenances().stream()
                        .map(maintenanceId -> new ChecklistMaintenance(checklist,
                                MaintenanceItem.fromId(maintenanceId)))
                        .collect(Collectors.toList());
        checklistMaintenanceRepository.saveAll(checklistMaintenances);
    }

    private void validateIncludedMaintenance(List<Integer> includedMaintenances) {
        validateIncludedMaintenanceDuplicate(includedMaintenances);
        validateIncludedMaintenanceInvalid(includedMaintenances);
    }

    private void validateIncludedMaintenanceDuplicate(List<Integer> includedMaintenances) {
        Set<Integer> set = new HashSet<>();
        includedMaintenances.forEach(id -> {
            if (!set.add(id)) {
                throw new BangggoodException(ExceptionCode.MAINTENANCE_ITEM_DUPLICATE);
            }
        });
    }

    private void validateIncludedMaintenanceInvalid(List<Integer> includedMaintenances) {
        for (Integer maintenancesId : includedMaintenances) {
            if (!MaintenanceItem.contains(maintenancesId)) {
                throw new BangggoodException(ExceptionCode.MAINTENANCE_ITEM_INVALID);
            }
        }
    }

    @Transactional
    public void createChecklistLike(User user, long id) {
        Checklist checklist = checklistRepository.getById(id);

        validateChecklistLike(user, checklist);

        checklistLikeRepository.save(new ChecklistLike(checklist));
    }

    private void validateChecklistLike(User user, Checklist checklist) {
        validateChecklistOwnership(user, checklist);
        validateChecklistAlreadyLiked(checklist);
    }

    private void validateChecklistOwnership(User user, Checklist checklist) {
        if (!checklist.isOwnedBy(user)) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER);
        }
    }

    private void validateChecklistAlreadyLiked(Checklist checklist) {
        if (checklistLikeRepository.existsByChecklist(checklist)) {
            throw new BangggoodException(ExceptionCode.LIKE_ALREADY_EXISTS);
        }
    }

    @Transactional
    public ChecklistQuestionsResponse readChecklistQuestions(User user) {
        List<CustomChecklistQuestion> customChecklistQuestions = customChecklistQuestionRepository.findAllByUser(user);

        Map<Category, List<Question>> categoryQuestions = customChecklistQuestions.stream()
                .map(CustomChecklistQuestion::getQuestion)
                .collect(Collectors.groupingBy(Question::getCategory, LinkedHashMap::new, Collectors.toList()));

        List<CategoryQuestionsResponse> categoryQuestionsResponses = categoryQuestions.entrySet().stream()
                .map(categoryQuestionEntry -> CategoryQuestionsResponse.of(
                        categoryQuestionEntry.getKey(),
                        categoryQuestionEntry.getValue().stream()
                                .map(QuestionResponse::new)
                                .toList()))
                .toList();

        return new ChecklistQuestionsResponse(categoryQuestionsResponses);
    }

    private void validateQuestion(List<QuestionRequest> questions) {
        validateQuestionDuplicate(questions);
        validateQuestionInvalid(questions);
    }

    private void validateQuestionDuplicate(List<QuestionRequest> questions) {
        Set<Integer> set = new HashSet<>();
        questions.forEach(question -> {
            if (!set.add(question.questionId())) {
                throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
            }
        });
    }

    private void validateQuestionInvalid(List<QuestionRequest> questions) {
        for (QuestionRequest questionRequest : questions) {
            if (!Question.contains(questionRequest.questionId())) {
                throw new BangggoodException(ExceptionCode.QUESTION_INVALID);
            }
        }
    }

    @Transactional
    public CategoryCustomChecklistQuestionsResponse readAllCustomChecklistQuestions(
            User user) { // TODO custom-checklist 도메인 분리 및 리팩토링
        List<CustomChecklistQuestion> customChecklistQuestions = customChecklistQuestionRepository.findAllByUser(user);
        List<CategoryCustomChecklistQuestionResponse> allCategoryCustomChecklistQuestions = getAllCategoryCustomChecklistQuestions(
                customChecklistQuestions);

        return new CategoryCustomChecklistQuestionsResponse(allCategoryCustomChecklistQuestions);
    }

    private List<CategoryCustomChecklistQuestionResponse> getAllCategoryCustomChecklistQuestions(
            List<CustomChecklistQuestion> customChecklistQuestions) {
        List<CategoryCustomChecklistQuestionResponse> response = new ArrayList<>();

        for (Category category : Category.values()) {
            List<Question> categoryQuestions = Question.findQuestionsByCategory(category);
            List<CustomChecklistQuestionResponse> questions = categoryQuestions.stream()
                    .map(question -> new CustomChecklistQuestionResponse(question,
                            question.isSelected(customChecklistQuestions)))
                    .toList();
            response.add(new CategoryCustomChecklistQuestionResponse(category.getId(), category.getName(), questions));
        }

        return response;
    }

    @Transactional
    public SelectedChecklistResponse readChecklistById(User user, long id) {
        Checklist checklist = checklistRepository.getById(id);
        validateChecklistOwnership(user, checklist);

        List<Integer> maintenanceIds = readChecklistMaintenancesByChecklist(checklist);
        SelectedRoomResponse selectedRoomResponse = SelectedRoomResponse.of(checklist, maintenanceIds);
        List<SelectedOptionResponse> options = readOptionsByChecklistId(id);
        List<SelectedCategoryQuestionsResponse> selectedCategoryQuestionsResponse = readCategoryQuestionsByChecklistId(id);

        return new SelectedChecklistResponse(selectedRoomResponse, options, selectedCategoryQuestionsResponse);
    }

    private List<Integer> readChecklistMaintenancesByChecklist(Checklist checklist) {
        return checklistMaintenanceRepository.findAllByChecklist(checklist).stream()
                .map(ChecklistMaintenance::getMaintenanceItemId)
                .toList();
    }

    private List<SelectedOptionResponse> readOptionsByChecklistId(long checklistId) {
        return checklistOptionRepository.findByChecklistId(checklistId)
                .stream()
                .map(checklistOption -> SelectedOptionResponse.of(checklistOption.getOptionId()))
                .toList();
    }

    private List<SelectedCategoryQuestionsResponse> readCategoryQuestionsByChecklistId(long checklistId) {
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findByChecklistId(checklistId);

        return Arrays.stream(Category.values())
                .map(category -> readQuestionsByCategory(category, checklistQuestions))
                .toList();
    }

    private SelectedCategoryQuestionsResponse readQuestionsByCategory(Category category,
                                                                      List<ChecklistQuestion> checklistQuestions) {
        List<SelectedQuestionResponse> selectedQuestionResponse =
                Question.filterWithUnselectedGrade(category, checklistQuestions).stream()
                        .map(SelectedQuestionResponse::new)
                        .toList();

        return SelectedCategoryQuestionsResponse.of(category, selectedQuestionResponse);
    }

    @Transactional
    public UserChecklistsPreviewResponse readChecklistsPreview(User user) {
        List<Checklist> checklists = checklistRepository.findAllByUser(user);
        List<UserChecklistPreviewResponse> responses = checklists.stream()
                .map(this::getChecklistPreview)
                .toList();

        return new UserChecklistsPreviewResponse(responses);
    }

    private UserChecklistPreviewResponse getChecklistPreview(Checklist checklist) {
        boolean isLiked = checklistLikeRepository.existsByChecklist(checklist);
        return UserChecklistPreviewResponse.of(checklist, isLiked);
    }

    @Transactional
    public UserChecklistsPreviewResponse readLikedChecklistsPreview(User user) {
        List<Checklist> likedChecklists = checklistRepository.findAllByUserAndIsLiked(user);
        List<UserChecklistPreviewResponse> responses = likedChecklists.stream()
                .map(checklist -> UserChecklistPreviewResponse.of(checklist, true))
                .toList();
        return new UserChecklistsPreviewResponse(responses);
    }

    @Transactional
    public void updateChecklistById(User user, long id, ChecklistRequest checklistRequest) {
        Checklist checklist = checklistRepository.getById(id);
        validateChecklistOwnership(user, checklist);

        Room room = checklist.getRoom();
        room.change(checklistRequest.toRoomEntity());

        Checklist updateChecklist = checklistRequest.toChecklistEntity(room, user);
        checklist.change(updateChecklist);

        updateChecklistOptions(checklistRequest, checklist);
        updateChecklistQuestions(checklistRequest, checklist);
        updateChecklistIncludedMaintenances(checklistRequest, checklist);
    }

    private void updateChecklistOptions(ChecklistRequest checklistRequest, Checklist checklist) {
        List<Integer> optionIds = checklistRequest.options();
        validateOptions(optionIds);
        List<ChecklistOption> checklistOptions = optionIds.stream()
                .map(option -> new ChecklistOption(checklist, option))
                .toList();
        checklistOptionRepository.deleteAllByChecklistId(checklist.getId());
        checklistOptionRepository.saveAll(checklistOptions);
    }

    private void updateChecklistQuestions(ChecklistRequest checklistRequest, Checklist checklist) {
        validateQuestion(checklistRequest.questions());

        List<ChecklistQuestion> questions = checklist.getQuestions();
        List<ChecklistQuestion> updateQuestions = checklistRequest.questions().stream()
                .map(question -> new ChecklistQuestion(
                        checklist,
                        Question.fromId(question.questionId()),
                        Answer.from(question.answer())))
                .toList();

        validateSameQuestions(questions, updateQuestions);
        IntStream.range(0, questions.size())
                .forEach(i -> questions.get(i).change(updateQuestions.get(i)));
    }

    private void updateChecklistIncludedMaintenances(ChecklistRequest checklistRequest, Checklist checklist) {
        List<Integer> maintenanceIds = checklistRequest.room().includedMaintenances();
        validateIncludedMaintenance(maintenanceIds);
        List<ChecklistMaintenance> checklistMaintenances = maintenanceIds.stream()
                .map(maintenanceId -> new ChecklistMaintenance(checklist,
                        MaintenanceItem.fromId(maintenanceId)))
                .toList();
        checklistMaintenanceRepository.deleteAllByChecklistId(checklist.getId());
        checklistMaintenanceRepository.saveAll(checklistMaintenances);
    }

    private void validateSameQuestions(List<ChecklistQuestion> questions, List<ChecklistQuestion> updateQuestions) {
        if (questions.size() != updateQuestions.size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_DIFFERENT);
        }
        IntStream.range(0, questions.size())
                .filter(i -> questions.get(i).isDifferentQuestionId(updateQuestions.get(i)))
                .findAny()
                .ifPresent(i -> {
                    throw new BangggoodException(ExceptionCode.QUESTION_DIFFERENT);
                });
    }

    @Transactional
    public void updateCustomChecklist(User user, CustomChecklistUpdateRequest request) {
        List<Integer> questionIds = request.questionIds();
        validateCustomChecklistQuestionsIsNotEmpty(questionIds);
        validateCustomChecklistQuestionsDuplication(questionIds);

        customChecklistQuestionRepository.deleteAllByUser(user);

        List<CustomChecklistQuestion> customChecklistQuestions = questionIds.stream()
                .map(Question::fromId)
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();
        customChecklistQuestionRepository.saveAll(customChecklistQuestions);
    }

    private void validateCustomChecklistQuestionsIsNotEmpty(List<Integer> questionIds) {
        if (questionIds.isEmpty()) {
            throw new BangggoodException(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY);
        }
    }

    private void validateCustomChecklistQuestionsDuplication(List<Integer> questionIds) {
        if (questionIds.size() != Set.copyOf(questionIds).size()) {
            throw new BangggoodException(ExceptionCode.QUESTION_DUPLICATED);
        }
    }

    @Transactional
    public void deleteChecklistById(User user, long id) {
        Checklist checklist = checklistRepository.getById(id);
        validateChecklistOwnership(user, checklist);
        checklistQuestionRepository.deleteAllByChecklistId(checklist.getId());
        checklistOptionRepository.deleteAllByChecklistId(checklist.getId());
        checklistMaintenanceRepository.deleteAllByChecklistId(checklist.getId());
        checklistRepository.deleteById(id);
        roomRepository.deleteById(checklist.getRoom().getId());
    }

    @Transactional
    public void deleteChecklistLikeByChecklistId(User user, long checklistId) {
        Checklist checklist = checklistRepository.getById(checklistId);
        validateChecklistOwnership(user, checklist);
        ChecklistLike checklistLike = checklistLikeRepository.getByChecklistId(checklistId);

        checklistLikeRepository.deleteById(checklistLike.getId());
    }
}
