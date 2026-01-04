package com.bang_ggood.building.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.question.dto.response.CategoryScoreResponses;

public record BuildingChecklistResponse(Long checklistId, String userName, String roomName,
                                        Integer deposit, Integer rent, Integer optionCount,
                                        CategoryScoreResponses categories) {

    public static BuildingChecklistResponse of(Checklist checklist, String userName, Integer optionCount, CategoryScoreResponses categories) {
        return new BuildingChecklistResponse(
                checklist.getId(), userName, checklist.getName(), checklist.getDeposit(),
                checklist.getRent(), optionCount, categories
        );
    }
}
