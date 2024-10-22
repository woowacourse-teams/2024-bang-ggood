package com.bang_ggood.question.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.user.domain.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class CustomChecklistQuestion extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Enumerated(EnumType.STRING)
    private Question question;

    @JoinColumn(name = "question_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private QuestionEntity questionEntity;

    public CustomChecklistQuestion(User user, Question question, QuestionEntity questionEntity) {
        this.user = user;
        this.question = question;
        this.questionEntity = questionEntity;
    }

    public Integer getQuestionId() {
        return questionEntity.getId();
    }

    public boolean isSameCategory(CategoryEntity category) {
        return this.questionEntity.getCategory().equals(category);
    }
}
