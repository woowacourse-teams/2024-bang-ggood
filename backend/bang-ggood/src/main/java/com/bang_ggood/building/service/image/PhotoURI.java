package com.bang_ggood.building.service.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PhotoURI(String name, String photoUri) {
}
