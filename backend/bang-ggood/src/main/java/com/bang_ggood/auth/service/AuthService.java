package com.bang_ggood.auth.service;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.OauthInfoResponse;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final OauthClient oauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public AuthService(OauthClient oauthClient, JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        this.oauthClient = oauthClient;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    public String login(OauthLoginRequest request) {
        OauthInfoResponse oauthInfoResponse = oauthClient.requestOauthInfo(request);

        User user = userRepository.findByEmail(oauthInfoResponse.kakao_account().email())
                .orElseGet(() -> userRepository.save(oauthInfoResponse.toUserEntity()));

        return jwtTokenProvider.createToken(user);
    }

    public User extractUser(String token) {
        AuthUser authUser = jwtTokenProvider.resolveToken(token);

        return userRepository.getUserById(authUser.id());
    }
}
