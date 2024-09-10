package com.bang_ggood.question.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.ChecklistQuestionFixture;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.repository.ChecklistQuestionRepository;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collections;
import java.util.List;

import static com.bang_ggood.user.UserFixture.USER1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChecklistQuestionServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistQuestionService checklistQuestionService;

    @Autowired
    private ChecklistQuestionRepository checklistQuestionRepository;

    @Autowired
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    private Checklist checklist;

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
    }

    @DisplayName("질문 작성 성공")
    @Test
    void createQuestions() {
        //given
        List<ChecklistQuestion> checklistQuestions = List.of(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1,
                ChecklistQuestionFixture.CHECKLIST1_QUESTION10
        );

        //when
        checklistQuestionService.createQuestions(checklistQuestions);

        //then
        assertThat(checklistQuestionRepository.findAllByChecklistId(checklist.getId())).hasSize(
                checklistQuestions.size());
    }

    @DisplayName("질문 작성 실패: 옵션 id가 중복일 경우")
    @Test
    void createQuestions_duplicateId_exception() {
        //given
        List<ChecklistQuestion> checklistQuestions = List.of(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1,
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1
        );

        // when & then
        assertThatThrownBy(
                () -> checklistQuestionService.createQuestions(checklistQuestions))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("커스텀 체크리스트 질문 조회 성공")
    @Test
    void readCustomChecklistQuestions() {
        // given
        CustomChecklistQuestion question1 = new CustomChecklistQuestion(USER1, Question.ROOM_CONDITION_5);
        CustomChecklistQuestion question2 = new CustomChecklistQuestion(USER1, Question.BATHROOM_1);
        List<CustomChecklistQuestion> questions = List.of(question1, question2);
        customChecklistQuestionRepository.saveAll(questions);

        // when
        List<CustomChecklistQuestion> customChecklistQuestions = checklistQuestionService.readCustomChecklistQuestions(USER1);

        // then
        Assertions.assertThat(customChecklistQuestions).hasSize(questions.size());
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        // given
        List<Question> questions = List.of(Question.OUTSIDE_1, Question.BATHROOM_2, Question.SECURITY_1);

        // when
        checklistQuestionService.updateCustomChecklist(USER1, questions);

        // then
        assertThat(customChecklistQuestionRepository.findAllByUser(USER1))
                .hasSize(questions.size());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 선택한 질문 개수가 0개일 때")
    @Test
    void updateCustomChecklist_empty_exception() {
        // given
        List<Question> questions = Collections.emptyList();

        // when & then
        assertThatThrownBy(() -> checklistQuestionService.updateCustomChecklist(USER1, questions))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문이 중복될 때")
    @Test
    void updateCustomChecklist_duplicatedQuestion_exception() {
        // given
        List<Question> questions = List.of(Question.OUTSIDE_1, Question.OUTSIDE_1);

        // when & then
        assertThatThrownBy(() -> checklistQuestionService.updateCustomChecklist(USER1, questions))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }
}