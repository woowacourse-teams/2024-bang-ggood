package com.bang_ggood.question.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.Question;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

class QuestionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private QuestionRepository questionRepository;

    @DisplayName("디폴트 체크리스트 조회 성공")
    @Test
    void findByIsDefaultTrue() {
        // given
        Question question1 = questionRepository.save(new Question(QuestionFixture.CATEGORY1, null, "test", "test", true));
        Question question2 = questionRepository.save(new Question(QuestionFixture.CATEGORY2, null, "test", "test", false));

        // when
        List<Question> questions = questionRepository.findAllByIsDefaultTrue();

        // then
        Assertions.assertThat(questions).contains(question1);
        Assertions.assertThat(questions).doesNotContain(question2);
    }

    @DisplayName("체크리스트 id로 조회 성공")
    @Test
    void findAllByIdIn() {
        // given
        Question question1 = QuestionFixture.QUESTION1_CATEGORY1;
        Question question2 = QuestionFixture.QUESTION2_CATEGORY1;

        // when
        List<Question> questions = questionRepository.findAllByIdIn(List.of(question1.getId(), question2.getId()));

        // then
        Assertions.assertThat(questions).containsExactly(question1, question2);
    }
}
