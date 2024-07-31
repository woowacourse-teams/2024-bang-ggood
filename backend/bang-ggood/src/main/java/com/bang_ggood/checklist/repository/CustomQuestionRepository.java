package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.CustomQuestion;
import com.bang_ggood.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CustomQuestionRepository extends JpaRepository<CustomQuestion, Long> {

    List<CustomQuestion> findByUser(User user);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("DELETE FROM CustomQuestion WHERE user.id = :#{#user.id}")
    void deleteAllByUser(@Param("user") User user);

}
