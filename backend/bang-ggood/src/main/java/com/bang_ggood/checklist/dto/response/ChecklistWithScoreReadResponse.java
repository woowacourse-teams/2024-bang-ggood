package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistWithScoreReadResponse that = (ChecklistWithScoreReadResponse) o;
        return Objects.equals(checklistId, that.checklistId) && Objects.equals(score, that.score)
                && Objects.equals(room, that.room) && Objects.equals(options, that.options)
                && Objects.equals(categories, that.categories) && Objects.equals(rank, that.rank);
    }

    @Override
    public int hashCode() {
        return Objects.hash(checklistId, score, room, options, categories, rank);
    }

    @Override
    public String toString() {
        return "ChecklistWithScoreReadResponse{" +
                "checklistId=" + checklistId +
                ", score=" + score +
                ", room=" + room +
                ", options=" + options +
                ", categories=" + categories +
                ", rank=" + rank +
                '}';
    }
}
