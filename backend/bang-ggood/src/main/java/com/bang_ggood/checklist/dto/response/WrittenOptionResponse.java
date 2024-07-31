package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Option;

public record WrittenOptionResponse(Integer optionId, String optionName) {

    public static WrittenOptionResponse of(int optionId) {
        return new WrittenOptionResponse(optionId, Option.fromId(optionId).getName());
    }
}
