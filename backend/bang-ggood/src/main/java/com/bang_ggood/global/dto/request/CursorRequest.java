package com.bang_ggood.global.dto.request;

import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;

public record CursorRequest(LocalDateTime cursor,
                            @Min(value = 1, message = "사이즈는 1 이상이어야 합니다.") int size) {

    public Pageable toPageable() {
        return Pageable.ofSize(size);
    }
}
