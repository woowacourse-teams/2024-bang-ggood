package com.bang_ggood.checklist.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistLikeRepository extends JpaRepository<ChecklistLike, Long> {

    boolean existsByChecklist(Checklist checklist);
}
