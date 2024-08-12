package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.category.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import java.time.LocalDateTime;
import java.util.List;

public record SelectedChecklistResponse(LocalDateTime createdAt, SelectedRoomResponse room,
                                        List<SelectedOptionResponse> options,
                                        List<SelectedCategoryQuestionsResponse> categories) {
}
