package com.bang_ggood.checklist.dto;

import com.bang_ggood.checklist.dto.response.ChecklistWithScoreReadResponse;
import java.util.List;

public record ChecklistsWithScoreReadResponse(List<ChecklistWithScoreReadResponse> checklists) {
}
