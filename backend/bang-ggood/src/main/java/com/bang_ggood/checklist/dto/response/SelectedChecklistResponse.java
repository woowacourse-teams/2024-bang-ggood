package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.category.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import java.util.List;

public record SelectedChecklistResponse(SelectedRoomResponse room,
                                        boolean isLiked,
                                        List<SelectedOptionResponse> options,
                                        List<SelectedCategoryQuestionsResponse> categories) {
}
