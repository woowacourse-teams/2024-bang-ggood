package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistShare;
import com.bang_ggood.checklist.repository.ChecklistShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChecklistShareService {

    private final ChecklistShareRepository checklistShareRepository;

    @Transactional
    public ChecklistShare createChecklistShare(Checklist checklist) {
        return checklistShareRepository.findByChecklistId(checklist.getId())
                .orElseGet(() -> {
                    String token = UUID.randomUUID().toString();
                    ChecklistShare checklistShare = new ChecklistShare(checklist.getId(), token);

                    return checklistShareRepository.save(checklistShare);
                });
    }

    @Transactional(readOnly = true)
    public ChecklistShare readChecklistShare(String token) {
        return checklistShareRepository.getByToken(token);
    }

    @Transactional
    public void deleteChecklistShare(Checklist checklist) {
        checklistShareRepository.deleteById(checklist.getId());
    }
}
