package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.QuestionList;
import com.bang_ggood.checklist.dto.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.ChecklistInfo;
import com.bang_ggood.checklist.dto.QuestionCreateRequest;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;
    private final QuestionList questionList;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository, QuestionList questionList) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
        this.questionList = questionList;
    }


    @Transactional
    public long createChecklist(ChecklistCreateRequest checklistCreateRequest) {
        Room room = roomRepository.save(checklistCreateRequest.toRoomEntity());
        ChecklistInfo checklistInfo = checklistCreateRequest.toChecklistInfo();
        Checklist checklist = new Checklist(new User(1L, "방방이"), room, checklistInfo.deposit(), checklistInfo.rent(),
                checklistInfo.contractTerm(), checklistInfo.realEstate());
        checklistRepository.save(checklist);
        createChecklistOptions(checklistCreateRequest, checklist);
        createChecklistQuestions(checklistCreateRequest, checklist);
        return checklist.getId();
    }

    private void createChecklistOptions(ChecklistCreateRequest checklistCreateRequest, Checklist checklist) {
        List<Integer> options = checklistCreateRequest.options();
        validateOptions(options);
        List<ChecklistOption> checklistOptions = options.stream()
                .map(option -> new ChecklistOption(checklist, option))
                .toList();
        checklistOptionRepository.saveAll(checklistOptions);
    }

    private void validateOptions(List<Integer> options) {
        for (Integer option : options) {
            if (!Option.contains(option)) {
                throw new BangggoodException(ExceptionCode.INVALID_OPTION_ID);
            }
        }
    }

    private void createChecklistQuestions(ChecklistCreateRequest checklistCreateRequest, Checklist checklist) {
        List<QuestionCreateRequest> questions = checklistCreateRequest.questions();
        for (QuestionCreateRequest questionCreateRequest : questions) {
            Integer questionId = questionCreateRequest.questionId();
            validateQuestion(questionId);
            ChecklistQuestion checklistQuestion = new ChecklistQuestion(checklist, questionId,
                    questionCreateRequest.answer());
            checklistQuestionRepository.save(checklistQuestion);
        }
    }

    private void validateQuestion(Integer questionId) {
        if (!questionList.contains(questionId)) {
            throw new BangggoodException(ExceptionCode.INVALID_QUESTION_ID);
        }
    }
}
