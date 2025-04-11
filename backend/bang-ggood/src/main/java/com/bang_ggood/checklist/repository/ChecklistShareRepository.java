package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistShare;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface ChecklistShareRepository extends JpaRepository<ChecklistShare, Long> {

    @Query("SELECT cs FROM ChecklistShare cs "
            + "WHERE cs.checklist.id = :checklistId "
            + "AND cs.deleted = false")
    Optional<ChecklistShare> findByChecklistId(@Param("checklistId") Long checklistId);

    default ChecklistShare getByChecklistId(@Param("checklistId") Long checklistId) {
        return findByChecklistId(checklistId).
                orElseThrow(() -> new BangggoodException(ExceptionCode.CHECKLIST_SHARE_NOT_FOUND));
    }

    @Query("SELECT cs FROM ChecklistShare cs "
            + "JOIN FETCH cs.checklist "
            + "WHERE cs.token = :token "
            + "AND cs.deleted = false")
    Optional<ChecklistShare> findByToken(@Param("token") String token);

    default ChecklistShare getByToken(@Param("token") String token) {
        return findByToken(token).
                orElseThrow(() -> new BangggoodException(ExceptionCode.CHECKLIST_SHARE_NOT_FOUND));
    }
}
