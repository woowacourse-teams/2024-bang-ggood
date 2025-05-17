package com.bang_ggood;

import com.bang_ggood.global.storage.AwsS3Client;
import com.bang_ggood.global.util.ImageOptimizationUtil;
import com.bang_ggood.question.CustomChecklistFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.QuestionRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

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

    @Autowired
    private CacheManager cacheManager;

    @MockBean
    private AwsS3Client awsS3Client;

    private MockedStatic<ImageOptimizationUtil> imageOptimizationUtilMock;

    @BeforeEach
    void init() {
        UserFixture.init(userRepository);
        QuestionFixture.init(categoryRepository, questionRepository);
        CustomChecklistFixture.init();
        clearCaches();
    }

    @BeforeEach
    void setUpMocks() {
        when(awsS3Client.upload(any(), anyString(), anyString()))
                .thenReturn("https://s3.fake-url.com/image.jpg");

        imageOptimizationUtilMock = Mockito.mockStatic(ImageOptimizationUtil.class);
        imageOptimizationUtilMock.when(() -> ImageOptimizationUtil.compress(any(), anyInt()))
                .thenAnswer(invocation -> invocation.getArgument(0));
    }

    @AfterEach
    void tearDownMocks() {
        imageOptimizationUtilMock.close();
    }

    void clearCaches() {
        if (cacheManager != null) {
            cacheManager.getCacheNames().forEach(name -> {
                Cache cache = cacheManager.getCache(name);
                if (cache != null) {
                    cache.clear();
                }
            });
        }
    }
}
