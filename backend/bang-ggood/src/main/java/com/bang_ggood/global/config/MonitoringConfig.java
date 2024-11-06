package com.bang_ggood.global.config;

import com.bang_ggood.global.repository.MonitoringChecklistRepository;
import com.bang_ggood.global.repository.MonitoringUserRepository;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class MonitoringConfig {

    private final MeterRegistry meterRegistry;
    private final MonitoringUserRepository monitoringUserRepository;
    private final MonitoringChecklistRepository monitoringChecklistRepository;

    @PostConstruct
    public void initMetrics() {
        meterRegistry.gauge("total.user.count", this, value -> monitoringUserRepository.countActiveUsers());
        meterRegistry.gauge("total.checklist.count", this,
                value -> monitoringChecklistRepository.countActiveChecklists());
    }
}
