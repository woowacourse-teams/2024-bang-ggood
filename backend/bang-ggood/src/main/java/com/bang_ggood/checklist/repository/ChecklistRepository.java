package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

    @Query("SELECT c FROM Checklist c "
            + "JOIN FETCH c.room r "
            + "LEFT JOIN FETCH c.questions q "
            + "WHERE c.id = :id "
            + "AND c.deleted = false")
    Optional<Checklist> findById(@Param("id") long id);


    default Checklist getById(@Param("id") long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.CHECKLIST_NOT_FOUND));
    }

    @Query("SELECT c FROM Checklist c WHERE c.deleted = false")
    List<Checklist> findAllByUser(User user);

    @Query("SELECT c FROM Checklist c "
            + "JOIN FETCH c.user u "
            + "JOIN FETCH c.room r "
            + "WHERE u = :user "
            + "AND c.id IN :checklistIds "
            + "AND c.deleted = false")
    List<Checklist> findByUserAndIdIn(@Param("user") User user,
                                      @Param("checklistIds") List<Long> checklistIds);

    @Query("SELECT COUNT(c) > 0 FROM Checklist c "
            + "WHERE c.id = :id "
            + "AND c.deleted = false")
    boolean existsById(@Param("id") long id);

    @Transactional
    @Modifying
    @Query("UPDATE Checklist c "
            + "SET c.deleted = true "
            + "WHERE c.id = :id")
    void deleteById(@Param("id") long id);
}
