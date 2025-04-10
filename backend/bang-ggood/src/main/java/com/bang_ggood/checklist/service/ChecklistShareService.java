package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistShare;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.ChecklistShareRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChecklistShareService {

    private final ChecklistShareRepository checklistShareRepository;
    private final ChecklistRepository checklistRepository;

    @Transactional
    public ChecklistShare createChecklistShare(Checklist checklist) {
        return checklistShareRepository.findByChecklistId(checklist.getId())
                .orElseGet(() -> {
                    String token = UUID.randomUUID().toString();
                    ChecklistShare checklistShare = new ChecklistShare(checklist, token);

                    return checklistShareRepository.save(checklistShare);
                });
    }

    @Transactional(readOnly = true)
    public ChecklistShare readChecklistShare(User user, Long checklistId) {
        Checklist checklist = checklistRepository.getById(checklistId);
        validateChecklistOwnership(user, checklist);

        return checklistShareRepository.getByChecklistId(checklistId);
    }

    private void validateChecklistOwnership(User user, Checklist checklist) {
        if (!checklist.isOwnedBy(user)) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER);
        }
    }
}
