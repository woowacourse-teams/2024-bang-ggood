package com.bang_ggood.building.service.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.Optional;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PlaceNames(List<PlaceName> places) {

    public Optional<PlaceName> getFirst() {
        if (places() == null) return Optional.empty();
        return Optional.of(places.get(0));
    }
}
