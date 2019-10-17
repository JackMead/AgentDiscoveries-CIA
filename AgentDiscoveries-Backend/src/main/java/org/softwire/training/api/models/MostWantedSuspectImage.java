package org.softwire.training.api.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MostWantedSuspectImage {
    String original;

    public String getOriginal() {
        return original;
    }
}
