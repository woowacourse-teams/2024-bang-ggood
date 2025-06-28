package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistImage;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

public interface ChecklistImageRepository extends JpaRepository<ChecklistImage, Long> {

    @Query("SELECT ci FROM ChecklistImage ci " +
            "JOIN FETCH ci.checklist c " +
            "WHERE ci.deleted = false "
            + "AND ci.id = :id")
    Optional<ChecklistImage> findById(@Param("id") Long id);

    default ChecklistImage getById(@Param("id") Long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.CHECKLIST_IMAGE_NOT_FOUND));
    }

    @Query("SELECT ci FROM ChecklistImage ci " +
            "JOIN FETCH ci.checklist c " +
            "WHERE ci.deleted = false " +
            "AND c.id = :checklistId")
    List<ChecklistImage> findByChecklistId(@Param("checklistId") Long checklistId);


    @Transactional
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE ChecklistImage ci "
            + "SET ci.deleted = true "
            + "WHERE ci.id = :id")
    void deleteById(@Param("id") Long id);

    @Query("SELECT COUNT(ci) "
            + "FROM ChecklistImage ci "
            + "WHERE ci.checklist.id = :checklistId "
            + "AND ci.deleted = false")
    int countByChecklistId(@Param("checklistId") Long checklistId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("UPDATE ChecklistImage ci "
            + "SET ci.deleted = true "
            + "WHERE ci.checklist.id = :checklistId")
    void deleteAllByChecklistId(@Param("checklistId") Long checklistId);
}
