package com.bang_ggood.auth.repository;

import com.bang_ggood.auth.domain.PasswordResetCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetCodeRepository extends JpaRepository<PasswordResetCode, Long> {
}
