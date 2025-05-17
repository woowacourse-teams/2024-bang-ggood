package com.bang_ggood.checklist.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ChecklistImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Checklist checklist;

    @Column(length = 1024)
    private String imageUrl;

    private int orderIndex;

    public ChecklistImage(Checklist checklist, String imageUrl, int orderIndex) {
        this.checklist = checklist;
        this.imageUrl = imageUrl;
        this.orderIndex = orderIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistImage that = (ChecklistImage) o;
        return orderIndex == that.orderIndex && Objects.equals(id, that.id) && Objects.equals(checklist,
                that.checklist) && Objects.equals(imageUrl, that.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, checklist, imageUrl, orderIndex);
    }
}
