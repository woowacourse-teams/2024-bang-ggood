package com.bang_ggood.question.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.question.ChecklistQuestionFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class ChecklistQuestionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChecklistQuestionRepository checklistQuestionRepository;

    private Room room;
    private User user;
    private Checklist checklist;

    @BeforeEach
    void beforeEach() {
        room = roomRepository.save(RoomFixture.ROOM_1());
        user = userRepository.save(UserFixture.USER1());
        checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
    }

    @DisplayName("질문 답변을 체크리스트 ID로 조회 성공")
    @Test
    void findAllByChecklistId() {
        //given
        checklistQuestionRepository.save(ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        checklistQuestionRepository.save(ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, QuestionFixture.QUESTION2_CATEGORY1));

        // when
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findAllByChecklistId(
                checklist.getId());

        //then
        assertAll(
                () -> assertThat(checklistQuestions.get(0).isDeleted()).isFalse()
        );
    }

    @DisplayName("주어진 체크리스트 ID와 사용자 ID로 카테고리들 조회 성공")
    @Test
    void findAllQuestionCategoriesByUserIdAndChecklistId() {
        // given
        checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, QuestionFixture.QUESTION3_CATEGORY2));

        // when
        List<Category> categories = checklistQuestionRepository.findAllQuestionCategoriesByUserIdAndChecklistId(
                user.getId(), checklist.getId());

        // then
        assertThat(categories).hasSize(2);
    }

    @DisplayName("주어진 체크리스트 ID와 카테고리 ID로 답변된 질문 조회 성공")
    @Test
    void countAnsweredQuestionsByChecklistIdAndCategoryId() {
        // given
        ChecklistQuestion cq1 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        ChecklistQuestion cq2 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        checklistQuestionRepository.save(cq1);
        checklistQuestionRepository.save(cq2);

        // when
        Integer categoryId = cq1.getQuestion().getCategory().getId();
        List<ChecklistQuestion> answeredQuestions = checklistQuestionRepository.findAnsweredQuestionsByChecklistIdAndCategoryId(
                checklist.getId(), categoryId);

        // then
        assertThat(answeredQuestions.size()).isEqualTo(2);
    }


    @DisplayName("주어진 체크리스트 ID, 카테고리 ID, 특정 답변으로 질문 수 카운트 성공")
    @Test
    void countAnsweredQuestionsByChecklistIdAndCategoryIdAndAnswer() {
        // given
        ChecklistQuestion cq1 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        ChecklistQuestion cq2 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        checklistQuestionRepository.save(cq1);
        checklistQuestionRepository.save(cq2);

        // when
        Integer categoryId = cq1.getQuestion().getCategory().getId();
        Integer countYes = checklistQuestionRepository.countAnsweredQuestionsByChecklistIdAndCategoryIdAndAnswer(
                checklist.getId(), categoryId, Answer.GOOD);
        Integer countNo = checklistQuestionRepository.countAnsweredQuestionsByChecklistIdAndCategoryIdAndAnswer(
                checklist.getId(), categoryId, Answer.BAD);

        // then
        assertAll(
                () -> assertThat(countYes).isEqualTo(1),
                () -> assertThat(countNo).isEqualTo(1)
        );
    }

    @DisplayName("체크리스트와 카테고리로 조회 성공")
    @Test
    void findAllByChecklistIdAndCategoryId() {
        // given
        Question questionCategory1 = QuestionFixture.QUESTION1_CATEGORY1;
        Question questionCategory2 = QuestionFixture.QUESTION3_CATEGORY2;
        
        ChecklistQuestion checklistQuestion1 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, questionCategory1));
        ChecklistQuestion checklistQuestion2 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, questionCategory2));

        // when
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findAllByChecklistIdAndCategoryId(
                checklist.getId(),
                questionCategory1.getCategory().getId());

        // then
        Assertions.assertThat(checklistQuestions).containsOnly(checklistQuestion1);
    }
  
    @DisplayName("질문 답변을 체크리스트 ID로 논리적 삭제 성공")
    @Test
    void deleteAllByChecklistId() {
        //given
        ChecklistQuestion checklistQuestion1 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        ChecklistQuestion checklistQuestion2 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist, QuestionFixture.QUESTION2_CATEGORY1));

        //when
        checklistQuestionRepository.deleteAllByChecklistId(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist, QuestionFixture.QUESTION1_CATEGORY1).getChecklistId());

        //then
        assertAll(
                () -> assertThat(
                        checklistQuestionRepository.existsById(
                                checklistQuestion1.getId())).isTrue(),
                () -> assertThat(
                        checklistQuestionRepository.findById(checklistQuestion2.getId())
                                .get()
                                .isDeleted()).isTrue()
        );
    }
}
