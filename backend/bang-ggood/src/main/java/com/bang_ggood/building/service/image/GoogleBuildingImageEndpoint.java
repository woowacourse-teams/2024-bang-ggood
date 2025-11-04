package com.bang_ggood.building.service.image;

import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClient.RequestHeadersSpec;
import java.util.Map;
import java.util.function.Consumer;

import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public enum GoogleBuildingImageEndpoint implements BuildingImageEndpoint {

    PLACE_SEARCH {
        @Override
        public RequestHeadersSpec<?> prepareRequest(RestClient restClient, String apiKey, Object value) {
            String url = GOOGLE_URL_PREFIX + "places:searchText";
            String fieldMask = "places.name";
            Map<String, String> body = Map.of("textQuery", value.toString());

            return restClient.post()
                    .uri(url)
                    .headers(headers(apiKey, fieldMask))
                    .body(body);
        }
    },

    PLACE_DETAILS {
        @Override
        public RequestHeadersSpec<?> prepareRequest(RestClient restClient, String apiKey, Object value) {
            String url = GOOGLE_URL_PREFIX + value.toString();
            String fieldMask = "photos";

            return restClient.get()
                    .uri(url)
                    .headers(headers(apiKey, fieldMask));
        }
    },

    PLACE_PHOTO {
        @Override
        public RequestHeadersSpec<?> prepareRequest(RestClient restClient, String apiKey, Object value) {
            String url = GOOGLE_URL_PREFIX + value.toString() + "/media?maxHeightPx=400&skipHttpRedirect=true";

            return restClient.get()
                    .uri(url)
                    .headers(headers(apiKey, null));
        }
    };

    private static final String GOOGLE_URL_PREFIX = "https://places.googleapis.com/v1/";

    protected Consumer<HttpHeaders> headers(String apiKey, String fieldMask) {
        return httpHeaders -> {
            httpHeaders.add(CONTENT_TYPE, APPLICATION_JSON_VALUE);
            httpHeaders.add("X-Goog-Api-Key", apiKey);
            if (fieldMask != null) httpHeaders.add("X-Goog-FieldMask", fieldMask);
        };
    }
}
