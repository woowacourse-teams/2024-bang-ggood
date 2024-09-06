package com.bang_ggood.like.repository;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ChecklistLikeRepository extends JpaRepository<ChecklistLike, Long> {

    boolean existsByChecklist(Checklist checklist);

    default ChecklistLike getByChecklistId(long checklistId) {
        return findByChecklistId(checklistId)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.LIKE_NOT_EXISTS));
    }

    Optional<ChecklistLike> findByChecklistId(long checklistId);
}
