package com.bang_ggood.checklist.dto;

import com.bang_ggood.category.dto.WrittenCategoryQuestionsResponse;
import com.bang_ggood.room.dto.WrittenRoomResponse;
import java.util.List;

public record WrittenChecklistResponse(WrittenRoomResponse room, List<Integer> options, List<WrittenCategoryQuestionsResponse> categories) {
}
