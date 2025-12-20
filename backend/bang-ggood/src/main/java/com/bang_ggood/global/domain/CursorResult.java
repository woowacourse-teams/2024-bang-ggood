package com.bang_ggood.global.domain;

import com.bang_ggood.BaseEntity;
import java.time.LocalDateTime;
import java.util.List;

public class CursorResult<T extends BaseEntity> {

    private final List<T> items;
    private final LocalDateTime lastCursor;

    public CursorResult(LocalDateTime currentCursor, List<T> items) {
        this.items = items;
        this.lastCursor = findLastCursor(currentCursor, items);
    }

    private LocalDateTime findLastCursor(LocalDateTime currentCursor, List<T> items) {
        if (items == null || items.isEmpty()) return currentCursor;
        return items.get(items.size() - 1).getCreatedAt();
    }

    public List<T> getItems() {
        return items;
    }

    public LocalDateTime getLastCursor() {
        return lastCursor;
    }
}

