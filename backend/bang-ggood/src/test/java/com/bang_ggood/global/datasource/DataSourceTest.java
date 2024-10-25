package com.bang_ggood.global.datasource;

import com.bang_ggood.global.DBInitializer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("read-write-test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DataSourceTest {

    @MockBean
    DBInitializer dbInitializer;

    @Autowired
    private DataSource dataSource;

    @BeforeEach
    void setUp() {
        Mockito.doNothing().when(dbInitializer).run();
    }

    @Transactional(readOnly = true)
    @DisplayName("read DB와 연결 성공: read-only인 경우")
    @Test
    public void read() {
        try (Connection connection = dataSource.getConnection()) {
            assertThat(connection.getMetaData().getURL()).contains("read");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    @DisplayName("write DB와 연결 성공: read-only가 아닌 경우")
    @Test
    public void write() {
        try (Connection connection = dataSource.getConnection()) {
            assertThat(connection.getMetaData().getURL()).contains("write");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
