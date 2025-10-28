package com.bang_ggood.building.service.image;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@MockBean(JpaMetamodelMappingContext.class)
@RestClientTest(BuildingImageClient.class)
class BuildingImageClientTest {

    @Autowired
    private MockRestServiceServer mockServer;
    @Autowired
    private BuildingImageClient buildingImageClient;
    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("빌딩 이미지 URI 요청 성공")
    @Test
    void requestBuildingImages() throws JsonProcessingException {
        // given
        PlaceName placeName = new PlaceName("testName");
        PlaceNames placeNames = new PlaceNames(new ArrayList<>(List.of(placeName)));
        PhotoNames photoNames = new PhotoNames(placeNames.places());
        PhotoURI photoURI = new PhotoURI("testName", "testURI");

        String placeNamesJson = objectMapper.writeValueAsString(placeNames);
        String photoNamesJson = objectMapper.writeValueAsString(photoNames);
        String photoURIJson = objectMapper.writeValueAsString(photoURI);

        mockServer.expect(requestTo(containsString("searchText")))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(placeNamesJson, MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(containsString("places")))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(photoNamesJson, MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(containsString("media")))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(photoURIJson, MediaType.APPLICATION_JSON));

        // when
        CompletableFuture<Optional<List<PhotoURI>>> future = buildingImageClient.requestBuildingImages(
                new BuildingImageRequest("test", "test"));

        // then
        future.thenAccept(result -> {
            mockServer.verify();
        }).join();
    }

    @DisplayName("빌딩 이미지 URI 요청 실패 : 잘못된 경로일 때")
    @Test
    void requestBuildingImages_fail() throws JsonProcessingException {
        // given
        PlaceName placeName = new PlaceName("testName");
        PlaceNames placeNames = new PlaceNames(new ArrayList<>(List.of(placeName)));

        String placeNamesJson = objectMapper.writeValueAsString(placeNames);

        mockServer.expect(requestTo(containsString("wrongPath")))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(placeNamesJson, MediaType.APPLICATION_JSON));

        // when
        CompletableFuture<Optional<List<PhotoURI>>> future = buildingImageClient.requestBuildingImages(
                new BuildingImageRequest("test", "test"));

        // then
        assertThatThrownBy(() ->
                future.thenAccept(result -> mockServer.verify()).join()
        ).isInstanceOf(CompletionException.class);
    }
}
