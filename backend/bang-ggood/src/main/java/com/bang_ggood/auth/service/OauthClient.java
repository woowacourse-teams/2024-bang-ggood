package com.bang_ggood.auth.service;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.auth.dto.response.OauthTokenApiResponse;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import java.util.List;

@Component
public class OauthClient {

    private final RestClient restClient;
    private final String tokenRequestUri;
    private final String userInfoRequestUri;
    private final String grantType;
    private final String clientId;
    private final String clientSecret;
    private final String registerdRedirectUri;

    public OauthClient(
            RestClient restClient,
            @Value("${kakao.token_post_uri}") String tokenRequestUri,
            @Value("${kakao.user_get_uri}") String userInfoRequestUri,
            @Value("${kakao.grant_type}") String grantType,
            @Value("${kakao.client_id}") String clientId,
            @Value("${kakao.redirect_uri}") String registerdRedirectUri,
            @Value("${kakao.client_secret}") String clientSecret) {
        this.restClient = restClient;
        this.tokenRequestUri = tokenRequestUri;
        this.userInfoRequestUri = userInfoRequestUri;
        this.grantType = grantType;
        this.clientId = clientId;
        this.registerdRedirectUri = registerdRedirectUri;
        this.clientSecret = clientSecret;
    }

    public OauthInfoApiResponse requestOauthInfo(OauthLoginRequest request) {
        String matchingRedirectUri = findMatchingRedirectUri(request.redirectUris());
        OauthTokenApiResponse oauthTokenApiResponse = requestToken(matchingRedirectUri, request.code());

        return restClient.get()
                .uri(userInfoRequestUri)
                .header("Authorization", "Bearer " + oauthTokenApiResponse.access_token())
                .retrieve()
                .body(OauthInfoApiResponse.class);
    }

    private String findMatchingRedirectUri(List<String> redirectUris) {
        return redirectUris.stream()
                .filter(rediectUri -> rediectUri.equals(registerdRedirectUri))
                .findAny()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.OAUTH_REDIRECT_URI_MISMATCH));
    }

    private OauthTokenApiResponse requestToken(String redirectUri, String code) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", grantType);
        map.add("client_id", clientId);
        map.add("redirect_uri", redirectUri);
        map.add("code", code);
        map.add("client_secret", clientSecret);

        return restClient.post()
                .uri(tokenRequestUri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(map)
                .retrieve()
                .body(OauthTokenApiResponse.class);
    }
}
