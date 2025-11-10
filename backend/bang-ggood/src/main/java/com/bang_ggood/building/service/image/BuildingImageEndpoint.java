package com.bang_ggood.building.service.image;

import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClient.RequestHeadersSpec;

public interface BuildingImageEndpoint {
    abstract RequestHeadersSpec<?> prepareRequest(RestClient restClient, String apiKey, Object value);
}
