package com.bang_ggood.question;

import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import java.util.ArrayList;
import java.util.List;


public class CustomChecklistFixture {

    public static List<CustomChecklistQuestion> CUSTOM_CHECKLIST_QUESTION_DEFAULT;
    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST;


    public static List<CustomChecklistQuestion> CUSTOM_CHECKLIST_QUESTION_DEFAULT(User user) {
        return List.of(new CustomChecklistQuestion(user, QuestionFixture.QUESTION1_CATEGORY1),
                new CustomChecklistQuestion(user, QuestionFixture.QUESTION3_CATEGORY2));
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST() {
        return new CustomChecklistUpdateRequest(List.of(QuestionFixture.QUESTION1_CATEGORY1.getId(),
                QuestionFixture.QUESTION2_CATEGORY1.getId(),
                QuestionFixture.QUESTION3_CATEGORY2.getId()));
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY() {
        return new CustomChecklistUpdateRequest(new ArrayList<>());
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED() {
        return new CustomChecklistUpdateRequest(List.of(1, 1));
    }

    public static CustomChecklistUpdateRequest CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID() {
        return new CustomChecklistUpdateRequest(List.of(99999));
    }

    public static void init() {
        CUSTOM_CHECKLIST_QUESTION_DEFAULT = List.of(new CustomChecklistQuestion(UserFixture.USER1, QuestionFixture.QUESTION1_CATEGORY1),
                new CustomChecklistQuestion(UserFixture.USER1, QuestionFixture.QUESTION2_CATEGORY1));
    }
}
