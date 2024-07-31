package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.CustomQuestion;
import com.bang_ggood.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomQuestionRepository extends JpaRepository<CustomQuestion, Long> {

    List<CustomQuestion> findByUser(User user);

}
