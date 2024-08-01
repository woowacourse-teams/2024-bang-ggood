package com.bang_ggood.checklist.dto.request;

import java.util.List;

public record CustomChecklistUpdateRequest(List<Integer> questionIds) {
}
