package com.bang_ggood.question.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "question") //TODO 변경필요
@Entity
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    private CategoryEntity category;

    @Column(nullable = false)
    private String title;

    private String subtitle;

    private boolean isDefault;

    public QuestionEntity(CategoryEntity category, String title, String subtitle, boolean isDefault) {
        this.category = category;
        this.title = title;
        this.subtitle = subtitle;
        this.isDefault = isDefault;
    }

    public boolean isSelected(List<CustomChecklistQuestion> questions) {
        return questions.stream()
                .anyMatch(question -> question.getQuestionId() == this.id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        QuestionEntity that = (QuestionEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
