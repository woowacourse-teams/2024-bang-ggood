package com.bang_ggood.checklist.service;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.category.dto.response.WrittenCategoryQuestionsResponse;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistOption;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.response.WrittenChecklistResponse;
import com.bang_ggood.checklist.dto.response.WrittenQuestionResponse;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.room.dto.response.WrittenRoomResponse;
import com.bang_ggood.room.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final RoomRepository roomRepository;
    private final ChecklistOptionRepository checklistOptionRepository;
    private final ChecklistQuestionRepository checklistQuestionRepository;

    public ChecklistService(ChecklistRepository checklistRepository, RoomRepository roomRepository,
                            ChecklistOptionRepository checklistOptionRepository,
                            ChecklistQuestionRepository checklistQuestionRepository) {
        this.checklistRepository = checklistRepository;
        this.roomRepository = roomRepository;
        this.checklistOptionRepository = checklistOptionRepository;
        this.checklistQuestionRepository = checklistQuestionRepository;
    }

    @Transactional
    public WrittenChecklistResponse readChecklistById(long id) {
        Checklist checklist = checklistRepository.getById(id);
        WrittenRoomResponse writtenRoomResponse = WrittenRoomResponse.of(checklist);

        List<Integer> optionIds = readOptionsByChecklistId(id);

        List<WrittenCategoryQuestionsResponse> writtenCategoryQuestionsResponses =
                readCategoryQuestionsByChecklistId(id);

        return new WrittenChecklistResponse(writtenRoomResponse, optionIds, writtenCategoryQuestionsResponses);
    }

    private List<Integer> readOptionsByChecklistId(long checklistId) {
        return checklistOptionRepository.findByChecklistId(checklistId)
                .stream()
                .map(ChecklistOption::getOptionId)
                .toList();
    }

    private List<WrittenCategoryQuestionsResponse> readCategoryQuestionsByChecklistId(long checklistId) {
        List<ChecklistQuestion> checklistQuestions = checklistQuestionRepository.findByChecklistId(checklistId);
        return Arrays.stream(Category.values())
                .map(category -> readQuestionsByCategory(category, checklistQuestions))
                .collect(Collectors.toList());
    }

    private WrittenCategoryQuestionsResponse readQuestionsByCategory(Category category,
                                                                     List<ChecklistQuestion> checklistQuestions) {
        List<WrittenQuestionResponse> writtenQuestionResponses =
                Question.filter(category, checklistQuestions).stream()
                        .map(WrittenQuestionResponse::of)
                        .collect(Collectors.toList());

        return WrittenCategoryQuestionsResponse.of(category, writtenQuestionResponses);
    }
}
