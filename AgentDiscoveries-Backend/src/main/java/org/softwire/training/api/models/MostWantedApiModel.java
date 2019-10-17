package org.softwire.training.api.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MostWantedApiModel {
    String title;
    String description;
    MostWantedSuspectImage[] images;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public MostWantedSuspectImage[] getImages() {
        return images;
    }
}
