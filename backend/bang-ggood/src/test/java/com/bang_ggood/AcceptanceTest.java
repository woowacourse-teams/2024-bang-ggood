package com.bang_ggood;

import com.bang_ggood.auth.controller.CookieProvider;
import com.bang_ggood.auth.service.JwtTokenProvider;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseCookie;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import static com.bang_ggood.user.UserFixture.USER1;

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

    protected ResponseCookie responseCookie;

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
        User user = userRepository.save(USER1);
        String token = jwtTokenProvider.createToken(user);
        responseCookie = cookieProvider.createCookie(token);
    }
}
