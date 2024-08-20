package com.bang_ggood.auth.service;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.checklist.domain.Answer;
import com.bang_ggood.checklist.domain.CustomChecklistQuestion;
import com.bang_ggood.checklist.domain.OccupancyMonth;
import com.bang_ggood.checklist.domain.OccupancyPeriod;
import com.bang_ggood.checklist.domain.Option;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.QuestionRequest;
import com.bang_ggood.checklist.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.room.domain.FloorLevel;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.dto.request.RoomRequest;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AuthService {

    private final OauthClient oauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChecklistService checklistService;
    private final UserRepository userRepository;
    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;

    public AuthService(OauthClient oauthClient, JwtTokenProvider jwtTokenProvider, ChecklistService checklistService,
                       UserRepository userRepository,
                       CustomChecklistQuestionRepository customChecklistQuestionRepository) {
        this.oauthClient = oauthClient;
        this.jwtTokenProvider = jwtTokenProvider;
        this.checklistService = checklistService;
        this.userRepository = userRepository;
        this.customChecklistQuestionRepository = customChecklistQuestionRepository;
    }

    @Transactional
    public String login(OauthLoginRequest request) {
        OauthInfoApiResponse oauthInfoApiResponse = oauthClient.requestOauthInfo(request);

        User user = userRepository.findByEmail(oauthInfoApiResponse.kakao_account().email())
                .orElseGet(() -> signUp(oauthInfoApiResponse));

        return jwtTokenProvider.createToken(user);
    }

    private User signUp(OauthInfoApiResponse oauthInfoApiResponse) {
        User user = userRepository.save(oauthInfoApiResponse.toUserEntity());
        createDefaultChecklistQuestions(user);
        createDefaultChecklist(user);
        return user;
    }

    private void createDefaultChecklistQuestions(User user) { //TODO 리팩토링 필요
        List<CustomChecklistQuestion> checklistQuestions = Question.findDefaultQuestions()
                .stream()
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();

        customChecklistQuestionRepository.saveAll(checklistQuestions);
    }

    private void createDefaultChecklist(User user) {
        RoomRequest roomRequest = new RoomRequest(
                "예시용 체크리스트", "방끗시 집잘구하구 행복하동", "방방하우스", "잠실", 10,
                3000, 60, 5, List.of(1, 3), "지상", 14, "분리형 원룸", 9.5,
                12, 9, "초", "방끗공인중개사",
                "이곳에 필요한 메모를 작성하세요.", "이곳에 한줄평을 남겨 보세요.");

        List<Integer> options = List.of(
                Option.INDUCTION.getId(),
                Option.AIR_CONDITIONER.getId(),
                Option.SINK.getId(),
                Option.BED.getId());

        List<QuestionRequest> questionRequests = List.of(
                new QuestionRequest(Question.ROOM_CONDITION_1.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.ROOM_CONDITION_2.getId(), Answer.BAD.name()),
                new QuestionRequest(Question.ROOM_CONDITION_3.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.WINDOW_1.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.WINDOW_2.getId(), Answer.BAD.name()),
                new QuestionRequest(Question.BATHROOM_1.getId(), Answer.GOOD.name()),
                new QuestionRequest(Question.BATHROOM_2.getId(), Answer.GOOD.name()));

        ChecklistRequest checklistRequest = new ChecklistRequest(roomRequest, options, questionRequests);
        checklistService.createChecklist(user, checklistRequest);
    }

    public User extractUser(String token) {
        AuthUser authUser = jwtTokenProvider.resolveToken(token);

        return userRepository.getUserById(authUser.id());
    }
}
