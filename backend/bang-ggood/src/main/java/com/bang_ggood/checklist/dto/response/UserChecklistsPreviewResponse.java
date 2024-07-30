package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import java.util.List;

public record UserChecklistsPreviewResponse(List<UserChecklistPreviewResponse> checklists) {
}
