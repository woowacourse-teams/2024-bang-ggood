package com.bang_ggood.building.service.image;

import com.bang_ggood.global.handler.BuildingImageExceptionHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static com.bang_ggood.building.service.image.GoogleBuildingImageEndpoint.PLACE_DETAILS;
import static com.bang_ggood.building.service.image.GoogleBuildingImageEndpoint.PLACE_PHOTO;
import static com.bang_ggood.building.service.image.GoogleBuildingImageEndpoint.PLACE_SEARCH;

@Component
public class BuildingImageClient {

    private final RestClient restClient;
    private final String API_KEY;

    public BuildingImageClient(RestClient.Builder builder, @Value("${google.api_key}") String API_KEY) {
        this.restClient = builder
                .defaultStatusHandler(new BuildingImageExceptionHandler()).build();
        this.API_KEY = API_KEY;
    }

    @Async
    public CompletableFuture<Optional<List<PhotoURI>>> requestBuildingImages(BuildingImageRequest request) {
        try {
            return CompletableFuture.completedFuture(requestPlaceName(request.address(), request.buildingName())
                    .flatMap(this::requestPhotoName)
                    .map(this::requestPhotoURIs));
        } catch (Exception exception) {
            return CompletableFuture.completedFuture(Optional.empty());
        }
    }

    private Optional<PlaceName> requestPlaceName(String address, String buildingName) {
        PlaceNames placeNames = PLACE_SEARCH
                .prepareRequest(restClient, API_KEY, buildingName + " " + address)
                .retrieve()
                .body(PlaceNames.class);

        return placeNames.getFirst();
    }

    private Optional<PhotoNames> requestPhotoName(PlaceName placeName) {
        PhotoNames photoNames = PLACE_DETAILS
                .prepareRequest(restClient, API_KEY, placeName.name())
                .retrieve()
                .body(PhotoNames.class);

        return Optional.ofNullable(photoNames);
    }

    private List<PhotoURI> requestPhotoURIs(PhotoNames photoNames) {
        return photoNames.limitPlacePhotoNames()
                .stream()
                .map(placeName -> PLACE_PHOTO
                        .prepareRequest(restClient, API_KEY, placeName.name())
                        .retrieve()
                        .body(PhotoURI.class))
                .toList();
    }
}
