package com.bang_ggood.auth.service;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.checklist.domain.CustomChecklistQuestion;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuthService {

    private final OauthClient oauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final CustomChecklistQuestionRepository customChecklistQuestionRepository;

    public AuthService(OauthClient oauthClient, JwtTokenProvider jwtTokenProvider, UserRepository userRepository,
                       CustomChecklistQuestionRepository customChecklistQuestionRepository) {
        this.oauthClient = oauthClient;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.customChecklistQuestionRepository = customChecklistQuestionRepository;
    }

    public String login(OauthLoginRequest request) {
        OauthInfoApiResponse oauthInfoApiResponse = oauthClient.requestOauthInfo(request);

        User user = userRepository.findByEmail(oauthInfoApiResponse.kakao_account().email())
                .orElseGet(() -> signUp(oauthInfoApiResponse));

        return jwtTokenProvider.createToken(user);
    }

    private User signUp(OauthInfoApiResponse oauthInfoApiResponse) {
        User user = userRepository.save(oauthInfoApiResponse.toUserEntity());
        createDefaultChecklistQuestions(user);
        return user;
    }

    private void createDefaultChecklistQuestions(User user) { //TODO 리팩토링 필요
        List<CustomChecklistQuestion> checklistQuestions = Question.findDefaultQuestions()
                .stream()
                .map(question -> new CustomChecklistQuestion(user, question))
                .toList();

        customChecklistQuestionRepository.saveAll(checklistQuestions);
    }

    public User extractUser(String token) {
        AuthUser authUser = jwtTokenProvider.resolveToken(token);

        return userRepository.getUserById(authUser.id());
    }
}
