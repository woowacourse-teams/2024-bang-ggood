package com.bang_ggood.building.service.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PhotoNames(List<PlaceName> photos) {

    public static int LIMIT = 3;

    public List<PlaceName> limitPlacePhotoNames() {
        return photos.stream().limit(LIMIT).toList();
    }
}
