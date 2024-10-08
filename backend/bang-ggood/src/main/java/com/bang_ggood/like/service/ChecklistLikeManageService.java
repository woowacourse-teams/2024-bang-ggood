package com.bang_ggood.like.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ChecklistLikeManageService {

    private final ChecklistService checklistService;
    private final ChecklistLikeService checklistLikeService;

    @Transactional
    public void createLike(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);
        checklistLikeService.createLike(user, checklist);
    }

    @Transactional
    public void deleteLike(User user, Long checklistId) {
        Checklist checklist = checklistService.readChecklist(user, checklistId);
        checklistLikeService.deleteLike(user, checklist);
    }
}
