package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;


class ChecklistRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        roomRepository.save(RoomFixture.ROOM_2);
        roomRepository.save(RoomFixture.ROOM_3);
    }

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 성공")
    @Test
    void findById() {
        //given
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        //when
        Checklist foundChecklist = checklistRepository.getById(savedChecklist.getId().longValue());

        //then
        assertThat(foundChecklist.getId()).isEqualTo(ChecklistFixture.CHECKLIST1_USER1.getId());
    }

    @DisplayName("아이디를 통해 체크리스트 갖고 오기 실패 : 해당하는 체크리스트가 없을 경우")
    @Test
    void findById_notFound_exception() {
        assertThatThrownBy(() -> checklistRepository.getById(1))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    @DisplayName("체크리스트 아이디 리스트 중 유저가 생성한 체크리스트 목록 갖고 오기 성공")
    @Test
    void findByUserAndIdIn() {
        //given
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        assertThat(checklistRepository.findByUserAndIdIn(UserFixture.USER1, List.of(savedChecklist.getId())))
                .isEqualTo(List.of(savedChecklist));
    }

    @Transactional
    @DisplayName("체크리스트 리스트 조회 성공 : 논리적 삭제를 적용해서 체크리스트 리스트를 조회한다.")
    @Test
    void findAllByUser() {
        // given
        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1;
        Checklist checklist2 = ChecklistFixture.CHECKLIST2_USER1;
        checklistRepository.saveAll(List.of(checklist1, checklist2));

        checklistRepository.deleteById(checklist1.getId());

        // when
        List<Checklist> checklists = checklistRepository.findAllByUser(UserFixture.USER1);

        // then
        Assertions.assertThat(checklists).containsOnly(checklist2);
    }

    @Transactional
    @DisplayName("체크리스트 리스트 조회 성공 : 사용자의 체크리스트만 조회한다.")
    @Test
    void findAllByUser_OnlyUserChecklists() {
        // given
        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1;
        Checklist checklist2 = ChecklistFixture.CHECKLIST2_USER1;

        userRepository.save(UserFixture.USER2);
        roomRepository.save(RoomFixture.ROOM_3);
        Checklist checklist3 = ChecklistFixture.CHECKLIST3_USER2;

        checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));

        // when
        List<Checklist> checklists = checklistRepository.findAllByUser(UserFixture.USER1);

        // then
        Assertions.assertThat(checklists).containsOnly(checklist1, checklist2);
    }

    @Transactional
    @DisplayName("체크리스트 좋아요 필터링 조회 성공")
    @Test
    void findAllByUserAndIsLiked() {
        // given
        checklistRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_USER1,
                        ChecklistFixture.CHECKLIST2_USER1,
                        ChecklistFixture.CHECKLIST3_USER1)
        );
        checklistLikeRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_LIKE,
                        ChecklistFixture.CHECKLIST2_LIKE)
        );

        // when
        List<Checklist> checklists = checklistRepository.findAllByUserAndIsLiked(UserFixture.USER1);

        // then
        Assertions.assertThat(checklists)
                .containsOnly(ChecklistFixture.CHECKLIST1_USER1, ChecklistFixture.CHECKLIST2_USER1);
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 성공 : 존재하는 경우")
    @Test
    void existsById_true() {
        //given & when
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        //then
        assertThat(checklistRepository.existsById(savedChecklist.getId().longValue())).isTrue();
    }

    @DisplayName("아이디를 통해 체크리스트 존재 확인 성공 : 존재하지 않는 경우")
    @Test
    void existsById_false() {
        //given & when & then
        assertThat(checklistRepository.existsById(1)).isFalse();
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteById() {
        //given
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        //when
        checklistRepository.deleteById(savedChecklist.getId().longValue());

        //then
        assertAll(
                () -> assertThat(checklistRepository.existsById(savedChecklist.getId())).isTrue(),
                () -> assertThat(checklistRepository.existsById(savedChecklist.getId().longValue())).isFalse()
        );
    }
}
