package com.bang_ggood.auth.service.oauth;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import java.util.Arrays;
import java.util.List;

@Component
public class OauthRequestProperties {

    private final String tokenRequestUri;
    private final String userInfoRequestUri;
    private final String grantType;
    private final String clientId;
    private final String clientSecret;
    private final List<String> registeredRedirectUris;

    public OauthRequestProperties(
            @Value("${kakao.token_post_uri}") String tokenPostUri,
            @Value("${kakao.user_get_uri}") String userInfoRequestUri,
            @Value("${kakao.grant_type}") String grantType,
            @Value("${kakao.client_id}") String clientId,
            @Value("${kakao.redirect_uris}") String registeredRedirectUris,
            @Value("${kakao.client_secret}") String clientSecret) {
        this.tokenRequestUri = tokenPostUri;
        this.userInfoRequestUri = userInfoRequestUri;
        this.grantType = grantType;
        this.clientId = clientId;
        this.registeredRedirectUris = convertToList(registeredRedirectUris);
        this.clientSecret = clientSecret;
    }

    private List<String> convertToList(String registeredRedirectUris) {
        return Arrays.stream(registeredRedirectUris.split(","))
                .map(String::trim)
                .toList();
    }

    public MultiValueMap<String, String> createTokenRequestBody(OauthLoginRequest request) {
        String matchingRedirectUri = findMatchingRedirectUri(request.redirectUri());
        String code = request.code();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", grantType);
        map.add("client_id", clientId);
        map.add("redirect_uri", matchingRedirectUri);
        map.add("code", code);
        map.add("client_secret", clientSecret);

        return map;
    }

    private String findMatchingRedirectUri(String redirectUri) {
        return registeredRedirectUris.stream()
                .filter(each -> each.equals(redirectUri))
                .findAny()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.OAUTH_REDIRECT_URI_MISMATCH));
    }

    public String getTokenRequestUri() {
        return tokenRequestUri;
    }

    public String getUserInfoRequestUri() {
        return userInfoRequestUri;
    }

    public List<String> getRegisteredRedirectUris() {
        return registeredRedirectUris;
    }
}
