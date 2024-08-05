package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.category.domain.Badge;

public record BadgeResponse(Integer badgeId, String shortName, String longName) {

    public static BadgeResponse from(Badge badge) {
        return new BadgeResponse(badge.getId(), badge.getShortNameWithEmoji(), badge.getLongNameWithEmoji());
    }
}
