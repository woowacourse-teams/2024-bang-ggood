package com.bang_ggood.question.dto.request;

import java.util.List;

public record CustomChecklistUpdateRequest(List<Integer> questionIds) {
}
