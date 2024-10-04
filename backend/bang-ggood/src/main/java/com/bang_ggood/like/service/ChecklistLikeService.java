package com.bang_ggood.like.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChecklistLikeService {

    private final ChecklistLikeRepository checklistLikeRepository;

    public ChecklistLikeService(ChecklistLikeRepository checklistLikeRepository) {
        this.checklistLikeRepository = checklistLikeRepository;
    }

    @Transactional
    public void createLike(User user, Checklist checklist) {
        validateChecklistOwnership(user, checklist);

        if (isChecklistAlreadyLiked(checklist)) {
            return;
        }

        checklistLikeRepository.save(new ChecklistLike(checklist));
    }

    private boolean isChecklistAlreadyLiked(Checklist checklist) {
        return checklistLikeRepository.existsByChecklist(checklist);
    }

    private void validateChecklistOwnership(User user, Checklist checklist) {
        if (!checklist.isOwnedBy(user)) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER);
        }
    }

    @Transactional
    public boolean isLikedChecklist(Checklist checklist) {
        return checklistLikeRepository.existsByChecklist(checklist);
    }

    @Transactional
    public void deleteLike(User user, Checklist checklist) {
        validateChecklistOwnership(user, checklist);
        ChecklistLike checklistLike = checklistLikeRepository.getByChecklistId(checklist.getId());

        checklistLikeRepository.deleteById(checklistLike.getId());
    }
}
