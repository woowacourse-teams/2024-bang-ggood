package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

    //TODO: 논리적 삭제 리팩토링
    @Query("SELECT c FROM Checklist c "
            + "JOIN FETCH Room r "
            + "ON c.id = :id "
            + "AND c.room.id = r.id")
    Optional<Checklist> findById(@Param("id") long id);

    //TODO: 논리적 삭제 리팩토링
    default Checklist getById(long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.CHECKLIST_NOT_FOUND));
    }

    //TODO: 논리적 삭제 리팩토링
    List<Checklist> findByUser(User user);

    //TODO: 논리적 삭제 리팩토링
    List<Checklist> findByUserAndIdIn(User user, List<Long> checklistIds);

    //TODO: 논리적 삭제 리팩토링
    long countAllByIdIn(List<Long> ids);
}
