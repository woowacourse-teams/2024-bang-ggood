package com.bang_ggood.question.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.checklist.domain.Checklist;
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
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class ChecklistQuestion extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Checklist checklist;

    @Enumerated(EnumType.STRING)
    private Question question;

    @JoinColumn(name = "question_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private QuestionEntity questionEntity;

    @Enumerated(EnumType.STRING)
    private Answer answer;

    public ChecklistQuestion(Checklist checklist, Question question, QuestionEntity questionEntity, Answer answer) {
        this.checklist = checklist;
        this.question = question;
        this.answer = answer;
        this.questionEntity = questionEntity;
    }

    public void change(ChecklistQuestion checklistQuestion) {
        this.answer = checklistQuestion.answer;
    }

    public boolean isDifferentQuestionId(ChecklistQuestion checklistQuestion) { // TODO 리팩토링
        return !getQuestionId().equals(checklistQuestion.getQuestionId());
    }

    public Long getChecklistId() {
        return checklist.getId();
    }

    public Integer getQuestionId() {
        return questionEntity.getId();
    }

    public boolean isCategory(CategoryEntity category) {
        return questionEntity.getCategory().equals(category);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChecklistQuestion that = (ChecklistQuestion) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ChecklistQuestion{" +
                "id=" + id +
                ", checklist=" + checklist +
                ", questionEntity=" + questionEntity +
                ", answer=" + answer +
                '}';
    }
}
