package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.CategoryScoreReadResponse;
import java.util.List;

public record ChecklistWithScoreReadResponse(
        Long checklistId, String roomName, String address,
        Integer floor, Integer deposit, Integer rent,
        Integer contractTerm, String station, Integer walkingTime,
        Integer optionCount, Integer score,
        List<CategoryScoreReadResponse> categories
) {
    public static ChecklistWithScoreReadResponse of(Checklist checklist, int checklistOptionCount, int checklistScore, List<CategoryScoreReadResponse> categoryScores) {
        return new ChecklistWithScoreReadResponse(
                checklist.getId(),
                checklist.getRoomName(),
                checklist.getRoomAddress(),
                checklist.getRoomFloor(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getContractTerm(),
                checklist.getRoomStation(),
                checklist.getRoomWalkingTime(),
                checklistOptionCount,
                checklistScore,
                categoryScores
        );
    }
}
