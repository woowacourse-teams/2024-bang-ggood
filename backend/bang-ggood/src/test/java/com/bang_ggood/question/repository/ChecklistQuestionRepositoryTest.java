package com.bang_ggood.question.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.question.ChecklistQuestionFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
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

    @DisplayName("질문 답변을 체크리스트 ID로 조회 성공")
    @Test
    void findAllByChecklistId() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());

        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        checklistQuestionRepository.save(ChecklistQuestionFixture.CHECKLIST1_QUESTION1(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        checklistQuestionRepository.save(ChecklistQuestionFixture.CHECKLIST1_QUESTION2(checklist, QuestionFixture.QUESTION2_CATEGORY1));

        // when
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findAllByChecklistId(
                checklist.getId());

        //then
        assertAll(
                () -> assertThat(checklistQuestions.get(0).isDeleted()).isFalse()
        );
    }

    @DisplayName("질문 답변을 체크리스트 ID로 논리적 삭제 성공")
    @Test
    void deleteAllByChecklistId() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());

        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistQuestion checklistQuestion1 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1(checklist, QuestionFixture.QUESTION1_CATEGORY1));
        ChecklistQuestion checklistQuestion2 = checklistQuestionRepository.save(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION2(checklist, QuestionFixture.QUESTION2_CATEGORY1));

        //when
        checklistQuestionRepository.deleteAllByChecklistId(
                ChecklistQuestionFixture.CHECKLIST1_QUESTION1(checklist, QuestionFixture.QUESTION1_CATEGORY1).getChecklistId());

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
