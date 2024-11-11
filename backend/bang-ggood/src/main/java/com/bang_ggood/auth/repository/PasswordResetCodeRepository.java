package com.bang_ggood.auth.repository;

import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.user.domain.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;

public interface PasswordResetCodeRepository extends JpaRepository<PasswordResetCode, Long> {

    boolean existsByEmailAndCode(Email email, String code);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END " +
            "FROM PasswordResetCode p " +
            "WHERE p.email = :email " +
            "AND p.code = :code " +
            "AND p.createdAt >= :timeLimit")
    boolean existsByEmailAndCodeAndCreatedAtAfter(@Param("email") Email email,
                                                  @Param("code") String code,
                                                  @Param("timeLimit") LocalDateTime timeLimit);

    void deleteByEmailAndCode(Email email, String code);
}
