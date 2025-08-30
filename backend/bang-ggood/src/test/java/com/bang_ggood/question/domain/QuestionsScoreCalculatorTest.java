package com.bang_ggood.question.domain;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.RoomRepository;
import com.bang_ggood.question.ChecklistQuestionFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class QuestionsScoreCalculatorTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    private Checklist checklist;

    @BeforeEach
    void beforeEach() {
        User user = userRepository.save(UserFixture.USER1());
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
    }

    @DisplayName("점수 계산 성공 : 모두 GOOD일 경우")
    @Test
    void calculateCategoryScore() {
        // given
        List<ChecklistQuestion> checklistQuestions = List.of(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, QuestionFixture.QUESTION1_CATEGORY1)
        );

        // when
        QuestionsScoreCalculator calculator = new QuestionsScoreCalculator(checklistQuestions);

        // then
        assertThat(calculator.calculateScore()).isEqualTo(100);
    }

    @DisplayName("점수 계산 성공 : 일부 답변만 GOOD인 경우")
    @Test
    void calculateCategoryScore_partialGoodAnswers() {
        // given
        List<ChecklistQuestion> checklistQuestions = List.of(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1),
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, QuestionFixture.QUESTION2_CATEGORY1)
        );

        // when
        QuestionsScoreCalculator calculator = new QuestionsScoreCalculator(checklistQuestions);

        // then
        assertThat(calculator.calculateScore()).isEqualTo(50);
    }

    @DisplayName("점수 계산 성공 : 모든 답변이 BAD인 경우")
    @Test
    void calculateCategoryScore_allBadAnswers() {
        // given
        List<ChecklistQuestion> checklistQuestions = List.of(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1)
        );

        // when
        QuestionsScoreCalculator calculator = new QuestionsScoreCalculator(checklistQuestions);

        // then
        assertThat(calculator.calculateScore()).isEqualTo(0);
    }

    @DisplayName("점수 계산 성공 : 답변이 없는 경우")
    @Test
    void calculateCategoryScore_noAnswers() {
        // given & when
        List<ChecklistQuestion> checklistQuestions = new ArrayList<>();

        // when
        QuestionsScoreCalculator calculator = new QuestionsScoreCalculator(checklistQuestions);

        // then
        assertThat(calculator.calculateScore()).isEqualTo(null);
    }

}
