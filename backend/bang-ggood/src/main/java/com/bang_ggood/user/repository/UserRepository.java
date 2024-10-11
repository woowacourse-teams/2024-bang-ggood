package com.bang_ggood.user.repository;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.Email;
import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    default User getUserById(Long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.USER_NOT_FOUND));
    }

    @Query("SELECT u FROM User u WHERE u.userType = :userType and u.deleted = false ")
    List<User> findUserByUserType(@Param("userType") UserType userType);

    @Query("SELECT u FROM User u WHERE u.email = :email and u.loginType = :loginType and u.deleted = false")
    Optional<User> findByEmailAndLoginType(@Param("email") String email, @Param("loginType") LoginType loginType);

    @Transactional
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE User u SET u.deleted = true ")
    void deleteByUser(@Param("user") User user);
}
