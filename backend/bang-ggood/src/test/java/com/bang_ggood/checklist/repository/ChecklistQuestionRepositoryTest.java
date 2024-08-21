package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
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

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
    }

    @DisplayName("질문 답변을 체크리스트 ID로 조회 성공")
    @Test
    void findByChecklistId() {
        //given
        checklistQuestionRepository.save(ChecklistFixture.CHECKLIST_QUESTION_1);
        checklistQuestionRepository.save(ChecklistFixture.CHECKLIST_QUESTION_2);

        // when
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findByChecklistId(
                ChecklistFixture.CHECKLIST_QUESTION_1.getId());

        //then
        assertAll(
                () -> assertThat(checklistQuestions.get(0).isDeleted()).isFalse()
        );
    }

    @DisplayName("질문 답변을 체크리스트 ID로 논리적 삭제 성공")
    @Test
    void deleteAllByChecklistId() {
        //given
        checklistQuestionRepository.save(ChecklistFixture.CHECKLIST_QUESTION_1);
        checklistQuestionRepository.save(ChecklistFixture.CHECKLIST_QUESTION_2);

        //when
        checklistQuestionRepository.deleteAllByChecklistId(
                ChecklistFixture.CHECKLIST_QUESTION_1.getChecklist().getId());

        //then
        assertAll(
                () -> assertThat(
                        checklistQuestionRepository.existsById(ChecklistFixture.CHECKLIST_QUESTION_1.getId())).isTrue(),
                () -> assertThat(
                        checklistQuestionRepository.findById(ChecklistFixture.CHECKLIST_QUESTION_1.getId()).get()
                                .isDeleted()).isTrue()
        );
    }
}
