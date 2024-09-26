package com.bang_ggood.option.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChecklistOptionService {

    private final ChecklistOptionRepository checklistOptionRepository;

    public ChecklistOptionService(ChecklistOptionRepository checklistOptionRepository) {
        this.checklistOptionRepository = checklistOptionRepository;
    }

    @Transactional
    public void createOptions(List<ChecklistOption> options) {
        validateOptionDuplicate(options);
        checklistOptionRepository.saveAll(options);
    }

    private void validateOptionDuplicate(List<ChecklistOption> options) {
        Set<Integer> set = new HashSet<>();
        options.forEach(option -> {
            Integer id = option.getOptionId();
            if (!set.add(id)) {
                throw new BangggoodException(ExceptionCode.OPTION_DUPLICATED);
            }
        });
    }

    @Transactional(readOnly = true)
    public List<ChecklistOption> readChecklistOptions(Checklist checklist) {
        return checklistOptionRepository.findAllByChecklistId(checklist.getId());
    }

    @Transactional
    public void deleteAllByChecklistId(Long id) {
        checklistOptionRepository.deleteAllByChecklistId(id);
    }

    @Transactional
    public void updateOptions(Long checklistId, List<ChecklistOption> checklistOptions) {
        validateOptionDuplicate(checklistOptions);
        checklistOptionRepository.deleteAllByChecklistId(checklistId);
        checklistOptionRepository.saveAll(checklistOptions);
    }
}
