package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.category.dto.response.WrittenCategoryQuestionsResponse;
import com.bang_ggood.room.dto.response.WrittenRoomResponse;

import java.util.List;

public record WrittenChecklistResponse(WrittenRoomResponse room, List<Integer> options,
                                       List<WrittenCategoryQuestionsResponse> categories) {
}
