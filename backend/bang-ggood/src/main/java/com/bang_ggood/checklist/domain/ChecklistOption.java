package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;

@Table(name = "checklist_option")
@Entity
public class ChecklistOption extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Checklist checklist;

    @Column(nullable = false)
    private Integer optionId;

    public ChecklistOption(Checklist checklist, Integer optionId) {
        this.checklist = checklist;
        this.optionId = optionId;
    }

    protected ChecklistOption() {
    }

    public Long getId() {
        return id;
    }

    public Checklist getChecklist() {
        return checklist;
    }

    public Integer getOptionId() {
        return optionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistOption that = (ChecklistOption) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ChecklistOption{" +
                "id=" + id +
                ", checklist=" + checklist +
                ", optionId=" + optionId +
                '}';
    }
}
