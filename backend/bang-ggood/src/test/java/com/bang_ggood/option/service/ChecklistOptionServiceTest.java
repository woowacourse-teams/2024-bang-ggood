package com.bang_ggood.option.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.option.ChecklistOptionFixture;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
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
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChecklistOptionServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistOptionService checklistOptionService;

    @Autowired
    private ChecklistOptionRepository checklistOptionRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("옵션 작성 성공")
    @Test
    void createOptions() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        List<ChecklistOption> checklistOptions = List.of(
                ChecklistOptionFixture.CHECKLIST1_OPTION_CLOSET(checklist),
                ChecklistOptionFixture.CHECKLIST1_OPTION_BED(checklist)
        );

        //when
        checklistOptionService.createOptions(checklistOptions);

        //then
        assertThat(checklistOptionRepository.findAllByChecklistId(checklist.getId())).hasSize(checklistOptions.size());
    }

    @DisplayName("옵션 작성 실패: 옵션 id가 중복일 경우")
    @Test
    void createOption_duplicateId_exception() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        List<ChecklistOption> checklistOptions = List.of(
                ChecklistOptionFixture.CHECKLIST1_OPTION_CLOSET(checklist),
                ChecklistOptionFixture.CHECKLIST1_OPTION_CLOSET(checklist)
        );

        // when & then
        assertThatThrownBy(
                () -> checklistOptionService.createOptions(checklistOptions))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
    }
}
