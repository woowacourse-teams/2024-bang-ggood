package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;


class ChecklistRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @BeforeEach
    void setUp() {
        roomRepository.save(RoomFixture.ROOM_1);
    }

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 성공")
    @Test
    void findById() {
        //given
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.checklist);

        //when
        Checklist foundChecklist = checklistRepository.getById(savedChecklist.getId().longValue());

        //then
        assertThat(foundChecklist.getId()).isEqualTo(ChecklistFixture.checklist.getId());
    }

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 실패 : 해당하는 체크리스트가 없을 경우")
    @Test
    void findById_notFound_exception() {
        assertThatThrownBy(() -> checklistRepository.getById(1))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 : 존재하는 경우")
    @Test
    void existsById_true() {
        //given & when
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.checklist);

        //then
        assertThat(checklistRepository.existsById(savedChecklist.getId().longValue())).isTrue();
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 : 존재하지 않는 경우")
    @Test
    void existsById_false() {
        //given & when & then
        assertThat(checklistRepository.existsById(1)).isFalse();
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteById() {
        //given
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.checklist);

        //when
        checklistRepository.deleteById(savedChecklist.getId().longValue());

        //then
        assertAll(
                () -> assertThat(checklistRepository.existsById(savedChecklist.getId())).isTrue(),
                () -> assertThat(checklistRepository.existsById(savedChecklist.getId().longValue())).isFalse()
        );
    }
}
