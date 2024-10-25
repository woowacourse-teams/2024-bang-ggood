package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

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
    public void deleteById(Long id) {
        checklistRepository.deleteById(id);
    }
}
