package com.bang_ggood.question.dto.request;

import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.user.domain.User;
import jakarta.validation.constraints.NotNull;

public record QuestionCreateRequest(@NotNull(message = "카테고리 아이디가 존재하지 않습니다.") Integer categoryId,
                                    @NotNull(message = "질문 내용이 존재하지 않습니다.") String title,
                                    String subtitle) {

    public Question toQuestionEntity(Category category) {
        return new Question(category, title, subtitle, true);
    }

    public CustomChecklistQuestion toCustomChecklistEntity(User user, Question question) {
        return new CustomChecklistQuestion(user, question);
    }
}
