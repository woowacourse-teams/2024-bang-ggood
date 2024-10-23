package com.bang_ggood.question;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.QuestionEntity;
import java.util.List;

public class ChecklistQuestionFixture {

    public static ChecklistQuestion CHECKLIST1_QUESTION1(Checklist checklist, QuestionEntity question) {
        return new ChecklistQuestion(
                checklist,
                question,
                Answer.BAD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION2(Checklist checklist, QuestionEntity question) {
        return new ChecklistQuestion(
                checklist,
                question,
                Answer.GOOD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION2_UPDATE_ANSWER(Checklist checklist, QuestionEntity question) {
        return new ChecklistQuestion(
                checklist,
                question,
                Answer.BAD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION11(Checklist checklist, QuestionEntity question) {
        return new ChecklistQuestion(
                checklist,
                question,
                null
        );
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS(Checklist checklist, QuestionEntity question1, QuestionEntity question2) {
        return List.of(CHECKLIST1_QUESTION1(checklist, question1), CHECKLIST1_QUESTION2(checklist, question2));
    }

    public static List<ChecklistQuestion> CHECKLIST1_DUPLICATE(Checklist checklist, QuestionEntity question) {
        return List.of(CHECKLIST1_QUESTION1(checklist, question), CHECKLIST1_QUESTION1(checklist, question));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_UPDATE(Checklist checklist, QuestionEntity question1, QuestionEntity question2) {
        return List.of(CHECKLIST1_QUESTION1(checklist, question1), CHECKLIST1_QUESTION2_UPDATE_ANSWER(checklist, question2));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_DIFFERENT_LENGTH(Checklist checklist, QuestionEntity question) {
        return List.of(CHECKLIST1_QUESTION2_UPDATE_ANSWER(checklist, question));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_DIFFERENT_QUESTION(Checklist checklist, QuestionEntity question2, QuestionEntity question1) {
        return List.of(CHECKLIST1_QUESTION2_UPDATE_ANSWER(checklist, question2), CHECKLIST1_QUESTION11(checklist, question1));
    }
}
