package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

    //TODO 테스트해야 함
    @Query("SELECT c FROM Checklist c "
            + "JOIN FETCH Room r "
            + "ON c.id = :id "
            + "AND c.room.id = r.id")
    Optional<Checklist> findById(long id);

    default Checklist getById(long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.CHECKLIST_NOT_FOUND));
    }
  
    List<Checklist> findByUser(User user);
  
    List<Checklist> findByUserAndIdIn(User user, List<Long> checklistIds);
}
