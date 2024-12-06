package com.bang_ggood.auth.repository;

import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

public interface PasswordResetCodeRepository extends JpaRepository<PasswordResetCode, Long> {

    boolean existsByEmailAndCodeAndVerifiedTrue(Email email, String code);

    @Query("SELECT p FROM PasswordResetCode p " +
            "WHERE p.email = :email " +
            "AND p.code = :code " +
            "AND p.createdAt >= :timeLimit")
    Optional<PasswordResetCode> findByEmailAndCodeAndCreatedAtAfter(@Param("email") Email email,
                                                                    @Param("code") String code,
                                                                    @Param("timeLimit") LocalDateTime timeLimit);

    default PasswordResetCode getByEmailAndCodeAndCreatedAtAfter(@Param("email") Email email,
                                                                 @Param("code") String code,
                                                                 @Param("timeLimit") LocalDateTime timeLimit) {
        return findByEmailAndCodeAndCreatedAtAfter(email, code, timeLimit)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.AUTHENTICATION_PASSWORD_CODE_NOT_FOUND));
    }

    long countByEmail(Email email);

    @Transactional
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    void deleteByEmailAndCode(Email email, String code);

    @Transactional
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    void deleteByEmail(Email email);
}
