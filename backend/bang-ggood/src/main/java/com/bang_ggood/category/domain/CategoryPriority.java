package com.bang_ggood.category.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CategoryPriority extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_id")
    private Integer categoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    protected CategoryPriority() {
    }

    public CategoryPriority(Integer categoryId, User user) {
        this.categoryId = categoryId;
        this.user = user;
    }
}
