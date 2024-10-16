package com.bang_ggood.question;

import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import java.util.ArrayList;
import java.util.List;


public class CustomChecklistFixture {

    public static List<CustomChecklistQuestion> CUSTOM_CHECKLIST_QUESTION_DEFAULT;
    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST;


    public static List<CustomChecklistQuestion> CUSTOM_CHECKLIST_QUESTION_DEFAULT(User user) {
        return List.of(new CustomChecklistQuestion(user, Question.ROOM_CONDITION_1, QuestionFixture.QUESTION1),
                new CustomChecklistQuestion(user, Question.WINDOW_1, QuestionFixture.QUESTION2));
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST() {
        return new CustomChecklistUpdateRequest(List.of(Question.ROOM_CONDITION_1.getId(),
                Question.WINDOW_6.getId(),
                Question.BATHROOM_1.getId(),
                Question.SECURITY_1.getId()));
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY() {
        return new CustomChecklistUpdateRequest(new ArrayList<>());
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED() {
        return new CustomChecklistUpdateRequest(List.of(1, 1, 1));
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID() {
        return new CustomChecklistUpdateRequest(List.of(99999));
    }

    public static void init() {
        CUSTOM_CHECKLIST_QUESTION_DEFAULT = List.of(new CustomChecklistQuestion(UserFixture.USER1, Question.ROOM_CONDITION_1, QuestionFixture.QUESTION1),
                new CustomChecklistQuestion(UserFixture.USER1, Question.WINDOW_1, QuestionFixture.QUESTION2));
    }
}
