package com.bang_ggood.question;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import java.util.List;

public class ChecklistQuestionFixture {

    public static ChecklistQuestion CHECKLIST1_QUESTION1_BAD(Checklist checklist, Question question) {
        return new ChecklistQuestion(
                checklist,
                question,
                Answer.BAD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION2_GOOD(Checklist checklist, Question question) {
        return new ChecklistQuestion(
                checklist,
                question,
                Answer.GOOD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION2_UPDATE_ANSWER(Checklist checklist, Question question) {
        return new ChecklistQuestion(
                checklist,
                question,
                Answer.BAD
        );
    }

    public static ChecklistQuestion CHECKLIST1_QUESTION11(Checklist checklist, Question question) {
        return new ChecklistQuestion(
                checklist,
                question,
                null
        );
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS(Checklist checklist, Question question1, Question question2) {
        return List.of(CHECKLIST1_QUESTION1_BAD(checklist, question1), CHECKLIST1_QUESTION2_GOOD(checklist, question2));
    }

    public static List<ChecklistQuestion> CHECKLIST1_DUPLICATE(Checklist checklist, Question question) {
        return List.of(CHECKLIST1_QUESTION1_BAD(checklist, question), CHECKLIST1_QUESTION1_BAD(checklist, question));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_UPDATE(Checklist checklist, Question question1, Question question2) {
        return List.of(
                CHECKLIST1_QUESTION1_BAD(checklist, question1), CHECKLIST1_QUESTION2_UPDATE_ANSWER(checklist, question2));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_DIFFERENT_LENGTH(Checklist checklist,
                                                                                Question question) {
        return List.of(CHECKLIST1_QUESTION2_UPDATE_ANSWER(checklist, question));
    }

    public static List<ChecklistQuestion> CHECKLIST1_QUESTIONS_DIFFERENT_QUESTION(Checklist checklist,
                                                                                  Question question2,
                                                                                  Question question1) {
        return List.of(CHECKLIST1_QUESTION2_UPDATE_ANSWER(checklist, question2),
                CHECKLIST1_QUESTION11(checklist, question1));
    }
}
