package com.bang_ggood;

import com.bang_ggood.question.CustomChecklistFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.QuestionRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql(scripts = {"/schema-test.sql", "/data-test.sql"})
public abstract class IntegrationTestSupport {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    void init() {
        UserFixture.init(userRepository);
        QuestionFixture.init(categoryRepository, questionRepository);
        CustomChecklistFixture.init();
    }
}
