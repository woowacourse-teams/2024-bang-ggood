package com.bang_ggood.like.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChecklistLikeService {

    private final ChecklistLikeRepository checklistLikeRepository;

    public ChecklistLikeService(ChecklistLikeRepository checklistLikeRepository) {
        this.checklistLikeRepository = checklistLikeRepository;
    }

    @Transactional
    public boolean hasUserLikedChecklist(Checklist checklist) {
        return checklistLikeRepository.existsByChecklist(checklist);
    }
}
