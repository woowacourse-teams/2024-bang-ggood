package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import java.util.List;

public class ChecklistWithScoreReadResponse {

    private final Long checklistId;
    private final Integer score;
    private final SelectedRoomResponse room;
    private final List<SelectedOptionResponse> options;
    private final List<CategoryScoreReadResponse> categories;
    private Integer rank;

    public ChecklistWithScoreReadResponse(Long checklistId, Integer score,
                                          SelectedRoomResponse room, List<SelectedOptionResponse> options,
                                          List<CategoryScoreReadResponse> categories) {
        this.checklistId = checklistId;
        this.score = score;
        this.room = room;
        this.options = options;
        this.categories = categories;
    }

    public static ChecklistWithScoreReadResponse of(Checklist checklist, int checklistScore,
                                                    SelectedRoomResponse room, List<SelectedOptionResponse> options,
                                                    List<CategoryScoreReadResponse> categoryScores) {
        return new ChecklistWithScoreReadResponse(
                checklist.getId(),
                checklistScore,
                room,
                options,
                categoryScores
        );
    }

    public void assignRank(int rank) {
        this.rank = rank;
    }

    public Long getChecklistId() {
        return checklistId;
    }

    public Integer getScore() {
        return score;
    }

    public SelectedRoomResponse getRoom() {
        return room;
    }

    public List<SelectedOptionResponse> getOptions() {
        return options;
    }

    public List<CategoryScoreReadResponse> getCategories() {
        return categories;
    }

    public Integer getRank() {
        return rank;
    }
}
