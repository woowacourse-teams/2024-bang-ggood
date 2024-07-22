package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
}
