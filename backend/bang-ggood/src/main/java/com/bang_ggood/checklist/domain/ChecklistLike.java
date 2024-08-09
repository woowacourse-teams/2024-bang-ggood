package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import java.util.Objects;

@Entity
public class ChecklistLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Checklist checklist;

    public ChecklistLike(Checklist checklist) {
        this.checklist = checklist;
    }

    protected ChecklistLike() {
    }

    public Long getId() {
        return id;
    }

    public Checklist getChecklist() {
        return checklist;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistLike that = (ChecklistLike) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ChecklistLike{" +
                "id=" + id +
                ", checklist=" + checklist +
                '}';
    }
}
