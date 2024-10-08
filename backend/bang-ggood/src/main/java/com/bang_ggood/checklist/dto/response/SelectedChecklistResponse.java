package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.option.dto.response.SelectedOptionResponse;
import com.bang_ggood.question.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import java.util.List;

public record SelectedChecklistResponse(SelectedRoomResponse room,
                                        List<SelectedOptionResponse> options,
                                        List<SelectedCategoryQuestionsResponse> categories,
                                        boolean isLiked) {
    public static SelectedChecklistResponse of(SelectedRoomResponse room, List<SelectedOptionResponse> options,
                                               List<SelectedCategoryQuestionsResponse> categories, boolean isLiked) {
        return new SelectedChecklistResponse(room, options, categories, isLiked);
    }
}
