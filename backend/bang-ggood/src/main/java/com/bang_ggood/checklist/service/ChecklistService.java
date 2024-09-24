package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.domain.MaintenanceItem;
import com.bang_ggood.maintenance.repository.ChecklistMaintenanceRepository;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.domain.Option;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.question.repository.ChecklistQuestionRepository;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.IntStream;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;
    private final ChecklistMaintenanceRepository checklistMaintenanceRepository;
    private final ChecklistLikeRepository checklistLikeRepository;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository,
                            ChecklistMaintenanceRepository checklistMaintenanceRepository,
                            ChecklistLikeRepository checklistLikeRepository) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
        this.checklistMaintenanceRepository = checklistMaintenanceRepository;
        this.checklistLikeRepository = checklistLikeRepository;
    }

    @Transactional
    public Checklist createChecklist(Checklist checklist) {
        return checklistRepository.save(checklist);
    }

    @Transactional(readOnly = true)
    public Checklist readChecklist(User user, Long checklistId) {
        Checklist checklist = checklistRepository.getById(checklistId);
        validateChecklistOwnership(user, checklist);

        return checklist;
    }

    private void validateChecklistOwnership(User user, Checklist checklist) {
        if (!checklist.isOwnedBy(user)) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER);
        }
    }

    @Transactional(readOnly = true)
    public List<Checklist> readAllChecklistsOrderByLatest(User user) {
        return checklistRepository.findAllByUserOrderByLatest(user);
    }

    @Transactional(readOnly = true)
    public List<Checklist> readLikedChecklistsPreview(User user) {
        return checklistRepository.findAllByUserAndIsLiked(user);
    }

    @Transactional
    public void updateChecklistById(User user, Long checklistId, ChecklistRequest checklistRequest) {
        Checklist checklist = checklistRepository.getById(checklistId);
        validateChecklistOwnership(user, checklist);

        Room room = checklist.getRoom();
        room.change(checklistRequest.toRoomEntity());

        Checklist updateChecklist = checklistRequest.toChecklistEntity(room, user);
        checklist.change(updateChecklist);

        updateChecklistOptions(checklistRequest, checklist);
        updateChecklistQuestions(checklistRequest, checklist);
        updateChecklistIncludedMaintenances(checklistRequest, checklist);
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
    public void deleteChecklistLikeByChecklistId(User user, long checklistId) {
        Checklist checklist = checklistRepository.getById(checklistId);
        validateChecklistOwnership(user, checklist);
        ChecklistLike checklistLike = checklistLikeRepository.getByChecklistId(checklistId);

        checklistLikeRepository.deleteById(checklistLike.getId());
    }

    @Transactional
    public void deleteById(long id) {
        checklistRepository.deleteById(id);
    }
}
