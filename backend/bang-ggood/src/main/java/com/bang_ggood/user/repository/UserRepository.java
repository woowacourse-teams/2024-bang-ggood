package com.bang_ggood.user.repository;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    default User getUserById(Long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.USER_NOT_FOUND));
    }

    Optional<User> findByEmail(String email);
}
