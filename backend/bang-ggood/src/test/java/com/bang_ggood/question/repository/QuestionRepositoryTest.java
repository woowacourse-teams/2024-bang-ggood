package com.bang_ggood.question.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

class QuestionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @DisplayName("카테고리에 해당하는 유저 질문 조회 성공 : 어드민 질문도 있는 경우")
    @Test
    void findAllByCategoryIdAndUserIdAndAdminId() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        User admin = userRepository.save(UserFixture.ADMIN_USER1());
        Category category1 = QuestionFixture.CATEGORY1;
        Category category2 = QuestionFixture.CATEGORY2;

        Question question1 = questionRepository.save(new Question(category1, user, "title", "subtitle", false));
        Question question2 = questionRepository.save(new Question(category1, admin, "title", "subtitle", false));
        Question question3 = questionRepository.save(new Question(category2, user, "title", "subtitle", false));

        // when
        List<Question> questions = questionRepository.findAllByCategoryIdAndUserIdAndAdminId(category1.getId(), user.getId(), admin.getId());

        // then
        Assertions.assertThat(questions).containsOnly(question1, question2);
    }

    @DisplayName("디폴트 체크리스트 조회 성공")
    @Test
    void findByIsDefaultTrue() {
        // given
        Question defaultQuestion = questionRepository.save(new Question(QuestionFixture.CATEGORY1, null, "test", "test", true));
        Question notDefaultQuestion = questionRepository.save(new Question(QuestionFixture.CATEGORY2, null, "test", "test", false));

        // when
        List<Question> questions = questionRepository.findAllByIsDefaultTrue();

        // then
        Assertions.assertThat(questions).contains(defaultQuestion);
        Assertions.assertThat(questions).doesNotContain(notDefaultQuestion);
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

    @DisplayName("질문 삭제 성공")
    @Test
    void deleteByQuestionId() {
        // given
        Question question1 = QuestionFixture.QUESTION1_CATEGORY1;

        // when
        questionRepository.deleteById(question1.getId());
        List<Question> result = questionRepository.findAllByIdIn(List.of(question1.getId()));

        // then
        Assertions.assertThat(result).isEmpty();
    }
}
