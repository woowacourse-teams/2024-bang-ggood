package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.ChecklistShare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface ChecklistShareRepository extends JpaRepository<ChecklistShare, Long> {

    @Query("SELECT cs FROM ChecklistShare cs "
            + "WHERE cs.checklist.id = :checklistId "
            + "AND cs.deleted = false")
    Optional<ChecklistShare> findByChecklistId(@Param("checklistId") Long checklistId);
}
