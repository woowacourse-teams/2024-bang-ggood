package com.bang_ggood.user.dto;

import com.bang_ggood.user.domain.User;
import java.time.LocalDateTime;

public record UserResponse(Long userId, String userName, String userEmail, LocalDateTime createdAt) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(), user.getName(), user.getEmail(), user.getCreatedAt()
        );
    }
}
