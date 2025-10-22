package com.bang_ggood.building.service.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PlaceNames(List<PlaceName> places) {

    public PlaceName getFirst() {
        return places.get(0);
    }
}
