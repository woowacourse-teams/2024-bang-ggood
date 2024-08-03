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

    //TODO 테스트해야 함
    @Query("SELECT c FROM Checklist c "
            + "JOIN FETCH Room r "
            + "ON c.id = :id "
            + "AND c.room.id = r.id")
    Optional<Checklist> findById(@Param("id") long id);

    default Checklist getById(long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.CHECKLIST_NOT_FOUND));
    }

    List<Checklist> findByUser(User user);

    @Query("SELECT c FROM Checklist c "
            + "JOIN FETCH c.user u "
            + "JOIN FETCH c.room r "
            + "WHERE u = :user "
            + "AND c.id IN :checklistIds "
            + "AND c.deleted = false")
    List<Checklist> findByUserAndIdIn(@Param("user") User user, @Param("checklistIds") List<Long> checklistIds);

    @Query("SELECT COUNT(c) FROM Checklist c "
            + "WHERE c.user = :user "
            + "AND c.id IN :ids "
            + "AND c.deleted = false")
    long countAllByIdIn(@Param("user") User user, @Param("ids") List<Long> ids);
}
