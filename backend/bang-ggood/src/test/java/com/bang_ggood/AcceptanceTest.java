package com.bang_ggood;

import com.bang_ggood.auth.controller.cookie.CookieProvider;
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
public abstract class AcceptanceTest extends IntegrationTestSupport {

    protected Headers headers;
    protected Headers adminHeaders;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private CookieProvider cookieProvider;
    @Autowired
    private UserRepository userRepository;
    private User authenticatedUser;
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
        authenticatedUser = userRepository.save(UserFixture.USER1);
        headers = createHeaders(authenticatedUser);
        adminHeaders = createHeaders(UserFixture.ADMIN_USER1());
    }

    private Headers createHeaders(User user) {
        User createdUser = userRepository.save(user);
        String accessToken = jwtTokenProvider.createAccessToken(createdUser);
        String refreshToken = jwtTokenProvider.createRefreshToken(createdUser);

        ResponseCookie accessTokenResponseCookie = cookieProvider.createAccessTokenCookie(accessToken);
        ResponseCookie refreshTokenCookie = cookieProvider.createRefreshTokenCookie(refreshToken);

        return new Headers(new Header(HttpHeaders.COOKIE, accessTokenResponseCookie.toString()),
                new Header(HttpHeaders.COOKIE, refreshTokenCookie.toString()));
    }

    public User getAuthenticatedUser() {
        return authenticatedUser;
    }
}
