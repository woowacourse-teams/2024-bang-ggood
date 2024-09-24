package com.bang_ggood.option.dto.response;

import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.domain.Option;

public record SelectedOptionResponse(Integer optionId, String optionName) {

    public static SelectedOptionResponse from(ChecklistOption checklistOption) {
        return new SelectedOptionResponse(checklistOption.getOptionId(), Option.from(checklistOption).getName());
    }
}
