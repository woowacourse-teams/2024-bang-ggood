package com.bang_ggood.global.repository;

import com.bang_ggood.checklist.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MonitoringChecklistRepository extends JpaRepository<Checklist, Long> {

    @Query("SELECT COUNT(c) FROM Checklist c WHERE c.deleted = false")
    long countActiveChecklists();
}
