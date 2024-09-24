package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.maintenance.repository.ChecklistMaintenanceRepository;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import com.bang_ggood.question.repository.ChecklistQuestionRepository;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

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
    public void updateChecklist(Checklist checklist, Checklist updateChecklist) {
        checklist.change(updateChecklist);
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
