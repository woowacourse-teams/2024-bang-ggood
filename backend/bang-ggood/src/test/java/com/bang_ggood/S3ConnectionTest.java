package com.bang_ggood;

import io.awspring.cloud.s3.S3Template;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import static org.assertj.core.api.Assertions.assertThat;

class S3ConnectionTest extends IntegrationTestSupport {

    @Autowired
    private S3Template s3Template;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    @DisplayName("S3 연결 성공")
    @Test
    void s3Connection() {
        assertThat(s3Template).isNotNull();

        var resources = s3Template.listObjects(bucket, "");

        assertThat(resources).isNotNull();
    }

}

