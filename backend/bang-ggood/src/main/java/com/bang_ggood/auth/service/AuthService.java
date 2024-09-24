package com.bang_ggood.auth.service;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.option.domain.Option;
import com.bang_ggood.question.domain.Answer;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.room.dto.request.RoomRequest;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AuthService {

    private static final Set<String> blackList = new HashSet<>();

    private final OauthClient oauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChecklistManageService checklistManageService;
    private final UserRepository userRepository;
    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;

    public AuthService(OauthClient oauthClient, JwtTokenProvider jwtTokenProvider,
                       ChecklistManageService checklistManageService,
                       UserRepository userRepository,
                       CustomChecklistQuestionRepository customChecklistQuestionRepository) {
        this.oauthClient = oauthClient;
        this.jwtTokenProvider = jwtTokenProvider;
        this.checklistManageService = checklistManageService;
        this.userRepository = userRepository;
        this.customChecklistQuestionRepository = customChecklistQuestionRepository;
    }

    private static void validateTokenOwnership(User user, AuthUser authUser) {
        if (!user.getId().equals(authUser.id())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_NOT_OWNED_BY_USER);
        }
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
        checklistManageService.createChecklist(user, checklistRequest);
        //TODO: 로직 리팩토링 필요
    }

    public void logout(String accessToken, User user) {

        String splitToken = accessToken.split("token=")[1];
        AuthUser authUser = jwtTokenProvider.resolveToken(splitToken);
        validateTokenOwnership(user, authUser);
        blackList.add(splitToken);
    }

    public boolean isAccessTokenInBlackList(String accessToken) {
        return blackList.contains(accessToken);
    }

    public User extractUser(String token) {
        AuthUser authUser = jwtTokenProvider.resolveToken(token);
        validateAccessTokenInBlacklist(token);
        return userRepository.getUserById(authUser.id());
    }

    private void validateAccessTokenInBlacklist(String token) {
        if (isAccessTokenInBlackList(token)) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_IN_BLACKLIST);
        }
    }
}
