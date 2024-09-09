package com.bang_ggood.option.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.domain.Option;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChecklistOptionService {

    private final ChecklistOptionRepository checklistOptionRepository;

    public ChecklistOptionService(ChecklistOptionRepository checklistOptionRepository) {
        this.checklistOptionRepository = checklistOptionRepository;
    }

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

}
