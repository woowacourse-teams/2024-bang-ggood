package com.bang_ggood.category.repository;

import com.bang_ggood.category.domain.CategoryPriority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryPriorityRepository extends JpaRepository<CategoryPriority, Long> {
}
