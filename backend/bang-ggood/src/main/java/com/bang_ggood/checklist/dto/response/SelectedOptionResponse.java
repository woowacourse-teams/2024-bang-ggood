package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Option;

public record SelectedOptionResponse(Integer optionId, String optionName) {

    public static SelectedOptionResponse of(int optionId) {
        return new SelectedOptionResponse(optionId, Option.fromId(optionId).getName());
    }
}
