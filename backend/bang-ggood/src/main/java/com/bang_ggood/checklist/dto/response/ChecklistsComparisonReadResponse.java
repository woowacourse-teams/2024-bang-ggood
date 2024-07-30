package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.dto.response.ChecklistComparisonReadResponse;
import java.util.List;

public record ChecklistsComparisonReadResponse(List<ChecklistComparisonReadResponse> checklists) {
}
