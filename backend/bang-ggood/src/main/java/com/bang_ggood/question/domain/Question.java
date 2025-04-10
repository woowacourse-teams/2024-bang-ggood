package com.bang_ggood.question.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class Question extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false)
    private String title;

    private String subtitle;

    private boolean isDefault;

    public Question(Category category, User user, String title, String subtitle, boolean isDefault) {
        this.category = category;
        this.user = user;
        this.title = title;
        this.subtitle = subtitle;
        this.isDefault = isDefault;
    }

    public boolean isSelected(List<CustomChecklistQuestion> questions) {
        return questions.stream()
                .anyMatch(question -> question.getQuestionId() == this.id);
    }

    public boolean isOwnedBy(User user) {
        return this.user.equals(user);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Question that = (Question) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
