package com.bang_ggood;

import com.bang_ggood.auth.controller.CookieProvider;
import com.bang_ggood.auth.service.jwt.JwtTokenProvider;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.http.Headers;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;


@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = {"/schema-test.sql", "/data-test.sql"})
public abstract class AcceptanceTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private CookieProvider cookieProvider;
    @Autowired
    private UserRepository userRepository;

    private User authenticatedUser;
    protected Headers headers;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        setPort();
        setResponseCookie();
    }

    private void setPort() {
        RestAssured.port = port;
    }

    private void setResponseCookie() {
        authenticatedUser = userRepository.save(UserFixture.USER1());
        String accessToken = jwtTokenProvider.createAccessToken(authenticatedUser);
        String refreshToken = jwtTokenProvider.createRefreshToken(authenticatedUser);
        ResponseCookie accessTokenResponseCookie = cookieProvider.createAccessTokenCookie(accessToken);
        ResponseCookie refreshTokenCookie = cookieProvider.createRefreshTokenCookie(refreshToken);

        headers = new Headers(new Header(HttpHeaders.COOKIE, accessTokenResponseCookie.toString()),
                new Header(HttpHeaders.COOKIE, refreshTokenCookie.toString()));
    }

    public User getAuthenticatedUser() {
        return authenticatedUser;
    }
}
